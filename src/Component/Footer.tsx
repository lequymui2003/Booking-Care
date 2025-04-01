function Footer() {
  return (
    <>
      {/* footer */}
      <footer className="tw-w-full tw-h-full tw-bg-gray-200">
        {/* footer1 */}
        <div className="tw-grid xl:tw-grid-cols-3 tw-gap-x-5 tw-max-w-6xl tw-mx-auto tw-py-5 sm: tw-grid-cols-1 sm: tw-gap-10 sm: tw-p-4 md:tw-grid-cols-3">
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
              <img src="/svg/Bộ công thương.svg" alt="" className="tw-w-24" />
              <img src="/svg/Bộ công thương.svg" alt="" className="tw-w-24" />
            </div>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <div>
              <a href="">
                <img src="/svg/logo.svg" alt="" className="tw-w-36" />
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
              <div className="tw-content-center">
                <img
                  src="/png/hellodoctorlogo.png"
                  alt=""
                  className="tw-w-16 "
                />
              </div>
              <div className="tw-text-sm">
                <p className="tw-font-medium">Hello Doctor</p>
                <p>Bảo trợ chuyên mục nội dung "sức khỏe tinh thần"</p>
              </div>
            </div>
            <div className="tw-flex tw-flex-row tw-gap-2">
              <div className="tw-content-center">
                <img src="/png/logobernard.png" alt="" className="tw-w-16" />
              </div>
              <div className="tw-text-sm">
                <p className="tw-font-medium">
                  Hệ thống y khoa chuyên sâu quốc tế Bernard
                </p>
                <p>Bảo trợ chuyên mục nội dung "y khoa chuyên sâu"</p>
              </div>
            </div>
            <div className="tw-flex tw-flex-row tw-gap-2">
              <div className="tw-content-center">
                <img
                  src="/png/logo-doctor-check.png"
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
        <div className="tw-flex tw-gap-2 tw-max-w-6xl tw-mx-auto tw-m-1 sm: tw-p-4">
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
        {/* footer3 */}
        <div className="tw-bg-blue-400 tw-h-20 tw-mt-4">
          <div className="tw-flex tw-justify-between tw-max-w-6xl tw-mx-auto sm: tw-p-4">
            <div className="tw-text-xs tw-text-gray-300 tw-mt-2">
              <p>© 2025 BookingCare.</p>
            </div>
            <div className="tw-mt-2 tw-flex tw-gap-3">
              <div>
                <img src="/svg/logo-tiktok.svg" alt="" />
              </div>
              <div>
                <img src="/svg/logo-facebook.svg" alt="" />
              </div>
              <div>
                <img src="/svg/logo-youtube.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
