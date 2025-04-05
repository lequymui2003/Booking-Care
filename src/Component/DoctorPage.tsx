import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDoctor,
  useSpecialties,
  useClinic,
  useDoctorTimeSlot,
  useTimeSlot,
  useAppointment,
} from "../store/hooks";
import { ItemDoctor } from "../interface/itemDoctor";
import { ItemSpecialty } from "../interface/itemSpecialty";
import { ItemClinic } from "../interface/listClinic";
import { ItemDoctorTimeSlot } from "../interface/itemDoctorTimeSlot";
import { ItemTimeSlot } from "../interface/itemTimeSlot";
import { ItemAppointment } from "../interface/itemAppointment";

export const DoctorPage = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState<string[]>([]);
  const { id } = useParams();
  const [doctor, getDoctor] = useDoctor();
  const [doctorDetails, setDoctorDetails] = useState<ItemDoctor | null>(null); // State để lưu thông tin bác sĩ
  const [specialties, getSpecialties] = useSpecialties(); // Lấy danh sách chuyên khoa từ store
  const [specialty, setSpecialty] = useState<ItemSpecialty | null>(null); // State để lưu thông tin chuyên khoa
  const [clinic, getClinic] = useClinic(); // Lấy danh sách cơ sở y tế từ store
  const [clinicDetails, setClinicDetails] = useState<ItemClinic | null>(null); // State để lưu thông tin cơ sở y tế
  const [doctorTimeSlots, getDoctorTimeSlot] = useDoctorTimeSlot();
  const [timeSlots, getTimeSlot] = useTimeSlot();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<
    { startTime: string; endTime: string }[]
  >([]);

  const [appointments, getAppointments] = useAppointment();

  useEffect(() => {
    getDoctor();
    getSpecialties();
    getClinic();
    getDoctorTimeSlot();
    getTimeSlot();
    getAppointments();
  }, []);

  // Lấy ra thông tin của bác sĩ
  useEffect(() => {
    if (doctor && doctor.length > 0) {
      const selectedDoctor = doctor.find(
        (doc: ItemDoctor) => doc.id === parseInt(id!, 10) // So sánh id
      );
      setDoctorDetails(selectedDoctor || null); // Lưu thông tin bác sĩ vào state
      if (selectedDoctor) {
        const specialty = specialties?.find(
          (spec: ItemSpecialty) => spec.id === selectedDoctor.specialtiesId
        );
        setSpecialty(specialty || null); // Lưu thông tin chuyên khoa vào state
      }
      if (selectedDoctor) {
        const clinicDetails = clinic?.find(
          (clinic: ItemClinic) => clinic.id === selectedDoctor.clinicId
        );
        setClinicDetails(clinicDetails || null); // Lưu thông tin cơ sở y tế vào state
      }
    }
  }, [doctor, id]); // Chạy lại khi doctor hoặc id thay đổi

  // tạo các option thứ - ngày để hiển thị trên select option
  useEffect(() => {
    // Tạo danh sách 6 ngày làm việc kể từ ngày hiện tại (chỉ lấy Thứ 2 - Thứ 6)
    const generateWorkDays = () => {
      const today = new Date();
      const weekDays: string[] = [];

      // Bắt đầu từ ngày hiện tại
      let currentDate = new Date(today);

      // Nếu hôm nay là thứ 7 hoặc chủ nhật, bắt đầu từ thứ 2 tuần sau
      const currentDay = currentDate.getDay();
      if (currentDay === 0) {
        // Chủ nhật
        currentDate.setDate(currentDate.getDate() + 1); // Lấy thứ 2
      } else if (currentDay === 6) {
        // Thứ 7
        currentDate.setDate(currentDate.getDate() + 2); // Lấy thứ 2 tuần sau
      }

      let count = 0;
      let daysAdded = 0;

      while (daysAdded < 6) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + count);
        const day = date.getDay();

        // Chỉ lấy ngày từ thứ 2 đến thứ 6 (1-5)
        if (day >= 1 && day <= 5) {
          const dayNames = [
            "Chủ nhật",
            "Thứ 2",
            "Thứ 3",
            "Thứ 4",
            "Thứ 5",
            "Thứ 6",
            "Thứ 7",
          ];
          const dayString = `${dayNames[day]} - ${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;

          weekDays.push(dayString);
          daysAdded++;
        }

        count++;
      }

      return weekDays;
    };

    const workDays = generateWorkDays();
    setOptions(workDays);

    // Set ngày đầu tiên làm mặc định
    if (workDays.length > 0) {
      setSelectedDate(workDays[0]);
    }

    // Kiểm tra
    // console.log("Các ngày làm việc:", workDays);
  }, []);

  // Cập nhật hàm convertToMMDDYYYY để xử lý đúng định dạng "Thứ X - dd/mm/yyyy"
  const convertToMMDDYYYY = (dateString: string) => {
    // Nếu chuỗi đầu vào có định dạng "Thứ X - dd/mm/yyyy"
    if (dateString.includes(" - ")) {
      // Tách lấy phần ngày tháng sau dấu " - "
      const datePart = dateString.split(" - ")[1];
      // Tách ngày, tháng, năm
      const parts = datePart.split("/");
      if (parts.length !== 3) return "";
      return `${parts[1]}/${parts[0]}/${parts[2]}`; // Chuyển sang mm/dd/yyyy
    }
    // Nếu đầu vào đã là dd/mm/yyyy
    else {
      const parts = dateString.split("/");
      if (parts.length !== 3) return "";
      return `${parts[1]}/${parts[0]}/${parts[2]}`;
    }
  };

  useEffect(() => {
    if (!id || !doctorTimeSlots || !timeSlots || !selectedDate || !appointments)
      return;
    // Sử dụng selectedDate hoặc ngày đầu tiên
    const dateToUse = selectedDate || options[0];

    // Hàm chuẩn hóa ngày tháng
    const normalizeDate = (dateInput: string | Date): string => {
      // Kiểm tra nếu dateInput là null/undefined
      if (!dateInput) return "";

      let dateObj: Date;

      // Nếu đầu vào là Date object
      if (dateInput instanceof Date) {
        dateObj = dateInput;
      }
      // Nếu đầu vào là string
      else if (typeof dateInput === "string") {
        // Xử lý chuỗi có định dạng "Thứ X - dd/mm/yyyy"
        if (dateInput.includes(" - ")) {
          const datePart = dateInput.split(" - ")[1];
          const [day, month, year] = datePart.split("/").map(Number);
          dateObj = new Date(year, month - 1, day);
        }
        // Xử lý chuỗi ISO (2025-07-03T17:00:00.000Z)
        else if (dateInput.includes("T")) {
          dateObj = new Date(dateInput);
        }
        // Xử lý chuỗi dd/mm/yyyy
        else {
          const [day, month, year] = dateInput.split("/").map(Number);
          dateObj = new Date(year, month - 1, day);
        }
      }
      // Trường hợp không xác định
      else {
        return "Invalid date";
      }

      // Kiểm tra Date hợp lệ
      if (isNaN(dateObj.getTime())) {
        return "Invalid date";
      }

      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      const year = dateObj.getFullYear();

      return `${day}/${month}/${year}`; // Trả về dd/mm/yyyy
    };

    // Chuẩn hóa ngày được chọn
    const formattedSelectedDate = convertToMMDDYYYY(dateToUse);
    const normalizedSelectedDate = normalizeDate(formattedSelectedDate);

    // Lọc các slot theo doctor, ngày và chưa được đặt
    const doctorTimeSlotsFiltered = doctorTimeSlots.filter(
      (slot: ItemDoctorTimeSlot) => {
        const slotDateNormalized = normalizeDate(slot.doctorTimeSlot_Date);
        const normalizedSelectedDate = normalizeDate(
          convertToMMDDYYYY(selectedDate)
        );

        // Kiểm tra không cùng doctor hoặc ngày
        if (
          slot.doctor_id !== parseInt(id) ||
          slotDateNormalized !== normalizedSelectedDate
        ) {
          return false;
        }

        // Kiểm tra slot đã được đặt chưa (QUAN TRỌNG: return !isBooked)
        const isBooked = appointments.some((appt: ItemAppointment) => {
          const apptDateNormalized = normalizeDate(appt.appointmentDate);
          return (
            appt.doctorId === parseInt(id) &&
            appt.timeSlotId === slot.timeSlot_id &&
            apptDateNormalized === slotDateNormalized
          );
        });

        return !isBooked; // Chỉ giữ lại slot CHƯA đặt
      }
    );

    // Tạo danh sách time slot khả dụng
    const timesWithId = doctorTimeSlotsFiltered
      .map((slot: ItemDoctorTimeSlot) => {
        const foundTimeSlot = timeSlots.find(
          (time: ItemTimeSlot) => time.id === slot.timeSlot_id
        );
        return foundTimeSlot
          ? { ...foundTimeSlot, timeSlot_id: slot.timeSlot_id }
          : null;
      })
      .filter(Boolean);

    timesWithId.sort((a: any, b: any) => a.timeSlot_id - b.timeSlot_id);
    const sortedTimes = timesWithId.map((item: ItemTimeSlot) => ({
      startTime: item.startTime,
      endTime: item.endTime,
    }));

    setAvailableTimes(sortedTimes);
  }, [selectedDate, doctorTimeSlots, timeSlots, id, appointments]);

  const handleTimeSlotClick = (timeSlot: {
    startTime: string;
    endTime: string;
  }) => {
    // Thu thập các thông tin cần thiết
    const bookingData = {
      doctorId: id || "",
      doctorName: doctorDetails?.fullName || "",
      doctorImage: doctorDetails?.image || "",
      clinicName: clinicDetails?.clinicName || "",
      specialtyName: specialty?.specialtiesName || "",
      examinationPrice: doctorDetails?.examinationPrice || 0,
      selectedDate: selectedDate || "", // Ngày đã chọn (dạng "Thứ X - dd/mm/yyyy")
      timeSlot: {
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
      },
    };

    // Có hai cách để lưu trữ và truyền dữ liệu:
    // Cách 1: Sử dụng localStorage (phù hợp cho dữ liệu không nhạy cảm)
    // localStorage.setItem("bookingData", JSON.stringify(bookingData));
    //navigate("/booking");
    // Cách 2: Sử dụng query parameters (có giới hạn về kích thước)
    const queryParams = new URLSearchParams();
    queryParams.append("doctorId", bookingData.doctorId);
    queryParams.append("doctorName", bookingData.doctorName);
    // Không nên thêm ảnh vào URL vì URL có giới hạn độ dài
    queryParams.append("clinicName", bookingData.clinicName);
    queryParams.append("specialtyName", bookingData.specialtyName);
    queryParams.append(
      "examinationPrice",
      bookingData.examinationPrice.toString()
    );
    queryParams.append("selectedDate", bookingData.selectedDate);
    queryParams.append("startTime", bookingData.timeSlot.startTime);
    queryParams.append("endTime", bookingData.timeSlot.endTime);

    navigate(`/booking?${queryParams.toString()}`);
  };

  return (
    <>
      <Header />
      <div className="tw-max-w-6xl tw-mx-auto tw-h-full tw-mb-5">
        <div className="tw-flex tw-flex-col tw-gap-10 tw-px-4 tw-my-2">
          <div className="tw-flex tw-gap-1 tw-text-sm">
            <div className="tw-flex tw-gap-1 tw-text-sm tw-text-sky-600">
              <div>
                <i className="fas fa-home"></i>
              </div>
              <div>
                <p>/</p>
              </div>
              <div>
                <p>Khám chuyên khoa</p>
              </div>
              <div>
                <p>/</p>
              </div>
              <div>{specialty?.specialtiesName}</div>
              <div className="tw-hidden md:tw-block">
                <p>/</p>
              </div>
            </div>
            <div className="tw-hidden md:tw-block">
              {doctorDetails?.fullName}
            </div>
          </div>
          <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-10 tw-w-full">
            <div className="tw-justify-items-center">
              <div className="tw-w-[140px] tw-h-[140px] md:tw-w-[140px] md:tw-h-[140px] tw-overflow-hidden tw-flex tw-items-center tw-justify-center tw-rounded-full">
                <img
                  src={doctorDetails?.image}
                  alt="Bác sĩ"
                  className="tw-w-full tw-h-full"
                />
              </div>
            </div>
            <div className="md:tw-w-[550px] tw-flex tw-flex-col tw-gap-1">
              <div className="tw-text-2xl">
                <p>{doctorDetails?.fullName}</p>
              </div>
              <div>
                <span className="tw-whitespace-pre-line tw-text-sm tw-text-[#555]">
                  {doctorDetails?.description}
                </span>
              </div>
              <div className="tw-text-sm tw-flex tw-gap-1">
                <div>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <p>{doctorDetails?.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:tw-flex">
            <div className="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-1/2 md:tw-border-r-2 md:tw-border-b-0 tw-border-b-2">
              <div>
                {options.length > 0 ? (
                  <select
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="tw-text-sky-600 tw-text-sm tw-p-2 tw-border-0 tw-border-b-2 tw-border-gray-300 tw-rounded-none tw-outline-none tw-bg-transparent focus:tw-outline-none focus:tw-ring-0 focus:tw-border-blue-500 hover:tw-border-gray-400"
                  >
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>Đang tải lịch...</p>
                )}
              </div>
              <div className="tw-flex tw-gap-1 tw-text-sm">
                <div>
                  <i className="far fa-calendar-alt"></i>
                </div>
                <div>
                  <p>LỊCH KHÁM</p>
                </div>
              </div>
              <div className="tw-flex tw-gap-2 tw-flex-wrap">
                {availableTimes.length > 0 ? (
                  availableTimes.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleTimeSlotClick(item)}
                      className="tw-text-sm tw-px-2 tw-py-3 tw-border tw-w-[100px] tw-bg-gray-200 tw-cursor-pointer hover:tw-bg-sky-600 hover:tw-text-white"
                    >
                      <div className="tw-flex tw-gap-1 tw-justify-center">
                        <p>{item.startTime}</p>
                        <p>-</p>
                        <p>{item.endTime}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Không có lịch khám</p>
                )}
              </div>
              <div className="tw-flex tw-gap-1 tw-text-[12px] tw-text-gray-800 tw-py-3 md:tw-py-0">
                <div>
                  <p>Chọn</p>
                </div>
                <div>
                  <i className="far fa-hand-point-up"></i>
                </div>
                <div>
                  <p>
                    và đặt (Phí dịch vụ 0<sup>đ</sup>)
                  </p>
                </div>
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-1 tw-py-3 md:tw-px-2 md:tw-py-3">
              <div className="tw-flex tw-flex-col tw-gap-1">
                <div className="tw-text-sm tw-text-gray-500">
                  <p>ĐỊA CHỈ KHÁM</p>
                </div>
                <div className="tw-text-[13px] tw-text-sky-600 tw-cursor-pointer">
                  <p>{clinicDetails?.clinicName}</p>
                </div>
                <div className="tw-text-[13px] ">
                  <p>{clinicDetails?.clinicAddress}</p>
                </div>
              </div>
              <div className="tw-flex tw-gap-1">
                <div className="tw-text-sm tw-text-gray-500 tw-content-center">
                  <p>GIÁ KHÁM:</p>
                </div>
                <div className="tw-text-sm tw-content-center">
                  <p>
                    {doctorDetails?.examinationPrice.toLocaleString("vi-VN")}{" "}
                    VNĐ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="tw-w-full tw-h-[1px] tw-bg-slate-800" />
      <div className="tw-w-full tw-h-full tw-bg-slate-100 tw-py-8">
        <div className="lg:tw-w-1/2 lg:tw-ml-28">
          <div>
            <div className="tw-px-4 tw-text-base tw-font-bold">
              <p>{doctorDetails?.fullName}</p>
            </div>
            <div className="tw-px-4">
              <p className="tw-pl-8 tw-text-sm">{doctorDetails?.description}</p>
            </div>
          </div>
          <div>
            <div className="tw-px-4 tw-py-4 tw-text-base tw-font-bold">
              <p>Khám và điều trị</p>
            </div>
            <div className="tw-px-4">
              <p className="tw-pl-8 tw-text-sm">
                {doctorDetails?.examinationAndTreatment}
              </p>
            </div>
          </div>
          <div>
            <div className="tw-px-4 tw-py-4 tw-text-base tw-font-bold">
              <p>Quá trình công tác</p>
            </div>
            <div className="tw-px-4">
              <p className="tw-pl-8 tw-text-sm">
                {doctorDetails?.work_experience}
              </p>
            </div>
          </div>
          <div>
            <div className="tw-px-4 tw-py-4 tw-text-base tw-font-bold">
              <p>Quá trình đào tạo</p>
            </div>
            <div className="tw-px-4">
              <p className="tw-pl-8 tw-text-sm">{doctorDetails?.education}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
