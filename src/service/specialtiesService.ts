import api from "./api";

export const getSpecialties = async () => {
  const res = await api.get("/specialties");
  return res.data;
};

export const getSpecialtiesById = async (id: number) => {
  const res = await api.get(`/specialties/${id}`);
  return res.data;
};

// export const createSpecialties = async (Data: any) => {
//   const res = await api.post("/specialties", Data);
//   return res.data;
// };
export const createSpecialties = async (data: FormData) => {
  const res = await api.post("/specialties", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateSpecialties = async (id: number, data: FormData) => {
  const res = await api.put(`/specialties/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteSpecialties = async (id: number) => {
  const res = await api.delete(`/specialties/${id}`);
  return res.data;
};
