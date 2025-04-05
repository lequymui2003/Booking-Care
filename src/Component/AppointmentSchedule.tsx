import Header from "./Header";
import Footer from "./Footer";
import { useAppointmentData } from "./useAppointmentData";

function AppointmentSchedule() {
  const userId = localStorage.getItem("userId");
  const { userAppointments, isLoading } = useAppointmentData(userId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  //   if (appointments && patients && doctors && timeSlots && clinics) {
  //     // Lọc appointments của user hiện tại
  //     const userApps = appointments.filter(
  //       (app: any) => app.patientId === Number(userId)
  //     );

  //     // Kết hợp với các thông tin liên quan
  //     const enrichedApps = userApps.map((app: any) => {
  //       // Tìm thông tin patient
  //       const patient = patients.find((p: any) => p.id === app.patientId);

  //       // Tìm thông tin doctor
  //       const doctor = doctors.find((d: any) => d.id === app.doctorId);

  //       // Tìm thông tin time slot
  //       const timeSlot = timeSlots.find((ts: any) => ts.id === app.timeSlotId);

  //       const clinic = clinics.find((c: any) => c.id === doctor?.clinicId);

  //       // Định dạng lại ngày tháng
  //       const formattedDate = formatAppointmentDate(app.appointmentDate);

  //       return {
  //         ...app,
  //         patientName: patient?.fullName || "Không xác định",
  //         doctorName: doctor?.fullName || "Không xác định",
  //         doctorImage: doctor?.image || "",
  //         clinicName: clinic.clinicName || "Không xác định",
  //         startTime: timeSlot?.startTime || "--:--",
  //         endTime: timeSlot?.endTime || "--:--",
  //         formattedDate: formattedDate,
  //       };
  //     });

  //     setUserAppointments(enrichedApps);
  //     console.log("Enriched appointments:", enrichedApps);
  //   }
  // }, [appointments, patients, doctors, timeSlots, userId]);

  // // Hàm định dạng ngày tháng
  // const formatAppointmentDate = (dateString: string) => {
  //   if (!dateString) return "Không xác định";

  //   try {
  //     const date = new Date(dateString);

  //     // Kiểm tra nếu date không hợp lệ
  //     if (isNaN(date.getTime())) {
  //       return "Ngày không hợp lệ";
  //     }

  //     const day = date.getDate().toString().padStart(2, "0");
  //     const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //     const year = date.getFullYear();

  //     return `${day}/${month}/${year}`;
  //   } catch (error) {
  //     console.error("Error formatting date:", error);
  //     return "Định dạng lỗi";
  //   }
  // };

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
          <div className="tw-text-2xl">
            <p>Lịch hẹn đã đặt</p>
          </div>
          {userAppointments.length > 0 ? (
            userAppointments.map((appointments, index: number) => (
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
                            <p>{appointments.startTime}</p>
                            <p>-</p>
                            <p>{appointments.endTime}</p>
                          </div>
                        </div>
                        <div className="tw-flex tw-gap-2 tw-justify-center tw-text-lg tw-text-yellow-400">
                          <div>
                            <i className="far fa-calendar-alt"></i>
                          </div>
                          <div>
                            <p>{appointments.formattedDate}</p>
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
                          <p>{appointments.patientName}</p>
                        </div>
                      </div>
                      <div className="tw-flex tw-gap-2 tw-text-lg">
                        <div>
                          <p>Bác sĩ:</p>
                        </div>
                        <div>
                          <p>{appointments.doctorName}</p>
                        </div>
                      </div>
                      <div className="tw-flex tw-gap-2 tw-text-lg">
                        <div>
                          <p>Nơi khám:</p>
                        </div>
                        <div>
                          <p>{appointments.clinicName}</p>
                        </div>
                      </div>
                      <div className="tw-flex tw-gap-2 tw-text-lg">
                        <div>
                          <p>Lý do khám: {appointments.reason}</p>
                        </div>
                      </div>
                      <div className="tw-flex tw-gap-2 tw-text-lg">
                        <div>
                          <p>Trạng thái:</p>
                        </div>
                        <div>
                          <p>{appointments.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            ))
          ) : (
            <div className="tw-w-full tw-text-3xl tw-text-center tw-py-10 tw-text-gray-500">
              <p>Bạn không có lịch hẹn nào</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default AppointmentSchedule;
