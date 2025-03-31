import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/hooks";

function Login() {
  const navigate = useNavigate();
  const [user, getUser] = useUser();

  // State để lưu giá trị từ các ô input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Lấy dữ liệu user từ server
  useEffect(() => {
    getUser();
  }, []);

  // Xử lý khi nhấn nút "Đăng nhập"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn chặn reload trang

    // Kiểm tra thông tin đăng nhập
    const foundUser = user.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Đăng nhập thành công
      console.log("Đăng nhập thành công!");
      // Tạo token ngẫu nhiên
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
      // localStorage.setItem("user", JSON.stringify(foundUser)); // Lưu thông tin user vào localStorage
      localStorage.setItem("token", token); // Lưu token vào localStorage
      localStorage.setItem("userId", foundUser.id.toString()); // Lưu userId vào localStorage
      navigate("/"); // Chuyển hướng đến trang dashboard
    } else {
      // Đăng nhập thất bại
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

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
        {/* Logo */}
        <div className="tw-w-[208px] tw-h-[52px] tw-md:w-[136px] tw-md:h-[66px]">
          <img src="./svg/logo.svg" alt="Logo" className="tw-w-full" />
        </div>

        {/* Chuyển sang trang đăng ký */}
        <div
          onClick={() => navigate("/register")}
          className="tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-cursor-pointer"
        >
          Đăng ký
        </div>
      </div>

      {/* Form Đăng Nhập */}
      <div className="tw-relative tw-z-10 tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-p-4">
        <div className="tw-bg-white tw-shadow-md tw-rounded-lg tw-w-full tw-max-w-md tw-p-8">
          <h2 className="tw-text-2xl tw-font-bold tw-mb-6 tw-text-center">
            Đăng nhập
          </h2>
          {error && (
            <p className="tw-text-red-500 tw-mb-4 tw-text-center">{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="tw-mb-4">
              <input
                type="text"
                placeholder="Email hoặc số điện thoại"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-md"
              />
            </div>
            <div className="tw-mb-4 tw-relative">
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-md"
              />
            </div>
            <button
              type="submit"
              className="tw-w-full tw-bg-blue-600 tw-text-white tw-py-2 tw-rounded-md"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;