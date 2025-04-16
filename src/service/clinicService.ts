import api from "./api";

export const getClinics = async () => {
  const res = await api.get("/clinic");
  return res.data;
};

export const getClinicById = async (id: number) => {
  const res = await api.get(`/clinic/${id}`);
  return res.data;
};

// export const createClinic = async (Data: any) => {
//   const res = await api.post("/clinic", Data);
//   return res.data;
// };
export const createClinic = async (data: FormData) => {
  const res = await api.post("/clinic", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateClinic = async (id: number, data: FormData) => {
  const res = await api.put(`/clinic/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteClinic = async (id: number) => {
  const res = await api.delete(`/clinic/${id}`);
  return res.data;
};
