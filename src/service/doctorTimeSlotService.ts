import api from "./api";

export const getDoctorTimeSlots = async () => {
  const res = await api.get("/doctorTimeSlot");
  return res.data;
};

export const getDoctorTimeSlotById = async (id: number) => {
  const res = await api.get(`/doctorTimeSlot/${id}`);
  return res.data;
};

export const createDoctorTimeSlot = async (Data: any) => {
  const res = await api.post("/doctorTimeSlot", Data);
  return res.data;
};

export const updateDoctorTimeSlot = async (id: number, Data: any) => {
  const res = await api.put(`/doctorTimeSlot/${id}`, Data);
  return res.data;
};

export const deleteDoctorTimeSlot = async (id: number) => {
  const res = await api.delete(`/doctorTimeSlot/${id}`);
  return res.data;
};
