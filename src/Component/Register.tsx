import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../store/hooks";
import bkSDK from "../store/bkSDK";

function Register() {
  const navigate = useNavigate();
  const [users, getUsers] = useUser(); // Giả sử bạn có hook useUser
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    getUsers(); // Lấy danh sách người dùng từ server khi component được mount
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn chặn reload trang

    if (email === "" || password === "" || confirmPassword === "") {
      await Swal.fire("", "Vui lòng nhập đầy đủ thông tin", "error").then(
        () => {
          return;
        }
      );
    }
    if (password !== confirmPassword) {
      await Swal.fire("", "Mật khẩu không khớp", "error").then(() => {
        return;
      });
    }
    // Kiểm tra email phải có dạng xxx@gmail.com
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      await Swal.fire("Lỗi", "Email phải có định dạng @gmail.com", "error");
      return;
    }
    // Kiểm tra mật khẩu có ít nhất 6 ký tự
    if (password.length < 6) {
      await Swal.fire("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự", "error");
      return;
    }

    // Kiểm tra email đã tồn tại chưa
    try {
      const emailExists = users.some((user: any) => user.email === email);
      if (emailExists) {
        await Swal.fire("Lỗi", "Email này đã được đăng ký", "error");
        return;
      }

      // Nếu tất cả validation đều pass
      const InfoRegister = {
        id: Date.now(),
        email: email,
        password: password,
        role: "user",
      };

      console.log(InfoRegister);

      bkSDK.createRecord("user", InfoRegister, {}, false);
      await Swal.fire("Thành công", "Đăng ký thành công", "success");
      navigate("/login"); // Chuyển hướng đến trang đăng nhập
    } catch (error) {
      console.error("Lỗi khi kiểm tra email:", error);
      await Swal.fire("Lỗi", "Đã có lỗi xảy ra, vui lòng thử lại", "error");
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="tw-mb-4">
              <input
                type="password"
                placeholder="Mật khẩu"
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="tw-mb-4">
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded-md"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="tw-w-full tw-bg-blue-600 tw-text-white tw-py-2 tw-rounded-md hover:tw-bg-blue-700"
              onClick={handleRegister}
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
