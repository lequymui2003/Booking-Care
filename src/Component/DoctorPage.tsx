import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function DoctorPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/booking");
  };
  const [options, setOptions] = useState<string[]>([]);

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
    console.log("Các ngày làm việc:", workDays);
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
              <div>Cơ xương khớp</div>
              <div className="tw-hidden md:tw-block">
                <p>/</p>
              </div>
            </div>
            <div className="tw-hidden md:tw-block">Tên bác sĩ</div>
          </div>
          <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-10 tw-w-full">
            <div className="tw-justify-items-center">
              <div className="tw-w-[140px] tw-h-[140px] md:tw-w-[140px] md:tw-h-[140px] tw-overflow-hidden tw-flex tw-items-center tw-justify-center tw-rounded-full">
                <img
                  src="./png/doctor1.png"
                  alt="Bác sĩ"
                  className="tw-w-full tw-h-full"
                />
              </div>
            </div>
            <div className="md:tw-w-[550px] tw-flex tw-flex-col tw-gap-1">
              <div className="tw-text-2xl">
                <p>PGS. TS. BSCKII. TTUT Vũ Văn Hòe</p>
              </div>
              <div>
                <span className="tw-whitespace-pre-line tw-text-sm tw-text-[#555]">
                  Bác sĩ có 35 năm kinh nghiệm về vực Cột sống, thần kinh, cơ
                  xương khớp <br />
                  Phó chủ tịch hội Phẫu thuật cột sống Việt Nam <br />
                  Bác sĩ nhận khám từ 7 tuổi trở lên
                </span>
              </div>
              <div className="tw-text-sm tw-flex tw-gap-1">
                <div>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <p>Hà Nội</p>
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
                  <p>Phòng khám Đa khoa Mediplus</p>
                </div>
                <div className="tw-text-[13px] ">
                  <p>
                    Tầng 2, Trung tâm thương mại Mandarin Garden 2, 99 phố Tân
                    Mai, Tân Mai, Hoàng Mai, Hà Nội
                  </p>
                </div>
              </div>
              <div className="tw-flex tw-gap-1">
                <div className="tw-text-sm tw-text-gray-500 tw-content-center">
                  <p>GIÁ KHÁM:</p>
                </div>
                <div className="tw-text-sm tw-content-center">
                  <p>500.000đ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="tw-w-full tw-h-[1px] tw-bg-slate-800" />
      <div className="tw-w-full tw-h-full tw-bg-slate-100 tw-py-8">
        <div className="tw-max-w-6xl tw-mx-auto">
          <div>
            <div className="tw-px-4 tw-text-base tw-font-bold">
              <p>Tiến sĩ, Bác sĩ chuyên khoa II Lê Quốc Việt</p>
            </div>
            <div className="tw-px-4">
              <ul className="tw-list-disc tw-pl-8 tw-text-sm">
                <li>
                  20 năm kinh nghiệm trong khám và điều trị bệnh lý về Nội Thần
                  kinh
                </li>
                <li>
                  Từng công tác nhiều năm tại khoa Nội Thần kinh, Bệnh viện Nhân
                  dân 115
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="tw-px-4 tw-py-4 tw-text-base tw-font-bold">
              <p>Khám và điều trị</p>
            </div>
            <div className="tw-px-4">
              <ul className="tw-list-disc tw-pl-8 tw-text-sm">
                <li>
                  Tầm soát, phòng ngừa hoặc điều trị Tai biến mạch máu não (Đột
                  qụy)
                </li>
                <li>
                  Điều trị đau đầu cấp tính và mạn tính do nhồi máu não, u não,
                  u màng não, chảy máu não
                </li>
                <li>
                  Điều trị các bệnh đau đầu: Chứng đau nửa đầu, đau đầu căn
                  nguyên mạch máu, đau đầu mạn tính
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="tw-px-4 tw-py-4 tw-text-base tw-font-bold">
              <p>Quá trình công tác</p>
            </div>
            <div className="tw-px-4">
              <ul className="tw-list-disc tw-pl-8 tw-text-sm">
                <li>
                  Hiện là Bác sĩ Nội Thần kinh, Bệnh viện Quốc tế City (2016 -
                  Nay)
                </li>
                <li>
                  Bác sĩ điều trị khoa Nội Thần kinh, Bệnh viện Nhân dân 115
                  (2005 - 2016)
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="tw-px-4 tw-py-4 tw-text-base tw-font-bold">
              <p>Quá trình đào tạo</p>
            </div>
            <div className="tw-px-4">
              <ul className="tw-list-disc tw-pl-8 tw-text-sm">
                <li>
                  Tốt nghiệp Thạc sĩ chuyên ngành Thần kinh, Đại học Y dược TP.
                  HCM (2013)
                </li>
                <li>
                  Tốt nghiệp Bác sĩ Đa khoa, Đại học Y khoa Phạm Ngọc Thạch
                  (2002)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DoctorPage;
