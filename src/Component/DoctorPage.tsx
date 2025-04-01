import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDoctor, useSpecialties, useClinic } from "../store/hooks";
import { ItemDoctor } from "../interface/itemDoctor";
import { ItemSpecialty } from "../interface/itemSpecialty";
import { ItemClinic } from "../interface/listClinic";

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

  useEffect(() => {
    getDoctor();
    getSpecialties();
    getClinic();
  }, []);

  // So sánh id từ URL với id của bác sĩ
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

  const handleClick = () => {
    navigate("/booking");
  };

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

    // Kiểm tra
    // console.log("Các ngày làm việc:", workDays);
  }, []);

  const date = [
    {
      firstTime: "10:30",
      secondTime: "11:00",
    },
    {
      firstTime: "11:00",
      secondTime: "11:30",
    },
    {
      firstTime: "13:00",
      secondTime: "13:30",
    },
    {
      firstTime: "14:00",
      secondTime: "14:30",
    },
  ];

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
                  {/* Bác sĩ có 35 năm kinh nghiệm về vực Cột sống, thần kinh, cơ
                  xương khớp <br />
                  Phó chủ tịch hội Phẫu thuật cột sống Việt Nam <br />
                  Bác sĩ nhận khám từ 7 tuổi trở lên */}
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
                  <select className="tw-text-sky-600 tw-text-sm tw-p-2 tw-border-0 tw-border-b-2 tw-border-gray-300 tw-rounded-none tw-outline-none tw-bg-transparent focus:tw-outline-none focus:tw-ring-0 focus:tw-border-blue-500 hover:tw-border-gray-400">
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
                {date.map((item, index) => (
                  <div
                    key={index}
                    onClick={handleClick}
                    className="tw-text-sm tw-px-2 tw-py-3 tw-border tw-w-[100px] tw-bg-gray-200 tw-cursor-pointer hover:tw-bg-sky-600 hover:tw-text-white"
                  >
                    <div className="tw-flex tw-gap-1 tw-justify-center">
                      <p>{item.firstTime}</p>
                      <p>-</p>
                      <p>{item.secondTime}</p>
                    </div>
                  </div>
                ))}
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
