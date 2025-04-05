import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="tw-relative tw-min-h-screen tw-bg-[#F5F5F5] tw-overflow-hidden">
      {/* Background Image */}
      <img
        src="./png/bg-login.png"
        className="tw-z-[1] tw-absolute tw-bottom-0 tw-left-0 tw-w-full"
        alt="Footer"
      />

      {/* Top Navigation */}
      <div className="tw-absolute tw-z-20 tw-top-0 tw-left-0 tw-right-0 tw-p-4 tw-flex tw-justify-between tw-items-center">
        <div className="tw-w-[208px] tw-h-[52px] tw-md:w-[136px] tw-md:h-[66px]">
          <img src="./svg/logo.svg" alt="Logo" className="tw-w-full" />
        </div>

        <button
          onClick={() => navigate("/login")}
          className="tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md"
        >
          Đăng nhập
        </button>
      </div>

      {/* Form Đăng Ký */}
      <div className="tw-relative tw-z-10 tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-p-4">
        <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-w-full tw-max-w-md tw-p-8">
          <h2 className="tw-text-2xl tw-font-bold tw-mb-6 tw-text-center">
            Đăng ký
          </h2>
          <form>
            <div className="tw-mb-4">
              <input
                type="email"
                placeholder="Email"
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-md"
              />
            </div>

            <div className="tw-mb-4">
              <input
                type="password"
                placeholder="Mật khẩu"
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-md"
              />
            </div>

            <div className="tw-mb-4">
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-md"
              />
            </div>

            <button
              type="submit"
              className="tw-w-full tw-bg-blue-600 tw-text-white tw-py-2 tw-rounded-md hover:tw-bg-blue-700"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
