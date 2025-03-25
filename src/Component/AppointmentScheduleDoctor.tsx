import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

// Define the Appointment type
type Appointment = {
  id: number;
  type: string;
  timeStart: string;
  timeEnd: string;
  date: string;
  patient: string;
  doctor: string;
  location: string;
  reason: string;
  status: string;
};

// Define the AppointmentsData type
type AppointmentsData = {
  pending: Appointment[];
  confirmed: Appointment[];
  doctor: Appointment[];
};

// Define the possible tab types
type TabType = "pending" | "confirmed" | "doctor";

function AppointmentScheduleDoctor() {
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [selectedDate, setSelectedDate] = useState("");
  const [appointmentsData, setAppointmentsData] = useState<AppointmentsData>({
    pending: [
      {
        id: 1,
        type: "KHÁM",
        timeStart: "08:00",
        timeEnd: "08:30",
        date: "2025-03-26",
        patient: "Lê Quý Mùi",
        doctor: "Bác sĩ Chuyên khoa I Võ Thị Ngọc Thu",
        location: "Bệnh viện Đa khoa Quốc Tế Nam Sài Gòn",
        reason: "bị viêm xoang",
        status: "Chờ xác nhận",
      },
      {
        id: 2,
        type: "KHÁM",
        timeStart: "09:30",
        timeEnd: "10:00",
        date: "2025-03-27",
        patient: "Nguyễn Văn Hùng",
        doctor: "Bác sĩ Chuyên khoa I Võ Thị Ngọc Thu",
        location: "Bệnh viện Đa khoa Quốc Tế Nam Sài Gòn",
        reason: "Đau đầu kéo dài",
        status: "Chờ xác nhận",
      },
    ],
    confirmed: [
      {
        id: 3,
        type: "KHÁM",
        timeStart: "10:00",
        timeEnd: "10:30",
        date: "2025-03-27",
        patient: "Nguyễn Văn An",
        doctor: "Bác sĩ Chuyên khoa I Võ Thị Ngọc Thu",
        location: "Bệnh viện Đa khoa Quốc Tế Nam Sài Gòn",
        reason: "Khám tổng quát",
        status: "Đã xác nhận",
      },
      {
        id: 4,
        type: "KHÁM",
        timeStart: "11:00",
        timeEnd: "11:30",
        date: "2025-03-28",
        patient: "Trần Thị Mai",
        doctor: "Bác sĩ Chuyên khoa I Võ Thị Ngọc Thu",
        location: "Bệnh viện Đa khoa Quốc Tế Nam Sài Gòn",
        reason: "Kiểm tra sức khỏe",
        status: "Đã xác nhận",
      },
    ],
    doctor: [
      {
        id: 5,
        type: "KHÁM",
        timeStart: "14:00",
        timeEnd: "14:30",
        date: "2025-03-28",
        patient: "Trần Văn Bình",
        doctor: "Bác sĩ Chuyên khoa I Võ Thị Ngọc Thu",
        location: "Bệnh viện Đa khoa Quốc Tế Nam Sài Gòn",
        reason: "Khám nội tổng quát",
        status: "Chờ xác nhận",
      },
    ],
  });

  // Handle appointment confirmation
  const handleConfirmAppointment = (appointmentId: number) => {
    // Create a copy of the current appointments data
    const updatedAppointmentsData = { ...appointmentsData };

    // Find and update the appointment in the pending list
    const pendingAppointmentIndex = updatedAppointmentsData.pending.findIndex(
      (app) => app.id === appointmentId
    );

    if (pendingAppointmentIndex !== -1) {
      // Remove the appointment from pending
      const confirmedAppointment = updatedAppointmentsData.pending.splice(
        pendingAppointmentIndex,
        1
      )[0];

      // Update the status
      confirmedAppointment.status = "Đã xác nhận";

      // Add to confirmed appointments
      updatedAppointmentsData.confirmed.push(confirmedAppointment);

      // Update the state
      setAppointmentsData(updatedAppointmentsData);
    }
  };

  // Filter appointments based on active tab and selected date
  const filteredAppointments = appointmentsData[activeTab].filter(
    (appointment) => !selectedDate || appointment.date === selectedDate
  );

  // Mapping of appointment details
  const appointmentDetails = [
    { label: "Bệnh nhân:", key: "patient" },
    { label: "Bác sĩ:", key: "doctor" },
    { label: "Nơi khám:", key: "location" },
    { label: "Lý do khám:", key: "reason" },
  ];

  // Render appointment card
  const renderAppointmentCard = (appointment: Appointment) => (
    <div className="tw-flex" key={appointment.id}>
      <div className="tw-w-[70%] tw-mx-auto tw-border tw-rounded-md tw-py-3 tw-px-7 tw-shadow-lg">
        <div className="tw-flex tw-flex-col tw-gap-5">
          <div className="tw-flex tw-gap-5 tw-w-full">
            <div className="tw-w-1/3 tw-flex tw-flex-col tw-gap-4">
              <div className="tw-flex tw-flex-col tw-gap-2">
                <div className="tw-flex tw-justify-center">
                  <div className="tw-border tw-rounded-full tw-w-20 tw-h-20 tw-flex tw-justify-center">
                    <div className="tw-content-center">
                      <img
                        src="./png/ic_kham.png"
                        alt=""
                        className="tw-w-[40px] tw-h-[50px]"
                      />
                    </div>
                  </div>
                </div>
                <div className="tw-flex tw-justify-center tw-text-lg tw-text-sky-600">
                  <p>{appointment.type}</p>
                </div>
              </div>
              <div className="tw-flex tw-flex-col tw-gap-1">
                <div className="tw-flex tw-gap-2 tw-justify-center tw-text-lg tw-text-yellow-400">
                  <div>
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="tw-flex tw-gap-1">
                    <p>{appointment.timeStart}</p>
                    <p>-</p>
                    <p>{appointment.timeEnd}</p>
                  </div>
                </div>
                <div className="tw-flex tw-gap-2 tw-justify-center tw-text-lg tw-text-yellow-400">
                  <div>
                    <i className="far fa-calendar-alt"></i>
                  </div>
                  <div>
                    <p>
                      {new Date(appointment.date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-w-2/3 tw-flex tw-flex-col tw-gap-2">
              {appointmentDetails.map(({ label, key }) => (
                <div
                  key={key}
                  className={`tw-flex tw-gap-2 tw-text-lg ${
                    key === "patient" ? "tw-font-bold" : ""
                  }`}
                >
                  <div>
                    <p>{label}</p>
                  </div>
                  <div>
                    <p>{appointment[key as keyof Appointment]}</p>
                  </div>
                </div>
              ))}
              {/* Status display */}
              <div className="tw-flex tw-gap-2 tw-text-lg">
                <div>
                  <p>Trạng thái:</p>
                </div>
                <div>
                  <p>{appointment.status}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {/* Confirmation button for pending appointments */}
          {activeTab === "pending" && (
            <div className="tw-flex tw-justify-center tw-mt-3">
              <button
                onClick={() => handleConfirmAppointment(appointment.id)}
                className="tw-bg-green-500 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-hover:bg-green-600"
              >
                Xác nhận
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

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
                <p>Lịch hẹn</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tw-max-w-6xl tw-mx-auto tw-h-full tw-mb-5">
        <div className="tw-flex tw-flex-col tw-gap-10 tw-px-4 tw-my-2">
          <div className="tw-text-2xl">
            <p>Lịch hẹn</p>
          </div>

          {/* Tab Navigation */}
          <div className="tw-flex tw-justify-center tw-mb-4">
            <div className="tw-flex tw-border tw-rounded-md">
              <button
                onClick={() => setActiveTab("pending")}
                className={`tw-px-4 tw-py-2 ${
                  activeTab === "pending"
                    ? "tw-bg-sky-600 tw-text-white"
                    : "tw-bg-white tw-text-sky-600"
                }`}
              >
                Chờ xác nhận
              </button>
              <button
                onClick={() => setActiveTab("confirmed")}
                className={`tw-px-4 tw-py-2 ${
                  activeTab === "confirmed"
                    ? "tw-bg-sky-600 tw-text-white"
                    : "tw-bg-white tw-text-sky-600"
                }`}
              >
                Đã xác nhận
              </button>
              <button
                onClick={() => setActiveTab("doctor")}
                className={`tw-px-4 tw-py-2 ${
                  activeTab === "doctor"
                    ? "tw-bg-sky-600 tw-text-white"
                    : "tw-bg-white tw-text-sky-600"
                }`}
              >
                Đặt lịch khám của Bác sĩ
              </button>
            </div>
          </div>

          {/* Ngày lọc */}
          <div className="tw-flex tw-justify-center tw-mb-4">
            <div className="tw-flex tw-items-center tw-gap-2">
              <label className="tw-text-lg">Lọc theo ngày:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="tw-border tw-rounded tw-px-2 tw-py-1"
              />
            </div>
          </div>

          {/* Appointment List */}
          <div className="tw-flex tw-flex-col tw-gap-3">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(renderAppointmentCard)
            ) : (
              <div className="tw-w-[70%] tw-mx-auto tw-text-center tw-text-lg tw-text-gray-500 tw-py-4">
                Không có lịch hẹn hôm nay
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AppointmentScheduleDoctor;
