import { useEffect, useState } from "react";
import {
  getDoctorTimeSlots,
  createDoctorTimeSlot,
  updateDoctorTimeSlot,
  deleteDoctorTimeSlot,
} from "../../service/doctorTimeSlotService";
import { getTimeSlots } from "../../service/timeSlotService";
import { getDoctors } from "../../service/doctorService";
import { ItemDoctor } from "../../interface/itemDoctor";
import Swal from "sweetalert2";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";

interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

interface DoctorTimeSlot {
  id: number;
  doctorId: number;
  timeSlotId: number;
  doctorTimeSlot_Date: string;
}

const DoctorSchedulePage = () => {
  const [doctorTimeSlots, setDoctorTimeSlots] = useState<DoctorTimeSlot[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [formData, setFormData] = useState({
    timeSlotId: "",
    doctorTimeSlot_Date: "",
  });
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const userId = Number(localStorage.getItem("userId"));
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctorTimeSlots = doctorTimeSlots.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(doctorTimeSlots.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [allDoctors, allDoctorTimeSlots, allTimeSlots] = await Promise.all([
        getDoctors(),
        getDoctorTimeSlots(),
        getTimeSlots(),
      ]);

      const doctor = allDoctors.find((d: ItemDoctor) => d.useId === userId);
      if (!doctor) {
        Swal.fire(
          "Lỗi",
          "Không tìm thấy bác sĩ tương ứng với tài khoản hiện tại",
          "error"
        );
        return;
      }
      setDoctorId(doctor.id);

      const filteredSlots = allDoctorTimeSlots.filter(
        (slot: DoctorTimeSlot) => slot.doctorId === doctor.id
      );

      setDoctorTimeSlots(filteredSlots);
      console.log("Lịch làm việc bác sĩ:", filteredSlots);
      setTimeSlots(allTimeSlots);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu", error);
      Swal.fire("Lỗi", "Không thể tải dữ liệu", "error");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDateForDB = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-CA");
  };

  const validateForm = () => {
    if (!formData.timeSlotId || !formData.doctorTimeSlot_Date) {
      Swal.fire("Lỗi", "Vui lòng nhập đầy đủ thông tin", "error");
      return false;
    }

    if (doctorId === null) {
      Swal.fire("Lỗi", "Không xác định được bác sĩ hiện tại", "error");
      return false;
    }

    const hasConflict = doctorTimeSlots.some((slot) => {
      // Khi sửa, bỏ qua chính lịch đang sửa
      if (editingId && slot.id === editingId) return false;

      return (
        slot.timeSlotId === Number(formData.timeSlotId) &&
        formatDate(slot.doctorTimeSlot_Date) ===
          formatDate(formData.doctorTimeSlot_Date)
      );
    });

    if (hasConflict) {
      Swal.fire("Trùng lịch", "Bạn đã có lịch vào khung giờ này", "warning");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (editingId) {
        // Cập nhật lịch
        await updateDoctorTimeSlot(editingId, {
          doctorId,
          timeSlotId: Number(formData.timeSlotId),
          doctorTimeSlot_Date: formatDateForDB(formData.doctorTimeSlot_Date),
        });
        Swal.fire("Thành công", "Đã cập nhật lịch", "success");
      } else {
        // Thêm mới
        await createDoctorTimeSlot({
          doctorId,
          timeSlotId: Number(formData.timeSlotId),
          doctorTimeSlot_Date: formatDateForDB(formData.doctorTimeSlot_Date),
        });
        Swal.fire("Thành công", "Đã thêm lịch", "success");
      }

      setFormData({ timeSlotId: "", doctorTimeSlot_Date: "" });
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error("Lỗi tạo/cập nhật lịch", err);
      Swal.fire("Lỗi", "Không thể tạo hoặc cập nhật lịch", "error");
    }
  };

  const handleEdit = (slot: DoctorTimeSlot) => {
    setEditingId(slot.id);
    setFormData({
      timeSlotId: slot.timeSlotId.toString(),
      doctorTimeSlot_Date: new Date(slot.doctorTimeSlot_Date)
        .toISOString()
        .slice(0, 10),
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ timeSlotId: "", doctorTimeSlot_Date: "" });
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc muốn xóa lịch làm việc này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await deleteDoctorTimeSlot(id);
        Swal.fire("Đã xóa", "Lịch làm việc đã được xóa", "success");
        fetchData();
      } catch (error) {
        console.error("Lỗi xóa lịch", error);
        Swal.fire("Lỗi", "Không thể xóa lịch làm việc", "error");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="tw-max-w-3xl tw-mx-auto tw-p-6 tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
        <h1 className="tw-text-2xl tw-font-bold tw-mb-6 tw-text-center">
          Quản lý lịch làm việc bác sĩ
        </h1>

        {/* Form Thêm/Sửa */}
        <div className="tw-grid tw-gap-4 tw-mb-8">
          <select
            name="timeSlotId"
            value={formData.timeSlotId}
            onChange={handleInputChange}
            className="tw-border tw-rounded tw-px-3 tw-py-2 tw-text-gray-700 tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-blue-400"
          >
            <option value="">Chọn khung giờ</option>
            {timeSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.startTime} - {slot.endTime}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="doctorTimeSlot_Date"
            value={formData.doctorTimeSlot_Date}
            onChange={handleInputChange}
            className="tw-border tw-rounded tw-px-3 tw-py-2 tw-text-gray-700 tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-blue-400"
          />

          <div className="tw-flex tw-gap-4">
            <button
              onClick={handleSubmit}
              className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-font-semibold tw-px-6 tw-py-2 tw-rounded"
            >
              {editingId ? "Cập nhật" : "Thêm lịch"}
            </button>

            {editingId && (
              <button
                onClick={handleCancelEdit}
                className="tw-bg-gray-400 hover:tw-bg-gray-500 tw-text-white tw-font-semibold tw-px-6 tw-py-2 tw-rounded"
              >
                Hủy
              </button>
            )}
          </div>
        </div>

        {/* Danh sách lịch */}
        <div>
          <h2 className="tw-text-xl tw-font-semibold tw-mb-4 tw-border-b tw-border-gray-300 tw-pb-2">
            Lịch làm việc đã đăng ký
          </h2>

          {currentDoctorTimeSlots.length === 0 ? (
            <p>Chưa có lịch làm việc nào.</p>
          ) : (
            <>
              <ul className="tw-space-y-4">
                {currentDoctorTimeSlots.map((slot) => {
                  const time = timeSlots.find((t) => t.id === slot.timeSlotId);
                  return (
                    <li
                      key={slot.id}
                      className="tw-flex tw-justify-between tw-items-center tw-border tw-border-gray-300 tw-rounded tw-px-4 tw-py-3 tw-shadow-sm"
                    >
                      <div>
                        <p>
                          <span className="tw-font-semibold">Ngày:</span>{" "}
                          {new Date(
                            slot.doctorTimeSlot_Date
                          ).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="tw-font-semibold">Khung giờ:</span>{" "}
                          {time
                            ? `${time.startTime} - ${time.endTime}`
                            : "Không xác định"}
                        </p>
                      </div>

                      <div className="tw-flex tw-gap-2">
                        <button
                          onClick={() => handleEdit(slot)}
                          className="tw-bg-yellow-400 hover:tw-bg-yellow-500 tw-text-white tw-px-4 tw-py-2 tw-rounded"
                          title="Sửa"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(slot.id)}
                          className="tw-bg-red-500 hover:tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded"
                          title="Xóa"
                        >
                          Xóa
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Phân trang */}
              <div className="tw-mt-6 tw-flex tw-justify-center tw-gap-2 tw-py-3 tw-border tw-border-gray-300 tw-rounded tw-shadow-sm tw-bg-gray-50">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`tw-px-4 tw-py-2 tw-rounded-full tw-font-medium tw-transition-colors ${
                        currentPage === pageNum
                          ? "tw-bg-blue-600 tw-text-white"
                          : "tw-bg-white tw-text-gray-700 hover:tw-bg-blue-100"
                      }`}
                      aria-current={
                        currentPage === pageNum ? "page" : undefined
                      }
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorSchedulePage;
