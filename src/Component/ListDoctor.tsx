import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getDoctors } from "../service/doctorService";
import { getSpecialties } from "../service/specialtiesService";
import { getClinics } from "../service/clinicService";
import { getDoctorTimeSlots } from "../service/doctorTimeSlotService";
import { getTimeSlots } from "../service/timeSlotService";
import { getAppointments } from "../service/appointmentService";

import { ItemDoctor } from "../interface/itemDoctor";
import { ItemSpecialty } from "../interface/itemSpecialty";
import { ItemClinic } from "../interface/listClinic";
import { ItemDoctorTimeSlot } from "../interface/itemDoctorTimeSlot";
import { ItemTimeSlot } from "../interface/itemTimeSlot";
import { ItemAppointment } from "../interface/itemAppointment";
import { NoFindItem } from "../bkc-ToolTips/NoFindItem";

export const ListDoctor = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState<string[]>([]);
  const { id } = useParams(); // id của chuyên khoa
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<
    { startTime: string; endTime: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  // useState lưu dữ liệu api
  const [doctors, setDoctors] = useState<ItemDoctor[]>([]);
  const [specialtyDoctors, setSpecialtyDoctors] = useState<ItemDoctor[]>([]);
  const [specialties, setSpecialties] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [doctorTimeSlots, setDoctorTimeSlot] = useState([]);
  const [timeSlots, setTimeSlot] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [currentSpecialty, setCurrentSpecialty] =
    useState<ItemSpecialty | null>(null);
  const [clinicDetails, setClinicsDetails] = useState<{
    [key: string]: ItemClinic;
  }>({});
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
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

      setIsLoading(false);
    } catch (err) {
      setIsLoading(true);
      console.error("❌ Lỗi khi lấy danh sách", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Lấy thông tin chuyên khoa hiện tại từ id trong URL
  useEffect(() => {
    if (specialties && specialties.length > 0 && id) {
      const specialty = specialties?.find(
        (spe: ItemSpecialty) => spe.id === Number(id)
      ) as ItemSpecialty | undefined;
      setCurrentSpecialty(specialty || null);
    }
  }, [specialties, id]);

  // Lấy danh sách bác sĩ theo chuyên khoa
  useEffect(() => {
    if (doctors && doctors.length > 0 && currentSpecialty) {
      const filteredDoctors = doctors.filter(
        (doc: ItemDoctor) => doc.specialtiesId === currentSpecialty.id
      );
      setSpecialtyDoctors(filteredDoctors);
    }
  }, [doctors, currentSpecialty]);

  // Tạo map lưu thông tin phòng khám theo doctor Id
  useEffect(() => {
    if (specialtyDoctors.length > 0 && clinics.length > 0) {
      const clinicMap: { [key: string]: ItemClinic } = {};

      specialtyDoctors.forEach((doctor: ItemDoctor) => {
        const clinic = clinics.find(
          (c: ItemClinic) => c.id === doctor.clinicId
        );
        if (clinic) {
          clinicMap[doctor.id] = clinic;
        }
      });

      setClinicsDetails(clinicMap);

      // Nếu chưa chọn bác sĩ, chọn bác sĩ đầu tiên mặc định
      if (specialtyDoctors.length > 0 && !selectedDoctorId) {
        setSelectedDoctorId(specialtyDoctors[0].id.toString());
      }
    }
  }, [specialtyDoctors, clinics, selectedDoctorId]);

  // Tạo các option thứ - ngày để hiển thị trên select option
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
  }, []);

  useEffect(() => {
    if (options.length > 0) {
      setSelectedDate(options[0]);
    }
  }, [options]);

  // Chuyển đổi định dạng ngày tháng
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
    if (
      !selectedDoctorId ||
      !doctorTimeSlots ||
      !timeSlots ||
      !selectedDate ||
      !appointments
    )
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

    // Lọc các slot theo doctor và ngày
    const doctorTimeSlotsFiltered = doctorTimeSlots.filter(
      (slot: ItemDoctorTimeSlot) => {
        const slotDateStandard = normalizeDate(slot.doctorTimeSlot_Date);

        // Kiểm tra không cùng doctor hoặc ngày
        if (
          Number(slot.doctorId) !== Number(selectedDoctorId) ||
          slotDateStandard !== selectedDateStandard
        ) {
          return false;
        }

        // Kiểm tra slot đã được đặt chưa
        const isBooked = appointments.some((appt: ItemAppointment) => {
          const apptDateStandard = normalizeDate(appt.appointmentDate);

          // Kiểm tra có cùng doctor, timeslot và ngày không
          const matchDoctor =
            Number(appt.doctorId) === Number(selectedDoctorId);
          const matchTimeSlot =
            Number(appt.timeSlotId) === Number(slot.timeSlotId);
          const matchDate = apptDateStandard === slotDateStandard;

          return matchDoctor && matchTimeSlot && matchDate;
        });

        return !isBooked;
      }
    );

    // Tạo danh sách time slot khả dụng
    const timesWithId = doctorTimeSlotsFiltered
      .map((slot: ItemDoctorTimeSlot) => {
        const foundTimeSlot = timeSlots.find(
          (time: ItemTimeSlot) => Number(time.id) === Number(slot.timeSlotId)
        ) as ItemTimeSlot | undefined;

        return foundTimeSlot
          ? {
              ...foundTimeSlot,
              timeSlot_id: slot.timeSlotId,
            }
          : null;
      })
      .filter(Boolean); // Lọc bỏ các giá trị `null`

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
  }, [
    selectedDate,
    doctorTimeSlots,
    timeSlots,
    selectedDoctorId,
    appointments,
  ]);

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    // Reset thời gian khám khi chọn bác sĩ mới
    setAvailableTimes([]);
  };

  const handleTimeSlotClick = (timeSlot: {
    startTime: string;
    endTime: string;
  }) => {
    if (!selectedDoctorId) return;

    const selectedDoctor = specialtyDoctors.find(
      (doc: ItemDoctor) => doc.id.toString() === selectedDoctorId
    );

    if (!selectedDoctor) return;

    const doctorClinic = clinicDetails[selectedDoctorId];

    // Thu thập các thông tin cần thiết
    const bookingData = {
      doctorId: selectedDoctorId,
      doctorName: selectedDoctor.fullName || "",
      doctorImage: selectedDoctor.image || "",
      clinicName: doctorClinic?.clinicName || "",
      specialtyName: currentSpecialty?.specialtiesName || "",
      examinationPrice: selectedDoctor.examinationPrice || 0,
      selectedDate: selectedDate || "",
      timeSlot: {
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
      },
    };

    const queryParams = new URLSearchParams();
    queryParams.append("doctorId", bookingData.doctorId);
    queryParams.append("doctorName", bookingData.doctorName);
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

  // hàm khi ấn xem thêm
  const handleSeeMore = (id: number) => {
    navigate("/doctorPage/" + id);
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
              <div>{currentSpecialty?.specialtiesName}</div>
            </div>
          </div>

          {/* Danh sách bác sĩ */}
          <div className="tw-w-full tw-mb-8">
            <h2 className="tw-text-xl tw-font-semibold tw-mb-4">
              Danh sách bác sĩ chuyên khoa {currentSpecialty?.specialtiesName}
            </h2>

            <div className="tw-max-h-[260px] tw-overflow-y-auto tw-pr-2">
              {isLoading ? (
                // 👇 Loading State
                <div className="tw-flex tw-justify-center tw-items-center tw-h-40">
                  <span className="tw-animate-spin tw-rounded-full tw-h-10 tw-w-10 tw-border-4 tw-border-sky-500 tw-border-t-transparent"></span>
                </div>
              ) : specialtyDoctors.length > 0 ? (
                // 👇 Danh sách bác sĩ
                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-4">
                  {specialtyDoctors.map((doctor: ItemDoctor) => (
                    <div
                      key={doctor.id}
                      className={`tw-border tw-rounded-lg tw-p-4 tw-cursor-pointer tw-transition-all ${
                        selectedDoctorId === doctor.id.toString()
                          ? "tw-border-sky-500 tw-bg-sky-50"
                          : "tw-border-gray-200 hover:tw-border-sky-300"
                      }`}
                      onClick={() => handleDoctorSelect(doctor.id.toString())}
                    >
                      <div className="tw-flex tw-items-center tw-gap-4">
                        <div className="tw-w-16 tw-h-16 tw-rounded-full tw-overflow-hidden">
                          <img
                            src={`http://localhost:5000/uploads/${doctor.image}`}
                            alt={doctor.fullName}
                            className="tw-w-full tw-h-full tw-object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="tw-font-medium">{doctor.fullName}</h3>
                          <p className="tw-text-sm tw-text-gray-600">
                            {clinicDetails[doctor.id]?.clinicName ||
                              "Chưa có thông tin phòng khám"}
                          </p>
                          <p className="tw-text-sm tw-text-sky-600">
                            {doctor.examinationPrice.toLocaleString("vi-VN")}{" "}
                            VNĐ
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // 👇 Không có kết quả
                <div className="tw-col-span-full tw-flex tw-justify-center tw-items-center tw-w-full">
                  <NoFindItem title="Không tìm thấy bác sĩ nào" />
                </div>
              )}
            </div>
          </div>

          {/* Chi tiết bác sĩ đã chọn */}
          {selectedDoctorId && specialtyDoctors.length > 0 && (
            <div className="tw-flex tw-gap-10 tw-flex-col sm:tw-flex-row">
              <div className="tw-flex tw-flex-col tw-w-full md:tw-flex-row tw-gap-10 sm:tw-w-1/2">
                <div className="tw-justify-items-center">
                  {(() => {
                    const selectedDoctor = specialtyDoctors.find(
                      (doc: ItemDoctor) =>
                        doc.id.toString() === selectedDoctorId
                    );
                    return selectedDoctor ? (
                      <>
                        <div className="tw-w-[140px] tw-h-[140px] md:tw-w-[140px] md:tw-h-[140px] tw-overflow-hidden tw-flex tw-items-center tw-justify-center tw-rounded-full">
                          <img
                            src={`http://localhost:5000/uploads/${selectedDoctor.image}`}
                            alt="Bác sĩ"
                            className="tw-w-full tw-h-full"
                          />
                        </div>
                        <div className="tw-text-sky-500 tw-pt-2">
                          <p
                            className="tw-cursor-pointer"
                            onClick={() => handleSeeMore(selectedDoctor.id)}
                          >
                            Xem thêm
                          </p>
                        </div>
                      </>
                    ) : null;
                  })()}
                </div>
                <div className="md:tw-w-[550px] tw-flex tw-flex-col tw-gap-1">
                  {(() => {
                    const selectedDoctor = specialtyDoctors.find(
                      (doc: ItemDoctor) =>
                        doc.id.toString() === selectedDoctorId
                    );
                    return selectedDoctor ? (
                      <>
                        <div className="tw-text-2xl">
                          <p>{selectedDoctor.fullName}</p>
                        </div>
                        <div>
                          <span className="tw-whitespace-pre-line tw-text-sm tw-text-[#555]">
                            {selectedDoctor.description}
                          </span>
                        </div>
                        <div className="tw-text-sm tw-flex tw-gap-1">
                          <div>
                            <i className="fas fa-map-marker-alt"></i>
                          </div>
                          <div>
                            <p>{selectedDoctor.address}</p>
                          </div>
                        </div>
                      </>
                    ) : null;
                  })()}
                </div>
              </div>
              <div className="md:tw-flex tw-flex-col tw-w-full">
                <div className="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-1/2 md:tw-border-b-2 tw-border-b-2">
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
                  <div className="tw-flex tw-gap-1 tw-text-sm tw-pl-4">
                    <div>
                      <i className="far fa-calendar-alt"></i>
                    </div>
                    <div>
                      <p>LỊCH KHÁM</p>
                    </div>
                  </div>
                  <div className="tw-flex tw-gap-2 tw-flex-wrap tw-pl-4">
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
                  <div className="tw-flex tw-gap-1 tw-text-[12px] tw-text-gray-800 tw-py-3 md:tw-py-0 tw-pl-4">
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
                <div className="tw-flex tw-flex-col tw-gap-1 tw-py-3 md:tw-px-4 md:tw-py-3">
                  {(() => {
                    const selectedDoctor = specialtyDoctors.find(
                      (doc: ItemDoctor) =>
                        doc.id.toString() === selectedDoctorId
                    );
                    const doctorClinic = selectedDoctor
                      ? clinicDetails[selectedDoctor.id]
                      : null;

                    return doctorClinic ? (
                      <>
                        <div className="tw-flex tw-flex-col tw-gap-1">
                          <div className="tw-text-sm tw-text-gray-500">
                            <p>ĐỊA CHỈ KHÁM</p>
                          </div>
                          <div className="tw-text-[13px] tw-text-sky-600 tw-cursor-pointer">
                            <p>{doctorClinic.clinicName}</p>
                          </div>
                          <div className="tw-text-[13px] ">
                            <p>{doctorClinic.clinicAddress}</p>
                          </div>
                        </div>
                        <div className="tw-flex tw-gap-1">
                          <div className="tw-text-sm tw-text-gray-500 tw-content-center">
                            <p>GIÁ KHÁM:</p>
                          </div>
                          <div className="tw-text-sm tw-content-center">
                            <p>
                              {selectedDoctor?.examinationPrice.toLocaleString(
                                "vi-VN"
                              )}{" "}
                              VNĐ
                            </p>
                          </div>
                        </div>
                      </>
                    ) : null;
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
