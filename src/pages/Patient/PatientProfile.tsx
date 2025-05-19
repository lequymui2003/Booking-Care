import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUserById } from "../../service/userService";
import {
  getPatients,
  createPatient,
  updatePatient,
} from "../../service/patientService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ItemPatient } from "../../interface/itemPatient";
import { ItemUser } from "../../interface/itemUser";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import Swal from "sweetalert2";

const PatientProfilePage = () => {
  const [user, setUser] = useState<ItemUser | null>(null);
  const [patient, setPatient] = useState<ItemPatient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewPatient, setIsNewPatient] = useState(false);
  const navigate = useNavigate();

  // Form setup with react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<{
    fullName: string;
    sex: string;
    date: string;
    phone: string;
    address: string;
  }>();

  // Fetch user and patient data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Lấy userId từ localStorage
        const currentUserId = localStorage.getItem("userId");

        if (!currentUserId) {
          toast.error("Không tìm thấy thông tin người dùng");
          navigate("/login");
          return;
        }

        // Lấy thông tin user
        const userData = await getUserById(Number(currentUserId));
        setUser(userData);

        // Lấy tất cả patients để tìm patient của user hiện tại
        const patientsData = await getPatients();

        // Tìm patient có userId trùng với userId hiện tại
        const currentPatient = patientsData.find(
          (p: ItemPatient) => p.useId === Number(currentUserId)
        );

        if (currentPatient) {
          // Nếu đã có hồ sơ patient
          setPatient(currentPatient);
          setIsNewPatient(false);

          // Điền thông tin vào form
          setValue("fullName", currentPatient.fullName || "");
          setValue("sex", currentPatient.sex || "");
          setValue("date", currentPatient.date || "");
          setValue("phone", currentPatient.phone || "");
          setValue("address", currentPatient.address || "");
        } else {
          // Nếu chưa có hồ sơ patient
          setIsNewPatient(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Có lỗi xảy ra khi tải thông tin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, setValue]);

  // Handle form submission
  const onSubmit = async (data: {
    fullName: string;
    sex: string;
    date: string;
    phone: string;
    address: string;
  }) => {
    try {
      if (!user) {
        toast.error("Vui lòng đăng nhập để thực hiện chức năng này");
        return;
      }

      const currentUserId = localStorage.getItem("userId");
      if (!currentUserId || user.id !== Number(currentUserId)) {
        toast.error("Không có quyền cập nhật thông tin này");
        return;
      }

      const patientData = {
        userId: user.id,
        fullName: data.fullName,
        sex: data.sex,
        date: data.date,
        phone: data.phone,
        address: data.address,
      };

      if (isNewPatient) {
        // Tạo hồ sơ mới
        await createPatient(patientData);
        toast.success("Tạo hồ sơ bệnh nhân thành công");
      } else {
        // Cập nhật hồ sơ
        if (patient && patient.id) {
          // Kiểm tra lại xem patient này có thuộc về user hiện tại không
          if (patient.useId !== Number(currentUserId)) {
            toast.error("Không có quyền cập nhật thông tin này");
            return;
          }
          await updatePatient(patient.id, patientData);
          toast.success("Cập nhật hồ sơ thành công");
        }
      }

      // Chuyển hướng sau khi cập nhật/tạo thành công hoặc reload trang
      // navigate("/dashboard");
      Swal.fire("", "Cập nhật thông tin thành công", "success");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Có lỗi xảy ra khi lưu thông tin");
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="tw-min-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-50">
          <div className="tw-text-center">
            <div className="tw-animate-spin tw-rounded-full tw-h-16 tw-w-16 tw-border-t-4 tw-border-b-4 tw-border-blue-600 tw-mx-auto"></div>
            <p className="tw-mt-6 tw-text-lg tw-font-medium tw-text-gray-700">
              Đang tải thông tin...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="tw-bg-gray-50 tw-py-8 tw-px-4">
        <div className="tw-max-w-5xl tw-mx-auto">
          <div className="tw-mb-8">
            <h1 className="tw-text-3xl tw-font-bold tw-text-gray-800 tw-text-center">
              {isNewPatient
                ? "Tạo Hồ Sơ Bệnh Nhân Mới"
                : "Thông Tin Hồ Sơ Cá Nhân"}
            </h1>
            <div className="tw-w-20 tw-h-1 tw-bg-blue-600 tw-mx-auto tw-mt-2"></div>
          </div>

          <div className="tw-bg-white tw-rounded-xl tw-shadow-lg tw-overflow-hidden">
            {/* Banner header */}
            <div className="tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-400 tw-py-6 tw-px-8">
              <div className="tw-flex tw-items-center tw-gap-4">
                <div className="tw-bg-white tw-rounded-full tw-p-3 tw-shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="tw-h-8 tw-w-8 tw-text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="tw-text-2xl tw-font-bold tw-text-white">
                    {isNewPatient ? "Tạo Hồ Sơ Mới" : "Hồ Sơ Bệnh Nhân"}
                  </h2>
                  <p className="tw-text-blue-100">
                    {isNewPatient
                      ? "Điền thông tin của bạn để tạo hồ sơ khám bệnh"
                      : "Cập nhật thông tin cá nhân khi cần thiết"}
                  </p>
                </div>
              </div>
            </div>

            {/* Form section */}
            <div className="tw-p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-x-8 tw-gap-y-6">
                  {/* Thông tin email */}
                  <div className="tw-mb-1">
                    <label className=" tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="tw-h-5 tw-w-5 tw-mr-2 tw-text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-gray-50 tw-text-gray-500"
                    />
                    <p className="tw-text-xs tw-text-gray-500 tw-mt-1">
                      Email không thể thay đổi
                    </p>
                  </div>

                  {/* Họ và tên */}
                  <div className="tw-mb-1">
                    <label className=" tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="tw-h-5 tw-w-5 tw-mr-2 tw-text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Họ và tên *
                    </label>
                    <input
                      {...register("fullName", {
                        required: "Vui lòng nhập họ tên",
                      })}
                      type="text"
                      placeholder="Nhập họ và tên đầy đủ"
                      className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                    />
                    {errors.fullName && (
                      <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Giới tính */}
                  <div className="tw-mb-1">
                    <label className=" tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="tw-h-5 tw-w-5 tw-mr-2 tw-text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      Giới tính *
                    </label>
                    <select
                      {...register("sex", {
                        required: "Vui lòng chọn giới tính",
                      })}
                      className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                    {errors.sex && (
                      <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                        {errors.sex.message}
                      </p>
                    )}
                  </div>

                  {/* Ngày sinh */}
                  <div className="tw-mb-1">
                    <label className=" tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="tw-h-5 tw-w-5 tw-mr-2 tw-text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Ngày sinh *
                    </label>
                    <input
                      {...register("date", {
                        required: "Vui lòng nhập ngày sinh",
                      })}
                      type="date"
                      className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                    />
                    {errors.date && (
                      <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  {/* Số điện thoại */}
                  <div className="tw-mb-1">
                    <label className=" tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="tw-h-5 tw-w-5 tw-mr-2 tw-text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Số điện thoại *
                    </label>
                    <input
                      {...register("phone", {
                        required: "Vui lòng nhập số điện thoại",
                        pattern: {
                          value: /^\d+$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                      })}
                      type="text"
                      placeholder="Nhập số điện thoại"
                      className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                    />
                    {errors.phone && (
                      <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Địa chỉ - takes full width */}
                  <div className="tw-mb-1 md:tw-col-span-2">
                    <label className=" tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="tw-h-5 tw-w-5 tw-mr-2 tw-text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Địa chỉ
                    </label>
                    <input
                      {...register("address")}
                      type="text"
                      placeholder="Nhập địa chỉ đầy đủ"
                      className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                    />
                  </div>
                </div>

                {/* Notice section */}
                <div className="tw-mt-8 tw-bg-blue-50 tw-border tw-border-blue-100 tw-rounded-lg tw-p-4 tw-flex tw-items-start">
                  <div className="tw-flex-shrink-0 tw-mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="tw-h-5 tw-w-5 tw-text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="tw-ml-3">
                    <h3 className="tw-text-sm tw-font-medium tw-text-blue-800">
                      Lưu ý quan trọng
                    </h3>
                    <div className="tw-mt-1 tw-text-sm tw-text-blue-700">
                      <p>
                        Thông tin của bạn sẽ được bảo mật và chỉ sử dụng cho mục
                        đích y tế. Vui lòng cung cấp thông tin chính xác để đảm
                        bảo quá trình khám chữa bệnh diễn ra thuận lợi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="tw-mt-8 tw-flex tw-justify-end">
                  <button
                    type="button"
                    className="tw-px-6 tw-py-3 tw-mr-4 tw-bg-gray-100 tw-text-gray-700 tw-rounded-lg hover:tw-bg-gray-200 tw-transition tw-font-medium"
                    onClick={() => navigate("/")}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || (!isDirty && !isNewPatient)}
                    className={`tw-px-8 tw-py-3 tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-500 tw-text-white tw-rounded-lg tw-font-medium tw-shadow-md hover:tw-shadow-lg tw-transition
                      ${
                        isLoading || (!isDirty && !isNewPatient)
                          ? "tw-opacity-70 tw-cursor-not-allowed"
                          : "hover:tw-from-blue-700 hover:tw-to-blue-600"
                      }`}
                  >
                    {isLoading ? (
                      <span className="tw-flex tw-items-center">
                        <svg
                          className="tw-animate-spin tw-h-5 tw-w-5 tw-mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="tw-opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="tw-opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang xử lý...
                      </span>
                    ) : isNewPatient ? (
                      "Tạo Hồ Sơ"
                    ) : (
                      "Cập Nhật Thông Tin"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Additional helpful info */}
          <div className="tw-mt-8 tw-text-center tw-text-gray-600 tw-text-sm">
            <p>
              Nếu bạn cần trợ giúp về hồ sơ bệnh nhân, vui lòng liên hệ với bộ
              phận hỗ trợ của chúng tôi.
            </p>
            <p className="tw-mt-1">
              Hotline:{" "}
              <span className="tw-font-medium tw-text-blue-600">1900 xxxx</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientProfilePage;
