import api from "./api";

export const getTimeSlots = async () => {
  const res = await api.get("/timeslots");
  return res.data;
};

export const getTimeSlotById = async (id: number) => {
  const res = await api.get(`/timeslots/${id}`);
  return res.data;
};

export const createTimeSlot = async (Data: any) => {
  const res = await api.post("/timeslots", Data);
  return res.data;
};

export const updateTimeSlot = async (id: number, Data: any) => {
  const res = await api.put(`/timeslots/${id}`, Data);
  return res.data;
};

export const deleteTimeSlot = async (id: number) => {
  const res = await api.delete(`/timeslots/${id}`);
  return res.data;
};
