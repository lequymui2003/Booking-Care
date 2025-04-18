import Header from "./Component/Header";
import Banner from "./Component/Banner";
import ForYou from "./Component/ForYou";
import ComprehensiveService from "./Component/ComprehensiveService";
import Specialty from "./Component/Specialty";
import MedicalFacility from "./Component/MedicalFacility";
import Doctor from "./Component/Doctor";
import RemoteExamination from "./Component/RemoteExamination";
import MentalHealth from "./Component/MentalHealth";
import Handbook from "./Component/Handbook";
import "react-slideshow-image/dist/styles.css";
import { Outlet } from "react-router-dom";
import Footer from "./Component/Footer";
import "./App.css"

function App() {
  return (
    <>
      <Header />
      <Banner />
      {/* Dành cho bạn*/}
      <div className="tw-max-w-6xl tw-min-h-[200px] tw-mx-auto tw-my-8 sm: tw-px-3">
        <div className="tw-text-2xl tw-font-medium">
          <p>Dành cho bạn</p>
        </div>
        {/* */}
        <div className="md:tw-flex tw-grid tw-grid-cols-2 tw-gap-10  tw-justify-around">
          <ForYou></ForYou>
        </div>
      </div>

      {/* Dịch vụ toàn diện */}
      <div className="tw-max-w-6xl tw-min-h-[200px] tw-mx-auto tw-my-8 sm: tw-px-3">
        <div className="tw-text-2xl tw-font-medium">
          <p>Dịch vụ toàn diện</p>
        </div>
        <ComprehensiveService />
      </div>

      {/* Chuyên khoa*/}
      <div className="tw-max-w-6xl tw-min-h-[200px] tw-mx-auto tw-my-8 sm: tw-px-3">
        <div className="tw-flex tw-justify-between">
          <div className="tw-text-2xl tw-font-medium tw-content-center">
            <p>Chuyên khoa</p>
          </div>
          <div className="tw-bg-blue-100 tw-text-blue-500 tw-py-[10px] tw-px-2 tw-rounded-2xl tw-text-[20px] tw-font-medium">
            <button>Xem thêm</button>
          </div>
        </div>
        <div className="tw-flex tw-gap-16">
          <Specialty />
        </div>
      </div>

      {/* Cơ sở y tế*/}
      <div className="tw-max-w-6xl tw-min-h-[200px] tw-mx-auto tw-my-8 sm: tw-px-3">
        <div className="tw-flex tw-justify-between">
          <div className="tw-text-2xl tw-font-medium tw-content-center">
            <p>Cơ sở y tế</p>
          </div>
          <div className="tw-bg-blue-100 tw-text-blue-500 tw-py-[10px] tw-px-2 tw-rounded-2xl tw-text-[20px] tw-font-medium">
            <button>Xem thêm</button>
          </div>
        </div>
        <div className="tw-flex tw-gap-16">
          <MedicalFacility />
        </div>
      </div>

      {/* bác sĩ nổi bật*/}
      <div
        className="tw-w-full tw-min-h-[200px]"
        style={{ backgroundImage: "url('./png/bachgroundDấuCộng.png')" }}
      >
        <div className="tw-max-w-6xl tw-mx-auto tw-pt-5 sm: tw-px-3">
          <div className="tw-flex tw-justify-between">
            <div className="tw-text-2xl tw-font-medium tw-content-center">
              <p>Bác sĩ nổi bật</p>
            </div>
            <div className="tw-bg-blue-100 tw-text-blue-500 tw-py-[10px] tw-px-2 tw-rounded-2xl tw-text-[20px] tw-font-medium">
              <button>Xem thêm</button>
            </div>
          </div>
          <div className="tw-flex tw-gap-8">
            <Doctor />
          </div>
        </div>
      </div>

      {/* Khám từ xa*/}
      <div className="tw-max-w-6xl tw-min-h-[200px] tw-mx-auto tw-my-8 sm: tw-px-3">
        <div className="tw-flex tw-justify-between">
          <div className="tw-text-2xl tw-font-medium tw-content-center">
            <p>Khám từ xa</p>
          </div>
          <div className="tw-bg-blue-100 tw-text-blue-500 tw-py-[10px] tw-px-2 tw-rounded-2xl tw-text-[20px] tw-font-medium">
            <button>Xem thêm</button>
          </div>
        </div>
        <div className="tw-flex tw-gap-16">
          <RemoteExamination />
        </div>
      </div>

      {/* Gợi ý của BookingCare*/}
      {/* <div className="tw-max-w-6xl tw-min-h-[200px] tw-mx-auto sm: tw-px-3">
        <div className="tw-text-2xl tw-font-medium">
          <p>Gợi ý của BookingCare</p>
        </div>
        <div className="tw-flex tw-gap-10">
          <a href="">
            <div className="tw-p-4 tw-flex tw-flex-col tw-gap-2">
              <div>
                <img
                  src="./png/GợiÝCủaBookingCare1.png"
                  alt=""
                  className="tw-w-[178px] tw-rounded-full"
                />
              </div>
              <div className="tw-text-center tw-text-lg tw-font-medium">
                <p>Được quan tâm</p>
              </div>
            </div>
          </a>
        </div>
      </div> */}

      {/* Sức khỏe tinh thần */}
      <div
        className="tw-w-full tw-min-h-[200px]"
        style={{ backgroundImage: "url('./png/background.png')" }}
      >
        <div className="tw-max-w-6xl tw-mx-auto tw-py-5 sm: tw-px-3 ">
          <div className="tw-text-2xl tw-font-normal">
            <p>Sức khỏe tinh thần</p>
          </div>
          <div className="tw-flex tw-gap-16 tw-mt-7">
            <MentalHealth />
          </div>
        </div>
      </div>

      {/* cẩm nang */}
      <div className="tw-max-w-6xl tw-min-h-[200px] tw-mx-auto tw-my-8 sm: tw-px-3">
        <div className="tw-flex tw-justify-between">
          <div className="tw-text-2xl tw-font-medium tw-content-center">
            <p>Cẩm nang</p>
          </div>
          <div className="tw-bg-blue-100 tw-text-blue-500 tw-py-[10px] tw-px-2 tw-rounded-2xl tw-text-[20px] tw-font-medium">
            <button>Xem thêm</button>
          </div>
        </div>
        <div className="tw-flex tw-gap-16 tw-my-4">
          <Handbook />
        </div>
      </div>

      {/* footer */}
       {/* Thêm Outlet để hiển thị nội dung động */}
       <Outlet />
       <Footer />
    </>
  );
}

export default App;
