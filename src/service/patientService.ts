import api from "./api";

export const getPatients = async () => {
  const res = await api.get("/patient");
  return res.data;
};

export const getPatientById = async (id: number) => {
  const res = await api.get(`/patient/${id}`);
  return res.data;
};

export const createPatient = async (Data: any) => {
  const res = await api.post("/patient", Data);
  return res.data;
};

export const updatePatient = async (id: number, Data: any) => {
  const res = await api.put(`/patient/${id}`, Data);
  return res.data;
};

export const deletePatient = async (id: number) => {
  const res = await api.delete(`/patient/${id}`);
  return res.data;
};
