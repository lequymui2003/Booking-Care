import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define prop types for LeftSidebar
interface LeftSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function LeftSidebar({ isOpen, onClose }: LeftSidebarProps) {
  const navigate = useNavigate();

  // Navigation items for the sidebar
  const menuItems = [
    {
      title: "Trang chủ",
      icon: "fas fa-home",
      path: "/",
    },
    {
      title: "Chuyên khoa",
      icon: "fas fa-stethoscope",
      path: "/specialties",
      description: "Tìm bác sĩ theo chuyên khoa",
    },
    {
      title: "Cơ sở y tế",
      icon: "fas fa-hospital",
      path: "/medical-facilities",
      description: "Chọn bệnh viện phòng khám bệnh",
    },
    {
      title: "Bác sĩ",
      icon: "fas fa-user-md",
      path: "/doctors",
      description: "Chọn bác sĩ giỏi",
    },
    {
      title: "Lịch hẹn",
      icon: "far fa-calendar-alt",
      path: "/appointmentScheduleDoctor",
    },
    {
      title: "Đăng nhập / đăng ký",
      icon: "fas fa-sign-in-alt",
      path: "/login",
    },
  ];

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    onClose(); // Close sidebar after navigation
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          tw-fixed tw-top-0 tw-left-0 tw-h-full tw-w-64 tw-bg-white 
          tw-transform tw-transition-transform tw-duration-300 tw-ease-in-out
          ${isOpen ? "tw-translate-x-0" : "tw-translate-x-[-100%]"}
          tw-z-50 tw-shadow-lg
        `}
      >
        {/* Sidebar Header */}
        <div className="tw-flex tw-justify-between tw-items-center tw-p-4 tw-border-b">
          <img
            src="./svg/logo.svg"
            alt="Logo"
            className="tw-w-[150px] tw-h-[32px]"
          />
          <button
            onClick={onClose}
            className="tw-text-2xl tw-text-gray-600 hover:tw-text-gray-800"
          >
            &times;
          </button>
        </div>

        {/* Menu Items */}
        <nav className="tw-py-4">
          <ul className="tw-flex tw-flex-col tw-gap-3">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="tw-px-4 tw-py-2 tw-cursor-pointer tw-hover:bg-gray-100"
                onClick={() => handleMenuItemClick(item.path)}
              >
                <div className="tw-flex tw-items-center tw-gap-3">
                  <i className={`${item.icon} tw-text-sky-600`}></i>
                  <div>
                    <p className="tw-font-semibold tw-text-sm">{item.title}</p>
                    {item.description && (
                      <p className="tw-text-xs tw-text-gray-500">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

// Modified Header component to include sidebar toggle
function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/appointmentScheduleDoctor");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar Component */}
      <LeftSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/*Header*/}
      <div className="tw-w-full tw-h-[78px] tw-bg-[rgb(237,255,250)]">
        <div className="tw-flex xl:tw-gap-10 xl:tw-max-w-6xl tw-h-full xl:tw-mx-auto sm:tw-gap-3 sm:tw-max-w-2xl sm:tw-mx-auto md:tw-max-w-4xl md:tw-gap-20 lg:tw-gap-2 lg:tw-max-w-5xl tw-justify-between">
          {/*Header left*/}
          <div className="sm:tw-pl-3 tw-flex tw-items-center tw-gap-4">
            <a onClick={toggleSidebar} className="tw-cursor-pointer">
              <img
                src="./svg/icon_menu.svg"
                alt=""
                className="tw-w-[36px] tw-h-[36px]"
              />
            </a>
            <a href="/">
              <img
                src="./svg/logo.svg"
                alt=""
                className="tw-w-[200px] tw-h-[43px]"
              />
            </a>
          </div>
          {/*Header middle*/}
          <div className="xl:tw-flex tw-gap-4 tw-items-center sm:tw-hidden md:tw-flex">
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
          </div>
          {/*Header right*/}
          <div className="tw-content-center">
            <div
              onClick={handleClick}
              className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text tw-text-[rgb(69,195,210)] tw-cursor-pointer"
            >
              <img src="./svg/LịchHẹn.svg" alt="" />
              <p>Lịch Hẹn</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
