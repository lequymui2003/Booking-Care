import api from "./api";
const BASE_URL = "/user";

// Đăng nhập
export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  console.log(res);

  // Thêm check role trước khi return
  // if (res.data.user?.role !== "admin") {
  //   throw new Error("Bạn không có quyền truy cập");
  // }

  return res.data;
};

// Đăng ký
export const register = async (data: {
  email: string;
  password: string;
  full_name: string;
  phone: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// Lấy danh sách tất cả người dùng
export const getUsers = async () => {
  const res = await api.get(`${BASE_URL}`);
  return res.data;
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (id: number) => {
  const res = await api.get(`${BASE_URL}/${id}`);
  return res.data;
};

// Cập nhật thông tin người dùng
export const updateUser = async (id: number, data: any) => {
  const res = await api.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

// Xóa người dùng
export const deleteUser = async (id: number) => {
  const res = await api.delete(`${BASE_URL}/${id}`);
  return res.data;
};

export const createUser = async (data: any) => {
  const res = await api.post(`${BASE_URL}`, data);
  return res.data;
};
