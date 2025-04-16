import api from "./api";

export const getDoctors = async () => {
  const res = await api.get("/doctor");
  return res.data;
};

export const getDoctorById = async (id: number) => {
  const res = await api.get(`/doctor/${id}`);
  return res.data;
};

// export const createDoctor = async (Data: any) => {
//   const res = await api.post("/doctor", Data);
//   return res.data;
// };
export const createDoctor = async (data: FormData) => {
  const res = await api.post("/doctor", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateDoctor = async (id: number, data: FormData) => {
  const res = await api.put(`/doctor/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteDoctor = async (id: number) => {
  const res = await api.delete(`/doctor/${id}`);
  return res.data;
};
