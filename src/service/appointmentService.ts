import api from './api';

export const getAppointments = async () => {
    const res = await api.get('/appointments');
    return res.data;
};

export const getAppointmentById = async (id: number) => {
    const res = await api.get(`/appointments/${id}`);
    return res.data;
  };

export const createAppointment = async (data: any) => {
    const res = await api.post('/appointments', data);
    return res.data;
};

export const updateAppointment = async (id: number, data: any) => {
    const res = await api.put(`/appointments/${id}`, data);
    return res.data;
};

export const deleteAppointment = async (id: number) => {
    const res = await api.delete(`/appointments/${id}`);
    return res.data;
};
