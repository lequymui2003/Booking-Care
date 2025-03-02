import "./App.css";

function App() {
  return (
    <>
      {/*Header*/}
      <div className="tw-w-full tw-h-[78px] tw-bg-[rgb(237,255,250)]">
        <div className="tw-flex tw-gap-10 tw-max-w-6xl tw-h-full tw-mx-auto">
          {/*Header left*/}
          <div className=" tw-flex tw-items-center tw-gap-4">
            <a href="">
              <img
                src="./svg/icon_menu.svg"
                alt=""
                className="tw-w-[36px] tw-h-[36px] "
              />
            </a>
            <a href="">
              <img
                src="./svg/logo.svg"
                alt=""
                className="tw-w-[200px] tw-h-[43px]"
              />
            </a>
          </div>
          {/*Header middle*/}
          <div className="tw-flex  tw-gap-4 tw-items-center">
            <div>
              <ul className="tw-flex tw-gap-8">
                <li>
                  <a href="" className="tw-text-xs tw-font-semibold">
                    Chuyên khoa
                  </a>
                  <p className="tw-text-[10px]">Tìm bác sĩ theo chuyên khoa</p>
                </li>
                <li>
                  <a href="" className="tw-text-xs tw-font-semibold">
                    Cơ sở y tế
                  </a>
                  <p className="tw-text-[10px]">
                    Chọn bệnh viện phòng khám bệnh
                  </p>
                </li>
                <li>
                  <a href="" className="tw-text-xs tw-font-semibold">
                    Bác sĩ
                  </a>
                  <p className="tw-text-[10px]">Chọn bác sĩ giỏi</p>
                </li>
              </ul>
            </div>
            <div className="tw-flex tw-relative tw-items-center">
              <i className="fas fa-search tw-absolute tw-p-2"></i>
              <input
                type="text"
                className="tw-py-2 tw-px-7 tw-rounded-2xl tw-border-2 tw-border-gray-500"
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
          {/*Header right*/}
          <div className="tw-content-center">
            <a href="">
              <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text tw-text-[rgb(69,195,210)]">
                <img src="./svg/LịchHẹn.svg" alt="" />
                <p>Lịch Hẹn</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/*Banner*/}
      <div
        className="tw-w-full tw-h-[445px] tw-bg-cover tw-bg-center tw-bg-no-repeat"
        style={{ backgroundImage: "url('./jpg/bannerHome1.jpg')" }}
      ></div>
      {/* Dành cho bạn*/}
      <div className="tw-max-w-6xl tw-h-80 tw-mx-auto tw-my-8">
        <div className="tw-text-2xl tw-font-medium">
          <p>Dành cho bạn</p>
        </div>
        <div className="tw-flex tw-gap-10">
          <a href="">
            <div className="tw-p-4 tw-flex tw-flex-col tw-gap-2">
              <div>
                <img
                  src="./png/Danhchoban-CSYT.png"
                  alt=""
                  className="tw-w-[178px] tw-rounded-full"
                />
              </div>
              <div className="tw-text-center tw-text-lg tw-font-medium">
                <p>Cơ sở y tế</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Dịch vụ toàn diện */}
      <div className="tw-max-w-6xl tw-h-80 tw-mx-auto tw-my-8 ">
        <div className="tw-text-2xl tw-font-medium">
          <p>Dịch vụ toàn diện</p>
        </div>
        <div className="tw-flex tw-justify-between tw-mt-5">
          <div
            className="tw-flex tw-gap-10 tw-w-[568px] tw-h-[96px] tw-rounded-2xl tw-border-2 tw-bg-cover tw-bg-center tw-bg-no-repeat"
            style={{ backgroundImage: "url('./png/ic_background.png')" }}
          >
            <div className="tw-content-center tw-ml-10">
              <img
                src="./png/iconkham-chuyen-khoa.png"
                alt=""
                className="tw-w-[56px] tw-h-[56px]"
              />
            </div>
            <div className="tw-content-center tw-text-2xl">
              <p>Khám Chuyên Khoa</p>
            </div>
          </div>
          <div
            className="tw-flex tw-gap-10 tw-w-[568px] tw-h-[96px] tw-rounded-2xl tw-border-2 tw-bg-cover tw-bg-center tw-bg-no-repeat"
            style={{ backgroundImage: "url('./png/ic_background.png')" }}
          >
            <div className="tw-content-center tw-ml-10">
              <img
                src="./png/iconkham-nha-khoa.png"
                alt=""
                className="tw-w-[56px] tw-h-[56px]"
              />
            </div>
            <div className="tw-content-center tw-text-2xl">
              <p>Khám Nha Khoa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chuyên khoa*/}
      <div className="tw-max-w-6xl tw-h-80 tw-mx-auto tw-my-8">
        <div className="tw-flex tw-justify-between">
          <div className="tw-text-2xl tw-font-medium tw-content-center">
            <p>Chuyên khoa</p>
          </div>
          <div className="tw-bg-blue-100 tw-text-blue-500 tw-py-[10px] tw-px-2 tw-rounded-2xl tw-text-[20px] tw-font-medium">
            <button>Xem thêm</button>
          </div>
        </div>
        <a href="">
          <div className="tw-my-4">
            <div className="tw-bg-white tw-rounded-xl tw-w-80 tw-h-[272px] tw-border tw-border-gray-300">
              <div className="tw-p-5">
                <img
                  src="./png/co-xuong-khop.png"
                  alt=""
                  className="tw-rounded-xl tw-w-[277px] tw-h-[174px]"
                />
              </div>
              <div className="tw-text-center tw-text-lg tw-font-medium">
                <p>Cơ Xương Khớp</p>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Cơ sở y tế*/}
      <div className="tw-max-w-6xl tw-h-80 tw-mx-auto tw-my-8">
        <div className="tw-flex tw-justify-between">
          <div className="tw-text-2xl tw-font-medium tw-content-center">
            <p>Cơ sở y tế</p>
          </div>
          <div className="tw-bg-blue-100 tw-text-blue-500 tw-py-[10px] tw-px-2 tw-rounded-2xl tw-text-[20px] tw-font-medium">
            <button>Xem thêm</button>
          </div>
        </div>
        <a href="">
          <div className="tw-my-4">
            <div className="tw-bg-white tw-rounded-xl tw-w-80 tw-h-[272px] tw-border tw-border-gray-300">
              <div className="tw-p-5">
                <img
                  src="./jpg/logo-vietduc.jpg"
                  alt=""
                  className="tw-rounded-xl tw-w-[266px] tw-h-[126px]"
                />
              </div>
              <div className="tw-text-center tw-text-lg tw-font-medium">
                <p>Bệnh viện Hữu nghị Việt Đức</p>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* bác sĩ nổi bật*/}
      <div
        className="tw-w-full tw-h-[400px]"
        style={{ backgroundImage: "url('./png/bachgroundDấuCộng.png')" }}
      >
        <div className="tw-max-w-6xl tw-mx-auto tw-pt-5">
          <div className="tw-flex tw-justify-between">
            <div className="tw-text-2xl tw-font-medium tw-content-center">
              <p>Khám từ xa</p>
            </div>
            <div className="tw-bg-blue-100 tw-text-blue-500 tw-py-[10px] tw-px-2 tw-rounded-2xl tw-text-[20px] tw-font-medium">
              <button>Xem thêm</button>
            </div>
          </div>
          <div className="tw-flex tw-gap-10">
            <div className="tw-p-4 tw-flex tw-flex-col tw-gap-2 tw-w-[252px]">
              <div className="tw-m-auto">
                <img
                  src="./png/doctor1.png"
                  alt=""
                  className="tw-w-[178px] tw-rounded-full"
                />
              </div>
              <div className="tw-text-center ">
                <p className="tw-text-lg tw-font-medium">
                  Thầy thuốc Ưu tú, Bác sĩ CKII Nguyễn Tiến Lãng
                </p>
                <p className="tw-text-base tw-text-gray-400">
                  Tiểu đường - Nội tiết,Ung bướu,Tuyến giáp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Khám từ xa*/}
      <div className="tw-max-w-6xl tw-h-80 tw-mx-auto tw-my-8">
        <div className="tw-flex tw-justify-between">
          <div className="tw-text-2xl tw-font-medium tw-content-center">
            <p>Khám từ xa</p>
          </div>
          <div className="tw-bg-blue-100 tw-text-blue-500 tw-py-[10px] tw-px-2 tw-rounded-2xl tw-text-[20px] tw-font-medium">
            <button>Xem thêm</button>
          </div>
        </div>
        <a href="">
          <div className="tw-my-4">
            <div className="tw-bg-white tw-rounded-xl tw-w-80 tw-h-[272px] tw-border tw-border-gray-300">
              <div className="tw-p-5">
                <img
                  src="./png/KhámTừXa1.png"
                  alt=""
                  className="tw-rounded-xl tw-w-[277px] tw-h-[174px]"
                />
              </div>
              <div className="tw-text-center tw-text-lg tw-font-medium">
                <p>Tư vấn, trị liệu Tâm lý từ xa</p>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Gợi ý của BookingCare*/}
      <div className="tw-max-w-6xl tw-h-80 tw-mx-auto">
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
      </div>

      {/* Sức khỏe tinh thần */}
      <div
        className="tw-w-full tw-h-[370px]"
        style={{ backgroundImage: "url('./png/background.png')" }}
      >
        <div className="tw-max-w-6xl tw-mx-auto tw-pt-5">
          <div className="tw-text-2xl tw-font-normal">
            <p>Sức khỏe tinh thần</p>
          </div>
          <div className="tw-mt-7">
            <div className="tw-bg-white tw-rounded-xl tw-w-80 tw-h-[272px] tw-border tw-border-gray-300">
              <a href="">
                <div className="tw-p-5">
                  <img
                    src="./jpeg/SứcKhỏeTinhThần1.jpeg"
                    alt=""
                    className="tw-rounded-xl"
                  />
                </div>
                <div className="tw-text-center tw-text-lg tw-font-medium">
                  <p>Bài test sức khỏe</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* cẩm nang */}
      <div className="tw-max-w-6xl tw-h-80 tw-mx-auto tw-my-8">
        <div className="tw-flex tw-justify-between">
          <div className="tw-text-2xl tw-font-medium tw-content-center">
            <p>Cẩm nang</p>
          </div>
          <div className="tw-bg-blue-100 tw-text-blue-500 tw-py-[10px] tw-px-2 tw-rounded-2xl tw-text-[20px] tw-font-medium">
            <button>Xem thêm</button>
          </div>
        </div>
        <div className="tw-flex tw-gap-10 tw-my-4">
          <div>
            <a href="" className="tw-flex tw-flex-col tw-gap-3">
              <div>
                <img src="./png/cẩmnang1.png" alt="" className="tw-w-56" />
              </div>
              <div className="tw-w-56 tw-text-base tw-font-medium">
                <p>Review 8 Spa massage chân thư giãn, hiệu quả Hà Nội</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="tw-w-full tw-h-full tw-bg-gray-200">
        {/* footer1 */}
        <div className="tw-grid tw-grid-cols-3 tw-gap-x-5 tw-max-w-6xl tw-mx-auto tw-py-5 ">
          <div className="tw-flex tw-flex-col tw-gap-2">
            <p className="tw-font-bold tw-text-sm">
              Công ty Cổ phần Công nghệ BookingCare
            </p>
            <p className="tw-text-sm">
              <i className="fas fa-map-marker-alt tw-mr-1"></i>
              Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu
              Giấy, Thành phố Hà Nội, Việt Nam
            </p>
            <p className="tw-text-sm">
              <i className="fas fa-shield-alt tw-mr-1"></i>
              ĐKKD số. 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
            </p>
            <p className="tw-text-sm">
              <i className="fas fa-phone tw-mr-1"></i>
              024-7301-2468 (7h30 - 18h)
            </p>
            <p className="tw-text-sm">
              <i className="fas fa-envelope tw-mr-1"></i>
              support@bookingcare.vn (7h30 - 18h)
            </p>
            <p className="tw-font-bold tw-text-sm">
              Văn phòng tại TP Hồ Chí Minh
            </p>
            <p className="tw-text-sm">
              <i className="fas fa-map-marker-alt tw-mr-1"></i>
              Tòa nhà H3, 384 Hoàng Diệu, Phường 6, Quận 4, TP.HCM
            </p>
            <div className="tw-flex tw-gap-2">
              <img src="./svg/Bộ công thương.svg" alt="" className="tw-w-24" />
              <img src="./svg/Bộ công thương.svg" alt="" className="tw-w-24" />
            </div>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <div>
              <a href="">
                <img src="./svg/logo.svg" alt="" className="tw-w-36" />
              </a>
            </div>
            <div className="tw-text-blue-400 tw-flex tw-flex-col tw-gap-3">
              <div className="tw-text-sm">
                <a href="">Liên hệ hợp tác</a>
              </div>
              <div className="tw-text-sm">
                <a href="">Chuyển đổi số</a>
              </div>
              <div className="tw-text-sm">
                <a href="">Chính sách bảo mật</a>
              </div>
              <div className="tw-text-sm">
                <a href="">Quy chế hoạt động</a>
              </div>
              <div className="tw-text-sm">
                <a href="">Tuyển dụng</a>
              </div>
              <div className="tw-text-sm">
                <a href="">Điều khiển sử dụng</a>
              </div>
              <div className="tw-text-sm">
                <a href="">Câu hỏi thường gặp</a>
              </div>
              <div className="tw-text-sm">
                <a href="">Sức khỏe doanh nghiệp</a>
              </div>
            </div>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <div>
              <p>Đối tác bảo trợ nội dung</p>
            </div>
            <div className="tw-flex tw-flex-row tw-gap-2">
              <div className="tw-m-auto">
                <img
                  src="./png/hellodoctorlogo.png"
                  alt=""
                  className="tw-w-16"
                />
              </div>
              <div className="tw-text-sm">
                <p className="tw-font-medium">Hello Doctor</p>
                <p>Bảo trợ chuyên mục nội dung "sức khỏe tinh thần"</p>
              </div>
            </div>
            <div className="tw-flex tw-flex-row tw-gap-2">
              <div className="tw-m-auto">
                <img src="./png/logobernard.png" alt="" className="tw-w-16" />
              </div>
              <div className="tw-text-sm">
                <p className="tw-font-medium">
                  Hệ thống y khoa chuyên sâu quốc tế Bernard
                </p>
                <p>Bảo trợ chuyên mục nội dung "y khoa chuyên sâu"</p>
              </div>
            </div>
            <div className="tw-flex tw-flex-row tw-gap-2">
              <div className="tw-m-auto">
                <img
                  src="./png/logo-doctor-check.png"
                  alt=""
                  className="tw-w-16"
                />
              </div>
              <div className="tw-text-sm">
                <p className="tw-font-medium">
                  Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn
                </p>
                <p>Bảo trợ chuyên mục nội dung "sức khỏe tổng quát"</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="tw-max-w-6xl tw-mx-auto tw-border-t-2 tw-border-gray-400" />
        {/* footer2 */}
        <div className="tw-flex tw-gap-2 tw-max-w-6xl tw-mx-auto tw-m-1">
          <div>
            <i className="fas fa-mobile-alt"></i>
          </div>
          <div>
            <p>
              Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng:
              <a href="https://bookingcare.vn/app" className="tw-text-blue-400">
                {" "}
                Android - iPhone/iPad - Khác
              </a>
            </p>
          </div>
        </div>
        <div className="tw-bg-blue-400 tw-h-20 tw-mt-4">
          <div className="tw-flex tw-justify-between tw-max-w-6xl tw-mx-auto">
            <div className="tw-text-xs tw-text-gray-300 tw-mt-2">
              <p>© 2025 BookingCare.</p>
            </div>
            <div className="tw-mt-2 tw-flex tw-gap-3">
              <div>
                <img src="./svg/logo-tiktok.svg" alt="" />
              </div>
              <div>
                <img src="./svg/logo-facebook.svg" alt="" />
              </div>
              <div>
                <img src="./svg/logo-youtube.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
