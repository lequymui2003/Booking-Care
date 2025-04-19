import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import {
//   useDoctor,
//   useSpecialties,
//   useClinic,
//   useDoctorTimeSlot,
//   useTimeSlot,
//   useAppointment,
// } from "../store/hooks";
import { getDoctors } from "../../service/doctorService";
import { getSpecialties } from "../../service/specialtiesService";
import { getClinics } from "../../service/clinicService";
import { getDoctorTimeSlots } from "../../service/doctorTimeSlotService";
import { getTimeSlots } from "../../service/timeSlotService";
import { getAppointments } from "../../service/appointmentService";

import { ItemDoctor } from "../../interface/itemDoctor";
import { ItemSpecialty } from "../../interface/itemSpecialty";
import { ItemClinic } from "../../interface/listClinic";
import { ItemDoctorTimeSlot } from "../../interface/itemDoctorTimeSlot";
import { ItemTimeSlot } from "../../interface/itemTimeSlot";
import { ItemAppointment } from "../../interface/itemAppointment";

export const DoctorPage = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState<string[]>([]);
  const { id } = useParams();
  const [doctorDetails, setDoctorDetails] = useState<ItemDoctor | null>(null); // State để lưu thông tin bác sĩ
  const [specialty, setSpecialty] = useState<ItemSpecialty | null>(null); // State để lưu thông tin chuyên khoa
  const [clinicDetails, setClinicDetails] = useState<ItemClinic | null>(null); // State để lưu thông tin cơ sở y tế
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<
    { startTime: string; endTime: string }[]
  >([]);
  // useState lưu dữ liệu api
  const [doctor, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [clinic, setClinics] = useState([]);
  const [doctorTimeSlots, setDoctorTimeSlot] = useState([]);
  const [timeSlots, setTimeSlot] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    try {
      const [
        doctorList,
        specialtiesList,
        clinicsList,
        doctorTimeSlotList,
        timeSlotlist,
        appointmentsList,
      ] = await Promise.all([
        getDoctors(),
        getSpecialties(),
        getClinics(),
        getDoctorTimeSlots(),
        getTimeSlots(),
        getAppointments(),
      ]);
      setDoctors(doctorList);
      setClinics(clinicsList);
      setSpecialties(specialtiesList);
      setAppointments(appointmentsList);
      setDoctorTimeSlot(doctorTimeSlotList);
      setTimeSlot(timeSlotlist);
    } catch (err) {
      console.error("❌ Lỗi khi lấy danh sách", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Lấy ra thông tin của bác sĩ
  useEffect(() => {
    if (doctor && doctor.length > 0) {
      const selectedDoctor = doctor.find(
        (doc: ItemDoctor) => doc.id === parseInt(id!, 10) // So sánh id
      ) as ItemDoctor | undefined;
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
  }, [doctor, id, specialties, clinic]); // Chạy lại khi doctor hoặc id thay đổi

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
    // if (workDays.length > 0) {
    //   setSelectedDate(workDays[0]);
    // }
  }, []);

  useEffect(() => {
    if (options.length > 0) {
      setSelectedDate(options[0]);
    }
  }, [options]);

  // Sửa thành convertToStandardDate để luôn trả về định dạng YYYY-MM-DD
  const convertToStandardDate = (dateString: string) => {
    if (!dateString) return "";

    dateString = dateString.trim();

    if (dateString.includes(" - ")) {
      const datePart = dateString.split(" - ")[1].trim();
      const parts = datePart.split("/").map((p) => p.trim());
      if (parts.length !== 3) return "";
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    // Giữ nguyên nếu đã là yyyy-mm-dd
    else if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }

    return "";
  };

  useEffect(() => {
    if (!id || !doctorTimeSlots || !timeSlots || !selectedDate || !appointments)
      return;

    const normalizeDate = (dateInput: string | Date): string => {
      if (!dateInput) return "";

      try {
        // Xử lý ngày từ UI: "Thứ X - dd/mm/yyyy"
        if (typeof dateInput === "string" && dateInput.includes(" - ")) {
          const datePart = dateInput.split(" - ")[1].trim();
          const [day, month, year] = datePart.split("/").map(Number);
          return `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
        }
        // Xử lý ngày có định dạng MM/DD/YYYY
        else if (typeof dateInput === "string" && dateInput.includes("/")) {
          const [month, day, year] = dateInput
            .split("/")
            .map((part) => part.trim());
          return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }
        // Giữ nguyên nếu đã là yyyy-mm-dd
        else if (
          typeof dateInput === "string" &&
          dateInput.match(/^\d{4}-\d{2}-\d{2}$/)
        ) {
          return dateInput;
        }
        // Xử lý Date object
        else if (dateInput instanceof Date) {
          const month = dateInput.getMonth() + 1;
          const day = dateInput.getDate();
          const year = dateInput.getFullYear();
          return `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
        }
      } catch (error) {
        console.error("Error normalizing date:", error);
      }
      return "";
    };

    const selectedDateStandard = normalizeDate(
      convertToStandardDate(selectedDate)
    );

    // console.log("Selected Date Standard:", selectedDateStandard);
    // console.log("All slots before filtering:", doctorTimeSlots.length);

    // Lọc các slot theo doctor và ngày
    const doctorTimeSlotsFiltered = doctorTimeSlots.filter(
      (slot: ItemDoctorTimeSlot) => {
        const slotDateStandard = normalizeDate(slot.doctorTimeSlot_Date);

        // Kiểm tra không cùng doctor hoặc ngày
        if (
          Number(slot.doctorId) !== Number(id) ||
          slotDateStandard !== selectedDateStandard
        ) {
          return false;
        }

        // Kiểm tra slot đã được đặt chưa
        const isBooked = appointments.some((appt: ItemAppointment) => {
          const apptDateStandard = normalizeDate(appt.appointmentDate);

          // Kiểm tra có cùng doctor, timeslot và ngày không
          const matchDoctor = Number(appt.doctorId) === Number(id);
          const matchTimeSlot =
            Number(appt.timeSlotId) === Number(slot.timeSlotId);
          const matchDate = apptDateStandard === slotDateStandard;

          // console.log(`Appointment check:
          //   Doctor: ${matchDoctor} (${appt.doctorId} vs ${id})
          //   TimeSlot: ${matchTimeSlot} (${appt.timeSlotId} vs ${slot.timeSlotId})
          //   Date: ${matchDate} (${apptDateStandard} vs ${slotDateStandard})`);

          return matchDoctor && matchTimeSlot && matchDate;
        });

        // console.log(`Slot ${slot.timeSlotId} is booked:`, isBooked);
        return !isBooked;
      }
    );

    // console.log(
    //   "Slots after doctor and date filtering:",
    //   doctorTimeSlotsFiltered.length
    // );

    // Tạo danh sách time slot khả dụng
    const timesWithId = doctorTimeSlotsFiltered
      .map((slot: ItemDoctorTimeSlot) => {
        const foundTimeSlot = timeSlots.find(
          (time: ItemTimeSlot) => Number(time.id) === Number(slot.timeSlotId)
        ) as ItemTimeSlot | undefined; // Thêm type assertion

        return foundTimeSlot
          ? {
              ...foundTimeSlot, // Giờ TypeScript biết `foundTimeSlot` là `ItemTimeSlot`
              timeSlot_id: slot.timeSlotId,
            }
          : null;
      })
      .filter(Boolean); // Lọc bỏ các giá trị `null`

    // console.log("Times with ID after finding timeSlots:", timesWithId.length);

    // Sắp xếp theo ID
    timesWithId.sort(
      (a: any, b: any) => Number(a.timeSlot_id) - Number(b.timeSlot_id)
    );

    // Tạo danh sách kết quả cuối cùng
    const sortedTimes = timesWithId.map((item: any) => ({
      startTime: item.startTime,
      endTime: item.endTime,
    }));

    console.log("Final available times:", sortedTimes);
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
                  src={`http://localhost:5000/uploads/${doctorDetails?.image}`}
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
                        <p>{item.startTime.substring(0, 5)}</p>
                        <p>-</p>
                        <p>{item.endTime.substring(0, 5)}</p>
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
        <div className="lg:tw-max-w-6xl tw-mx-auto">
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
