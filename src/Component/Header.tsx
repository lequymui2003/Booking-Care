function Header() {
  return (
    <>
      {/*Header*/}
      <div className="tw-w-full tw-h-[78px] tw-bg-[rgb(237,255,250)]">
        <div className="tw-flex xl:tw-gap-10 xl:tw-max-w-6xl tw-h-full xl:tw-mx-auto sm: tw-gap-3 sm: tw-max-w-2xl sm: tw-mx-auto md:tw-max-w-4xl md:tw-gap-20 lg:tw-gap-2 lg:tw-max-w-5xl">
          {/*Header left*/}
          <div className="sm: tw-pl-3 tw-flex tw-items-center tw-gap-4">
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
          <div className="xl:tw-flex  tw-gap-4 tw-items-center sm: tw-hidden md:tw-flex">
            <div className="md:tw-hidden lg:tw-flex">
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
              <i className="fas fa-search tw-absolute tw-p-1"></i>
              <input
                type="text"
                className="tw-py-2 tw-px-5 tw-rounded-2xl tw-border-2 tw-border-gray-500"
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
    </>
  );
}

export default Header;
