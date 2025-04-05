import Header from "./Header";
import Footer from "./Footer";
import { ItemPatient } from "../interface/itemPatient";
import { useState, useEffect } from "react";
import { useDoctor, usePatient, useTimeSlot } from "../store/hooks";
import { ItemDoctor } from "../interface/itemDoctor";
import { ItemTimeSlot } from "../interface/itemTimeSlot";
import { createRecord } from "../store/collection.api"; // Giả sử bạn đã định nghĩa hàm này trong utils/bkSDK
import bkSDK from "../store/bkSDK";
import Swal from "sweetalert2";

function BookingUser() {
  const [doctor, getDoctor] = useDoctor();
  const userId = localStorage.getItem("userId"); // Lấy id từ localStorage
  const [patients, getPatients] = usePatient();
  const [timeSlots, getTimeSlots] = useTimeSlot();
  const [currentPatient, setCurrentPatient] = useState<ItemPatient | null>(
    null
  );
  const [reason, setReason] = useState<string>(""); // State để lưu lý do khám
  const [bookingData, setBookingData] = useState({
    doctorId: "",
    doctorName: "",
    doctorImage: "",
    clinicName: "",
    specialtyName: "",
    examinationPrice: 0,
    selectedDate: "",
    timeSlot: {
      startTime: "",
      endTime: "",
    },
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State để kiểm soát hiển thị popup

  useEffect(() => {
    getDoctor();
    getPatients();
    getTimeSlots();
  }, []);

  // Sử dụng hook useTimeSlot để lấy danh sách time slots

  // Thêm useEffect để lọc thông tin patient
  useEffect(() => {
    if (userId && patients) {
      // Tìm patient có user_id trùng khớp với userId từ localStorage
      const foundPatient = patients.find(
        (patient: ItemPatient) => patient.use_id === Number(userId)
      );

      if (foundPatient) {
        setCurrentPatient(foundPatient);
        console.log("Found patient:", foundPatient);
      } else {
        console.warn("No patient found with user_id:", userId);
      }
    }
  }, [patients, userId]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setBookingData((prevState) => ({
      ...prevState,
      doctorId: params.get("doctorId") || "",
      doctorName: params.get("doctorName") || "",
      clinicName: params.get("clinicName") || "",
      specialtyName: params.get("specialtyName") || "",
      examinationPrice: parseInt(params.get("examinationPrice") || "0"),
      selectedDate: params.get("selectedDate") || "",
      timeSlot: {
        startTime: params.get("startTime") || "",
        endTime: params.get("endTime") || "",
      },
    }));
  }, [location.search]);

  // Cập nhật ảnh bác sĩ khi có dữ liệu bác sĩ
  useEffect(() => {
    if (doctor && doctor.length > 0 && bookingData.doctorId) {
      // Kiểm tra kiểu dữ liệu và ép kiểu nếu cần thiết
      const foundDoctor = doctor.find(
        (doc: ItemDoctor) =>
          doc.id.toString() === bookingData.doctorId.toString() // So sánh bằng cách ép kiểu về chuỗi
      );

      if (foundDoctor) {
        setBookingData((prevState) => ({
          ...prevState,
          doctorImage: foundDoctor.image || "", // Lấy ảnh từ dữ liệu bác sĩ
        }));
      } else {
        console.log("No matching doctor found.");
      }
    }
  }, [doctor, bookingData.doctorId]); // Theo dõi sự thay đổi của doctor và doctorId

  // Hàm chuyển đổi ngày tháng không bị ảnh hưởng bởi timezone
  const formatDateForInput = (dateString: string) => {
    const [month, day, year] = dateString.split("/");
    // Tạo Date object với múi giờ UTC
    const date = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day))
    );
    return date.toISOString().split("T")[0];
  };

  // State để lưu id của time slot khớp
  const [matchedTimeSlotId, setMatchedTimeSlotId] = useState();

  // Effect để tìm time slot id khi bookingData hoặc timeSlots thay đổi
  useEffect(() => {
    if (
      bookingData.timeSlot.startTime &&
      bookingData.timeSlot.endTime &&
      timeSlots?.length > 0
    ) {
      const matchedSlot = timeSlots.find(
        (slot: ItemTimeSlot) =>
          slot.startTime === bookingData.timeSlot.startTime &&
          slot.endTime === bookingData.timeSlot.endTime
      );

      if (matchedSlot) {
        setMatchedTimeSlotId(matchedSlot.id);
        console.log("Matched TimeSlot ID:", matchedSlot.id);
      } else {
        console.warn("No matching time slot found for:", bookingData.timeSlot);
      }
    }
  }, [bookingData, timeSlots]);

  console.log("Matched TimeSlot ID:", matchedTimeSlotId);
  const prepareBookingData = async () => {
    // Lấy ngày từ `selectedDate` (loại bỏ thứ nếu có)
    const rawDate = bookingData.selectedDate; // "Thứ 2 - 7/4/2025"
    const dateOnly = rawDate.replace(/^Thứ \d+ - /, ""); // Kết quả: "7/4/2025"
    let info = {
      id: Date.now(), // ID là timestamp hiện tại
      patientId: userId ? Number(userId) : null,
      doctorId: bookingData.doctorId ? Number(bookingData.doctorId) : null,
      timeSlotId: matchedTimeSlotId,
      appointmentDate: dateOnly, // Chỉ lưu "20/11/2023" (không có thứ)
      status: "Chờ xác nhận",
      reason: reason,
    };
    console.log("Booking data prepared:", info);
    try {
      const condition = {};
      const isMany = false;
      bkSDK.createRecord("appointment", info, condition, isMany);
      Swal.fire("Thêm thành công!", "Bản ghi đã được lưu.", "success").then(
        () => {
          location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "There was an error deleting your record.", "error");
    }
  };
  // createRecord("appointment", info, {}, false);
  return (
    <>
      <Header />
      <div>
        <div className="tw-w-full tw-mx-auto tw-h-full tw-bg-gray-200">
          <div className="tw-max-w-6xl tw-mx-auto tw-h-full tw-flex tw-justify-center tw-content-center tw-gap-5 tw-py-3 tw-px-3">
            <div className="tw-w-[110px] tw-h-[110px] tw-mt-4 tw-overflow-hidden tw-flex tw-rounded-full">
              <img
                src={bookingData.doctorImage}
                alt="Bác sĩ"
                className="tw-w-[110px] tw-h-[110px] tw-object-cover"
              />
            </div>
            <div className="tw-flex tw-flex-col tw-gap-2">
              <div className="tw-text-base">
                <p>ĐẶT LỊCH KHÁM</p>
              </div>
              <div className="tw-text-base tw-text-sky-800">
                <p>{bookingData.doctorName}</p>
              </div>
              <div className="tw-flex tw-gap-2 tw-text-sm">
                <div>
                  <i className="far fa-calendar-alt"></i>
                </div>
                <div className="tw-text-yellow-500 tw-flex tw-gap-1">
                  <div className="tw-flex tw-gap-1 ">
                    <div>
                      <p>{bookingData.timeSlot.startTime}</p>
                    </div>
                    <div>
                      <p>-</p>
                    </div>
                    <div>
                      <p>{bookingData.timeSlot.endTime}</p>
                    </div>
                  </div>
                  <div>
                    <p>-</p>
                  </div>
                  <div>
                    <p>{bookingData.selectedDate}</p>
                  </div>
                </div>
              </div>
              <div className="tw-flex tw-gap-1 tw-text-sm">
                <div>
                  <i className="fas fa-clinic-medical"></i>
                </div>
                <div className="tw-content-end">
                  <p>{bookingData.clinicName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tw-max-w-6xl tw-mx-auto tw-h-full tw-flex tw-justify-center tw-content-center tw-py-3 tw-px-3">
          <div className="tw-flex tw-flex-col tw-gap-3 tw-w-[400px] md:tw-w-[500px]">
            {/*input tên */}
            <div>
              <div className="tw-w-full tw-border tw-px-3 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-text-sm focus-within:tw-border-blue-500">
                <i className="fa-solid fa-user tw-text-gray-500"></i>
                <input
                  type="text"
                  placeholder="Họ tên bệnh nhân (Bắt buộc)"
                  className="tw-w-full focus:tw-outline-none"
                  value={currentPatient?.fullName}
                />
              </div>
              <div className="tw-text-[13px] tw-text-gray-400">
                <p>
                  Hãy ghi rõ Họ Và Tên, viết hoa những chữ cái đầu tiên, ví dụ:
                  Trần Văn Phú
                </p>
              </div>
            </div>
            {/*input giới tính */}
            <div className="tw-flex tw-items-center tw-space-x-6">
              <label className="tw-flex tw-items-center tw-space-x-2">
                <input
                  type="radio"
                  name="gender"
                  checked={currentPatient?.sex === "Nam"}
                  className="tw-w-[14px] tw-h-[14px] tw-text-blue-600 tw-border-gray-300"
                />
                <span>Nam</span>
              </label>

              <label className="tw-flex tw-items-center tw-space-x-2">
                <input
                  type="radio"
                  name="gender"
                  checked={currentPatient?.sex === "Nữ"}
                  className="tw-w-[14px] tw-h-[14px] tw-text-pink-600 tw-border-gray-300"
                />
                <span>Nữ</span>
              </label>
            </div>
            {/*input SĐT */}
            <div className="tw-w-full tw-border tw-px-3 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-text-sm focus-within:tw-border-blue-500">
              <i className="fas fa-mobile-alt tw-text-gray-500"></i>
              <input
                type="tel"
                placeholder="Số điện thoại"
                className="tw-w-full focus:tw-outline-none peer"
                pattern="[0-9]*"
                inputMode="numeric"
                value={currentPatient?.phone}
              />
            </div>
            {/*input email */}
            <div className="tw-w-full tw-border tw-px-3 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-text-sm focus-within:tw-border-blue-500">
              <i className="fas fa-envelope tw-text-gray-500"></i>
              <input
                type="email"
                placeholder="Địa chỉ Email"
                className="tw-w-full focus:tw-outline-none"
                value={currentPatient?.email}
              />
            </div>
            {/*input ngày sinh */}
            <div className="tw-w-full tw-border tw-px-3 tw-py-2 tw-rounded-lg  tw-text-sm focus-within:tw-border-blue-500">
              <input
                type="date"
                className="tw-w-full focus:tw-outline-none"
                max={new Date().toISOString().split("T")[0]}
                value={
                  currentPatient?.date
                    ? formatDateForInput(currentPatient.date.toString())
                    : ""
                }
                readOnly
                aria-label="Ngày sinh"
              />
              {!currentPatient?.date && (
                <div className="tw-text-red-500 tw-text-xs tw-mt-1">
                  * Chưa cập nhật ngày sinh
                </div>
              )}
            </div>
            {/*input địa chỉ */}
            <div className="tw-w-full tw-border tw-px-3 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-text-sm focus-within:tw-border-blue-500">
              <i className="fas fa-map-marker-alt tw-text-gray-500"></i>
              <input
                type="text"
                placeholder="Địa chỉ"
                className="tw-w-full focus:tw-outline-none"
                value={currentPatient?.address}
              />
            </div>
            {/*input lý do khám */}
            <div className="tw-w-full tw-border tw-px-3 tw-py-2 tw-rounded-lg tw-flex tw-gap-2  tw-text-sm focus-within:tw-border-blue-500">
              <i className="fas fa-plus-square tw-text-gray-500 tw-mt-1"></i>
              <textarea
                placeholder="Lý do khám"
                className="tw-w-full focus:tw-outline-none"
                rows={4}
                onChange={(e) => setReason(e.target.value)} // Cập nhật state khi người dùng nhập
              />
            </div>
            <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-2 tw-px-3 tw-py-2 tw-bg-gray-100">
              <div className="tw-flex tw-justify-between tw-text-sm tw-text-gray-800">
                <div>
                  <p>Giá khám</p>
                </div>
                <div className="tw-flex tw-gap-1">
                  <p>
                    {new Intl.NumberFormat("vi-VN").format(
                      bookingData.examinationPrice
                    )}
                  </p>
                  <p> VNĐ</p>
                </div>
              </div>
              <div className="tw-flex tw-justify-between tw-text-sm tw-text-gray-800">
                <div>
                  <p>Phí đặt lịch</p>
                </div>
                <div>
                  <p>Miễn phí</p>
                </div>
              </div>
              <hr />
              <div className="tw-flex tw-justify-between tw-text-sm tw-text-gray-800">
                <div>
                  <p>Tổng cộng</p>
                </div>
                <div className="tw-flex tw-gap-1 tw-text-red-600">
                  <p>
                    {new Intl.NumberFormat("vi-VN").format(
                      bookingData.examinationPrice
                    )}
                  </p>
                  <p> VNĐ</p>
                </div>
              </div>
            </div>
            <div className="tw-w-full tw-h-full tw-px-3 tw-text-[13px] tw-text-gray-600">
              <p>
                Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian
                làm thủ tục khám
              </p>
            </div>
            <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-2 tw-px-3 tw-py-2 tw-bg-blue-100">
              <div>
                <p>Lưu ý</p>
              </div>
              <div className="tw-text-sm">
                <p>
                  Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám
                  bệnh, khi điền thông tin anh/chị vui lòng:
                </p>
              </div>
              <div>
                <ul className="tw-list-disc tw-pl-8 tw-text-sm">
                  <li>
                    Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ:
                    Trần Văn Phú
                  </li>
                  <li>
                    Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước
                    khi ấn "Xác nhận"
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="tw-w-full tw-h-full tw-px-3 tw-py-2 tw-bg-yellow-500 tw-justify-items-center tw-text-white tw-rounded-md tw-cursor-pointer"
              onClick={() => {
                const bookingInfo = prepareBookingData();
                console.log("Thông tin đặt lịch:", bookingInfo);
              }}
            >
              <p>Xác nhận đặt khám</p>
            </div>
            <div className="tw-w-full tw-h-full tw-px-3 tw-text-[13px] tw-text-gray-600">
              <p>
                Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với{" "}
                <a
                  href="https://bookingcare.vn/thong-tin/dieu-khoan-su-dung-p7"
                  className="tw-text-blue-500"
                >
                  Điều khoản sử dụng
                </a>{" "}
                dịch vụ của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default BookingUser;
