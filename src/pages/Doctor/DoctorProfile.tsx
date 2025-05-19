import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getUserById } from "../../service/userService";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
} from "../../service/doctorService";
import { getClinics } from "../../service/clinicService";
import { getSpecialties } from "../../service/specialtiesService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ItemDoctor } from "../../interface/itemDoctor";
import { ItemUser } from "../../interface/itemUser";
import { ItemClinic } from "../../interface/itemClinic";
import { ItemSpecialty } from "../../interface/itemSpecialty";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import Swal from "sweetalert2";

const DoctorProfilePage = () => {
  const [user, setUser] = useState<ItemUser | null>(null);
  const [doctor, setDoctor] = useState<ItemDoctor | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewDoctor, setIsNewDoctor] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [clinics, setClinics] = useState<ItemClinic[]>([]);
  const [specialties, setSpecialties] = useState<ItemSpecialty[]>([]);
  const navigate = useNavigate();

  // Form setup with react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      sex: "",
      date: "",
      phone: "",
      address: "",
      title: "",
      description: "",
      examinationAndTreatment: "",
      expertise: "",
      work_experience: "",
      education: "",
      examinationPrice: "",
      specialtiesId: "",
      clinicId: "",
    },
  });

  // Fetch user and doctor data
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

        // Lấy danh sách clinics và specialties
        const [clinicsData, specialtiesData] = await Promise.all([
          getClinics(),
          getSpecialties(),
        ]);
        setClinics(clinicsData);
        setSpecialties(specialtiesData);

        // Lấy thông tin user
        const userData = await getUserById(Number(currentUserId));
        setUser(userData);

        // Lấy tất cả doctors để tìm doctor của user hiện tại
        const doctorsData = await getDoctors();

        // Tìm doctor có userId trùng với userId hiện tại
        const currentDoctor = doctorsData.find(
          (d: any) => d.useId === Number(currentUserId)
        );

        if (currentDoctor) {
          // Nếu đã có hồ sơ doctor
          setDoctor(currentDoctor);
          setIsNewDoctor(false);

          // Điền thông tin vào form
          setValue("fullName", currentDoctor.fullName || "");
          setValue("sex", currentDoctor.sex || "");
          setValue("date", currentDoctor.date || "");
          setValue("phone", currentDoctor.phone || "");
          setValue("address", currentDoctor.address || "");
          setValue("title", currentDoctor.title || "");
          setValue("description", currentDoctor.description || "");
          setValue(
            "examinationAndTreatment",
            currentDoctor.examinationAndTreatment || ""
          );
          setValue("expertise", currentDoctor.expertise || "");
          setValue("work_experience", currentDoctor.work_experience || "");
          setValue("education", currentDoctor.education || "");
          setValue("examinationPrice", currentDoctor.examinationPrice || "");
          setValue(
            "specialtiesId",
            currentDoctor.specialtiesId?.toString() || ""
          );
          setValue("clinicId", currentDoctor.clinicId?.toString() || "");

          // Hiển thị preview ảnh nếu có
          if (currentDoctor.image) {
            setImagePreview(currentDoctor.image);
          }
        } else {
          // Nếu chưa có hồ sơ doctor
          setIsNewDoctor(true);
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

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Define a type that represents what handleSubmit provides from the form
  type DoctorFormInput = {
    fullName: string;
    sex: string;
    date: string; // Note: form gives string but ItemDoctor expects Date
    phone: string;
    address: string;
    title: string;
    description: string;
    examinationAndTreatment: string;
    expertise: string;
    work_experience: string;
    education: string;
    examinationPrice: string; // Note: form gives string but ItemDoctor expects number
    specialtiesId: string; // Note: form gives string but ItemDoctor expects number
    clinicId: string; // Note: form gives string but ItemDoctor expects number
  };

  // Update the onSubmit function to handle the type conversion
  const onSubmit: SubmitHandler<DoctorFormInput> = async (formData) => {
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

      // Tạo FormData để gửi cả file ảnh
      const formDataToSend = new FormData();
      formDataToSend.append("useId", user.id.toString());
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("sex", formData.sex);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("email", user.email || "");
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append(
        "examinationAndTreatment",
        formData.examinationAndTreatment
      );
      formDataToSend.append("expertise", formData.expertise);
      formDataToSend.append("work_experience", formData.work_experience);
      formDataToSend.append("education", formData.education);
      formDataToSend.append("examinationPrice", formData.examinationPrice);
      formDataToSend.append("specialtiesId", formData.specialtiesId);
      formDataToSend.append("clinicId", formData.clinicId);

      // Nếu có file ảnh mới, thêm vào FormData
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      } else if (imagePreview && !imagePreview.startsWith("data:")) {
        // Nếu không có file mới nhưng có imagePreview (và không phải là base64)
        formDataToSend.append("image", imagePreview);
      }

      if (isNewDoctor) {
        // Tạo hồ sơ mới
        await createDoctor(formDataToSend);
        toast.success("Tạo hồ sơ bác sĩ thành công");
      } else {
        // Cập nhật hồ sơ
        if (doctor && doctor.id) {
          if (doctor.useId !== Number(currentUserId)) {
            toast.error("Không có quyền cập nhật thông tin này");
            return;
          }
          await updateDoctor(doctor.id, formDataToSend);
          toast.success("Cập nhật hồ sơ thành công");
        }
      }

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
              {isNewDoctor ? "Tạo Hồ Sơ Bác Sĩ Mới" : "Thông Tin Hồ Sơ Bác Sĩ"}
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
                    {isNewDoctor ? "Tạo Hồ Sơ Mới" : "Hồ Sơ Bác Sĩ"}
                  </h2>
                  <p className="tw-text-blue-100">
                    {isNewDoctor
                      ? "Điền thông tin chuyên môn và cá nhân của bạn"
                      : "Cập nhật thông tin hồ sơ chuyên môn của bạn"}
                  </p>
                </div>
              </div>
            </div>

            {/* Form section */}
            <div className="tw-p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="tw-mb-6">
                  <h3 className="tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-4">
                    Thông tin cá nhân
                  </h3>
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-x-8 tw-gap-y-6">
                    {/* Thông tin email */}
                    <div className="tw-mb-1">
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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

                    {/* Chức danh */}
                    <div className="tw-mb-1">
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        Chức danh *
                      </label>
                      <input
                        {...register("title", {
                          required: "Vui lòng nhập chức danh",
                        })}
                        type="text"
                        placeholder="Ví dụ: Giáo sư, Tiến sĩ, Bác sĩ chuyên khoa..."
                        className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                      />
                      {errors.title && (
                        <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    {/* Giới tính */}
                    <div className="tw-mb-1">
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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

                    {/* Địa chỉ */}
                    <div className="tw-mb-1 md:tw-col-span-2">
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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
                </div>

                {/* Thông tin chuyên môn */}
                <div className="tw-mb-6">
                  <h3 className="tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-4">
                    Thông tin chuyên môn
                  </h3>
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-x-8 tw-gap-y-6">
                    {/* Chuyên khoa */}
                    <div className="tw-mb-1">
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Chuyên khoa
                      </label>
                      <select
                        {...register("specialtiesId")}
                        className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                      >
                        <option value="">Chọn chuyên khoa</option>
                        {specialties.map((specialty) => (
                          <option key={specialty.id} value={specialty.id}>
                            {specialty.specialtiesName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Phòng khám */}
                    <div className="tw-mb-1">
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        Phòng khám
                      </label>
                      <select
                        {...register("clinicId")}
                        className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                      >
                        <option value="">Chọn phòng khám</option>
                        {clinics.map((clinic) => (
                          <option key={clinic.id} value={clinic.id}>
                            {clinic.clinicName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Chuyên môn */}
                    <div className="tw-mb-1">
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                        Chuyên môn *
                      </label>
                      <input
                        {...register("expertise", {
                          required: "Vui lòng nhập lĩnh vực chuyên môn",
                        })}
                        type="text"
                        placeholder="Ví dụ: Chuyên khoa Nội, Tim mạch, Nhi khoa..."
                        className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                      />
                      {errors.expertise && (
                        <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                          {errors.expertise.message}
                        </p>
                      )}
                    </div>

                    {/* Giá khám */}
                    <div className="tw-mb-1">
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Giá khám (VNĐ) *
                      </label>
                      <input
                        {...register("examinationPrice", {
                          required: "Vui lòng nhập giá khám",
                          pattern: {
                            value: /^\d+$/,
                            message: "Giá khám phải là số",
                          },
                        })}
                        type="text"
                        placeholder="Ví dụ: 300000"
                        className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                      />
                      {errors.examinationPrice && (
                        <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                          {errors.examinationPrice.message}
                        </p>
                      )}
                    </div>

                    {/* Thông tin mô tả - full col */}
                    <div className="tw-mb-1 md:tw-col-span-2">
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Mô tả chung *
                      </label>
                      <textarea
                        {...register("description", {
                          required: "Vui lòng nhập mô tả",
                        })}
                        rows={4}
                        placeholder="Nhập mô tả ngắn gọn về bản thân và kinh nghiệm làm việc của bạn..."
                        className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                      ></textarea>
                      {errors.description && (
                        <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    {/* Dịch vụ khám và điều trị - full col */}
                    <div className="tw-mb-1 md:tw-col-span-2">
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        Dịch vụ khám và điều trị *
                      </label>
                      <textarea
                        {...register("examinationAndTreatment", {
                          required: "Vui lòng nhập dịch vụ khám và điều trị",
                        })}
                        rows={4}
                        placeholder="Liệt kê các dịch vụ khám và điều trị mà bạn cung cấp..."
                        className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                      ></textarea>
                      {errors.examinationAndTreatment && (
                        <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                          {errors.examinationAndTreatment.message}
                        </p>
                      )}
                    </div>

                    {/* Kinh nghiệm làm việc - full col */}
                    <div className="tw-mb-1 md:tw-col-span-2">
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Kinh nghiệm làm việc *
                      </label>
                      <textarea
                        {...register("work_experience", {
                          required: "Vui lòng nhập kinh nghiệm làm việc",
                        })}
                        rows={4}
                        placeholder="Liệt kê các vị trí và nơi làm việc trước đây của bạn..."
                        className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                      ></textarea>
                      {errors.work_experience && (
                        <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                          {errors.work_experience.message}
                        </p>
                      )}
                    </div>

                    {/* Quá trình đào tạo - full col */}
                    <div className="tw-mb-1 md:tw-col-span-2">
                      <label className="tw-text-gray-700 tw-font-medium tw-mb-2 tw-flex tw-items-center">
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
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                          />
                        </svg>
                        Quá trình đào tạo *
                      </label>
                      <textarea
                        {...register("education", {
                          required: "Vui lòng nhập quá trình đào tạo",
                        })}
                        rows={4}
                        placeholder="Liệt kê các bằng cấp, chứng chỉ và quá trình đào tạo của bạn..."
                        className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-white focus:tw-border-blue-500 focus:tw-ring-1 focus:tw-ring-blue-500 tw-transition"
                      ></textarea>
                      {errors.education && (
                        <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                          {errors.education.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ảnh đại diện */}
                <div className="tw-mb-6">
                  <h3 className="tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-4">
                    Ảnh đại diện
                  </h3>
                  <div className="tw-flex tw-flex-col md:tw-flex-row tw-items-start md:tw-items-center tw-gap-6">
                    <div className="tw-w-32 tw-h-32 tw-rounded-full tw-overflow-hidden tw-bg-gray-100 tw-border tw-border-gray-300 tw-flex tw-justify-center tw-items-center">
                      {imagePreview ? (
                        <img
                          src={
                            imagePreview.startsWith("data:")
                              ? imagePreview
                              : `http://localhost:5000/uploads/${imagePreview}`
                          }
                          alt="Ảnh đại diện"
                          className="tw-w-full tw-h-full tw-object-cover"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="tw-h-16 tw-w-16 tw-text-gray-400"
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
                      )}
                    </div>
                    <div>
                      <div className="tw-flex tw-flex-col">
                        <label
                          htmlFor="upload-photo"
                          className="tw-px-4 tw-py-2 tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-rounded-lg tw-font-medium tw-cursor-pointer tw-text-center tw-transition"
                        >
                          Chọn ảnh
                        </label>
                        <input
                          type="file"
                          id="upload-photo"
                          accept="image/*"
                          className="tw-hidden"
                          onChange={handleImageChange}
                        />
                        <p className="tw-text-sm tw-text-gray-500 tw-mt-2">
                          Chọn ảnh đại diện của bạn. Định dạng hỗ trợ: JPG, PNG,
                          GIF. Tối đa 5MB.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit buttons */}
                <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-mt-8">
                  <button
                    type="submit"
                    disabled={!isDirty && !imageFile}
                    className={`tw-px-6 tw-py-3 tw-rounded-lg tw-font-medium tw-flex tw-items-center tw-justify-center ${
                      !isDirty && !imageFile
                        ? "tw-bg-gray-300 tw-text-gray-500 tw-cursor-not-allowed"
                        : "tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="tw-h-5 tw-w-5 tw-mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {isNewDoctor ? "Tạo hồ sơ bác sĩ" : "Lưu thay đổi"}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="tw-px-6 tw-py-3 tw-bg-gray-200 hover:tw-bg-gray-300 tw-text-gray-700 tw-rounded-lg tw-font-medium tw-flex tw-items-center tw-justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="tw-h-5 tw-w-5 tw-mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorProfilePage;
