import Header from "./Header";
import Footer from "./Footer";
import { ItemAppointment } from "../interface/itemAppointment";
import { useAppointment } from "../store/hooks";
import { useEffect } from "react";

function AppointmentSchedule() {
  const userId = localStorage.getItem("userId");
  const [appointments, getAppointments] = useAppointment();

  useEffect(() => {
    getAppointments();
  }, []);


  useEffect(() => {
    const appointment = appointments?.filter(
      (app: ItemAppointment) => app.patientId === Number(userId)
    );
    console.log(appointment);
  }, [appointments]);

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
          <div className="tw-w-[70%] tw-mx-auto tw-border tw-rounded-md tw-h-[274px] tw-py-3 tw-px-7 tw-shadow-lg">
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
                        <p>08:00</p>
                        <p>-</p>
                        <p>08:30</p>
                      </div>
                    </div>
                    <div className="tw-flex tw-gap-2 tw-justify-center tw-text-lg tw-text-yellow-400">
                      <div>
                        <i className="far fa-calendar-alt"></i>
                      </div>
                      <div>
                        <p>26/03/2025</p>
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
                      <p>Lê Quý Mùi</p>
                    </div>
                  </div>
                  <div className="tw-flex tw-gap-2 tw-text-lg">
                    <div>
                      <p>Bác sĩ:</p>
                    </div>
                    <div>
                      <p>Bác sĩ Chuyên khoa I Võ Thị Ngọc Thu</p>
                    </div>
                  </div>
                  <div className="tw-flex tw-gap-2 tw-text-lg">
                    <div>
                      <p>Nơi khám:</p>
                    </div>
                    <div>
                      <p>Bệnh viện Đa khoa Quốc Tế Nam Sài Gòn</p>
                    </div>
                  </div>
                  <div className="tw-flex tw-gap-2 tw-text-lg">
                    <div>
                      <p>Lý do khám:</p>
                    </div>
                    <div>
                      <p>bị viêm xoang</p>
                    </div>
                  </div>
                  <div className="tw-flex tw-gap-2 tw-text-lg">
                    <div>
                      <p>Trạng thái:</p>
                    </div>
                    <div>
                      <p>Chờ xác nhận</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default AppointmentSchedule;
