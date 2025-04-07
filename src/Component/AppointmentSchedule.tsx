import Header from "./Header";
import Footer from "./Footer";
import { useAppointmentData } from "./useAppointmentData";
import { useState } from "react";

function AppointmentSchedule() {
  const userId = localStorage.getItem("userId");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const { userAppointments, isLoading } = useAppointmentData(userId);
  const [activeTab, setActiveTab] = useState("pending"); // "pending" or "confirmed"
  const [dateFilter, setDateFilter] = useState(""); // State để lưu ngày cần tìm kiếm
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Filter appointments based on status
  const pendingAppointments = userAppointments.filter(
    (appointment) => appointment.status === "Chờ xác nhận"
  );
  const confirmedAppointments = userAppointments.filter(
    (appointment) => appointment.status === "Đã xác nhận"
  );

  // Filter by date
  const filterAppointmentsByDate = (appointments: any[]) => {
    if (!dateFilter) return appointments;

    return appointments.filter((appointment) => {
      const dateOnly = new Date(appointment.appointmentDate).toLocaleDateString(
        "en-CA"
      ); // --> "yyyy-mm-dd"
      return dateOnly === dateFilter;
    });
  };

  // Apply both status and date filters
  const filteredPendingAppointments =
    filterAppointmentsByDate(pendingAppointments);
  const filteredConfirmedAppointments = filterAppointmentsByDate(
    confirmedAppointments
  );

  // Determine which appointments to display based on active tab
  const displayedAppointments =
    activeTab === "pending"
      ? filteredPendingAppointments
      : filteredConfirmedAppointments;

  const totalPages = Math.ceil(displayedAppointments.length / itemsPerPage);

  const paginatedAppointments = displayedAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
                <p>Lịch hẹn đã đặt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tw-max-w-6xl tw-mx-auto tw-h-full tw-mb-5">
        <div className="tw-flex tw-flex-col tw-gap-10 tw-px-4 tw-my-2">
          <div className="tw-flex tw-justify-between tw-items-center">
            <div className="tw-text-2xl">
              <p>Lịch hẹn đã đặt</p>
            </div>

            {/* Date filter control */}
            <div className="tw-flex tw-items-center tw-gap-4">
              <div className="tw-flex tw-items-center tw-gap-2">
                <label htmlFor="dateFilter" className="tw-text-gray-700">
                  Tìm theo ngày:
                </label>
                <input
                  type="date"
                  id="dateFilter"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="tw-border tw-rounded tw-px-3 tw-py-1"
                />
                {dateFilter && (
                  <button
                    onClick={() => setDateFilter("")}
                    className="tw-text-red-500 hover:tw-text-red-700"
                  >
                    <i className="fas fa-times"></i> Xóa lọc
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="tw-flex tw-border-b tw-border-gray-200">
            <button
              className={`tw-py-2 tw-px-4 tw-font-medium ${
                activeTab === "pending"
                  ? "tw-text-sky-600 tw-border-b-2 tw-border-sky-600"
                  : "tw-text-gray-500 hover:tw-text-sky-500"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Chờ xác nhận ({filteredPendingAppointments.length})
            </button>
            <button
              className={`tw-py-2 tw-px-4 tw-font-medium ${
                activeTab === "confirmed"
                  ? "tw-text-sky-600 tw-border-b-2 tw-border-sky-600"
                  : "tw-text-gray-500 hover:tw-text-sky-500"
              }`}
              onClick={() => setActiveTab("confirmed")}
            >
              Đã xác nhận ({filteredConfirmedAppointments.length})
            </button>
          </div>

          {/* Appointments list */}
          {paginatedAppointments.length > 0 ? (
            paginatedAppointments.map((appointment: any, index: number) => (
              <div
                key={index}
                className="tw-w-[70%] tw-mx-auto tw-border tw-rounded-md tw-h-[274px] tw-py-3 tw-px-7 tw-shadow-lg"
              >
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
                          <p>KHÁM</p>
                        </div>
                      </div>
                      <div className="tw-flex tw-flex-col tw-gap-1">
                        <div className="tw-flex tw-gap-2 tw-justify-center tw-text-lg tw-text-yellow-400">
                          <div>
                            <i className="fas fa-clock"></i>
                          </div>
                          <div className="tw-flex tw-gap-1">
                            <p>{appointment.startTime}</p>
                            <p>-</p>
                            <p>{appointment.endTime}</p>
                          </div>
                        </div>
                        <div className="tw-flex tw-gap-2 tw-justify-center tw-text-lg tw-text-yellow-400">
                          <div>
                            <i className="far fa-calendar-alt"></i>
                          </div>
                          <div>
                            <p>
                              {new Date(
                                appointment.appointmentDate
                              ).toLocaleDateString("vi-VN")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tw-w-2/3 tw-flex tw-flex-col tw-gap-2">
                      <div className="tw-flex tw-gap-2 tw-text-lg tw-font-bold">
                        <div>
                          <p>Bệnh nhân:</p>
                        </div>
                        <div>
                          <p>{appointment.patientName}</p>
                        </div>
                      </div>
                      <div className="tw-flex tw-gap-2 tw-text-lg">
                        <div>
                          <p>Bác sĩ:</p>
                        </div>
                        <div>
                          <p>{appointment.doctorName}</p>
                        </div>
                      </div>
                      <div className="tw-flex tw-gap-2 tw-text-lg">
                        <div>
                          <p>Nơi khám:</p>
                        </div>
                        <div>
                          <p>{appointment.clinicName}</p>
                        </div>
                      </div>
                      <div className="tw-flex tw-gap-2 tw-text-lg">
                        <div>
                          <p>Lý do khám: {appointment.reason}</p>
                        </div>
                      </div>
                      <div className="tw-flex tw-gap-2 tw-text-lg">
                        <div>
                          <p>Trạng thái:</p>
                        </div>
                        <div>
                          <p>{appointment.status}</p>
                        </div>
                      </div>

                      {/* Chỉ hiển thị nút Hủy lịch cho tab pending */}
                      {activeTab === "pending" && (
                        <div className="tw-flex tw-gap-4 tw-mt-1">
                          <button className="tw-bg-red-500 hover:tw-bg-red-600 tw-text-white tw-py-2 tw-px-4 tw-rounded">
                            Hủy lịch
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            ))
          ) : (
            <div className="tw-w-full tw-text-3xl tw-text-center tw-py-10 tw-text-gray-500">
              <p>
                {activeTab === "pending"
                  ? dateFilter
                    ? "Không có lịch hẹn nào chờ xác nhận trong ngày này"
                    : "Không có lịch hẹn nào chờ xác nhận"
                  : dateFilter
                  ? "Không có lịch hẹn nào đã xác nhận trong ngày này"
                  : "Không có lịch hẹn nào đã xác nhận"}
              </p>
            </div>
          )}
          {totalPages > 1 && (
            <div className="tw-flex tw-justify-center tw-gap-3 tw-mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="tw-px-3 tw-py-1 tw-border tw-rounded hover:tw-bg-gray-100"
              >
                &laquo;
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`tw-px-3 tw-py-1 tw-border tw-rounded ${
                    currentPage === i + 1
                      ? "tw-bg-sky-500 tw-text-white"
                      : "hover:tw-bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="tw-px-3 tw-py-1 tw-border tw-rounded hover:tw-bg-gray-100"
              >
                &raquo;
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AppointmentSchedule;
