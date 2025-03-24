import Header from "./Header";
import Footer from "./Footer";
function BookingUser() {
  return (
    <>
      <Header />
      <div>
        <div className="tw-w-full tw-mx-auto tw-h-full tw-bg-gray-200">
          <div className="tw-max-w-6xl tw-mx-auto tw-h-full tw-flex tw-justify-center tw-content-center tw-gap-5 tw-py-3 tw-px-3">
            <div className="tw-w-[110px] tw-h-[110px] tw-mt-4 tw-overflow-hidden tw-flex tw-rounded-full">
              <img
                src="./png/doctor1.png"
                alt="Bác sĩ"
                className="tw-w-[110px] tw-h-[110px] tw-object-cover"
              />
            </div>
            <div className="tw-flex tw-flex-col tw-gap-2">
              <div className="tw-text-base">
                <p>ĐẶT LỊCH KHÁM</p>
              </div>
              <div className="tw-text-base tw-text-sky-800">
                <p>Phó giáo sư, Tiến Sĩ, Bác sĩ CK II Nguyễn Văn Quýnh</p>
              </div>
              <div className="tw-flex tw-gap-2 tw-text-sm">
                <div>
                  <i className="far fa-calendar-alt"></i>
                </div>
                <div className="tw-text-yellow-400 tw-flex">
                  <div className="tw-flex tw-gap-1 ">
                    <div>
                      <p>10:30</p>
                    </div>
                    <div>
                      <p>-</p>
                    </div>
                    <div>
                      <p>11:00</p>
                    </div>
                  </div>
                  <div>
                    <p>-</p>
                  </div>
                  <div>
                    <p> Thứ 3 - 25/03/2025</p>
                  </div>
                </div>
              </div>
              <div className="tw-flex tw-gap-1 tw-text-sm">
                <div>
                  <i className="fas fa-clinic-medical"></i>
                </div>
                <div className="tw-content-end">
                  <p>Hệ thống Y tế Thu Cúc cơ sở Thụy Khuê</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tw-max-w-6xl tw-mx-auto tw-h-full tw-flex tw-justify-center tw-content-center tw-py-3 tw-px-3">
          <div className="tw-flex tw-flex-col tw-gap-3 tw-w-[400px] md:tw-w-[500px]">
            <div>
              <div className="tw-w-full tw-border tw-px-3 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-text-sm focus-within:tw-border-blue-500">
                <i className="fa-solid fa-user tw-text-gray-500"></i>
                <input
                  type="text"
                  placeholder="Họ tên bệnh nhân (Bắt buộc)"
                  className="tw-w-full focus:tw-outline-none"
                />
              </div>
              <div className="tw-text-[13px] tw-text-gray-400">
                <p>
                  Hãy ghi rõ Họ Và Tên, viết hoa những chữ cái đầu tiên, ví dụ:
                  Trần Văn Phú
                </p>
              </div>
            </div>
            <div className="tw-flex tw-items-center tw-space-x-6">
              <label className="tw-flex tw-items-center tw-space-x-2">
                <input
                  type="radio"
                  name="gender"
                  className="tw-w-[14px] tw-h-[14px] tw-text-blue-600 tw-border-gray-300"
                />
                <span>Nam</span>
              </label>

              <label className="tw-flex tw-items-center tw-space-x-2">
                <input
                  type="radio"
                  name="gender"
                  className="tw-w-[14px] tw-h-[14px] tw-text-pink-600 tw-border-gray-300"
                />
                <span>Nữ</span>
              </label>
            </div>
            <div className="tw-w-full tw-border tw-px-3 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-text-sm focus-within:tw-border-blue-500">
              <i className="fas fa-mobile-alt tw-text-gray-500"></i>
              <input
                type="tel"
                placeholder="Số điện thoại"
                className="tw-w-full focus:tw-outline-none peer"
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </div>
            <div className="tw-w-full tw-border tw-px-3 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-text-sm focus-within:tw-border-blue-500">
              <i className="fas fa-envelope tw-text-gray-500"></i>
              <input
                type="email"
                placeholder="Địa chỉ Email"
                className="tw-w-full focus:tw-outline-none"
              />
            </div>
            <div className="tw-w-full tw-border tw-px-3 tw-py-2 tw-rounded-lg  tw-text-sm focus-within:tw-border-blue-500">
              <input
                type="date"
                className="tw-w-full focus:tw-outline-none"
                max={new Date().toISOString().split("T")[0]} // Chặn ngày tương lai
              />
            </div>
            <div className="tw-w-full tw-border tw-px-3 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-text-sm focus-within:tw-border-blue-500">
              <i className="fas fa-map-marker-alt tw-text-gray-500"></i>
              <input
                type="text"
                placeholder="Địa chỉ"
                className="tw-w-full focus:tw-outline-none"
              />
            </div>
            <div className="tw-w-full tw-border tw-px-3 tw-py-2 tw-rounded-lg tw-flex tw-gap-2  tw-text-sm focus-within:tw-border-blue-500">
              <i className="fas fa-plus-square tw-text-gray-500 tw-mt-1"></i>
              <textarea
                placeholder="Lý do khám"
                className="tw-w-full focus:tw-outline-none"
                rows={4}
              />
            </div>
            <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-2 tw-px-3 tw-py-2 tw-bg-gray-100">
              <div className="tw-flex tw-justify-between tw-text-sm tw-text-gray-800">
                <div>
                  <p>Giá khám</p>
                </div>
                <div className="tw-flex tw-gap-1">
                  <p>200.000</p>
                  <p>đ</p>
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
                  <p>200.000</p>
                  <p>đ</p>
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
            <div className="tw-w-full tw-h-full tw-px-3 tw-py-2 tw-bg-yellow-500 tw-justify-items-center tw-text-white tw-rounded-md tw-cursor-pointer">
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
