import { useEffect, useState } from "react";
import {
  useAppointment,
  usePatient,
  useDoctor,
  useTimeSlot,
  useClinic,
} from "../store/hooks";
import { ItemAppointment, ItemDoctor } from "../interface/itemClass";

export const useAppointmentDataDoctor = (userId: string | null) => {
  const [userAppointments, setUserAppointments] = useState<any[]>([]);
  const [appointments, getAppointments] = useAppointment();
  const [patients, getPatients] = usePatient();
  const [doctors, getDoctors] = useDoctor();
  const [timeSlots, getTimeSlots] = useTimeSlot();
  const [clinics, getClinics] = useClinic();

  // Hàm định dạng ngày tháng
  const formatAppointmentDate = (dateString: string) => {
    if (!dateString) return "Không xác định";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Ngày không hợp lệ";

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Định dạng lỗi";
    }
  };

  useEffect(() => {
    getAppointments();
    getPatients();
    getDoctors();
    getTimeSlots();
    getClinics();
  }, []);

  useEffect(() => {
    if (appointments && patients && doctors && timeSlots && clinics) {
      const doctorInfo = doctors.find(
        (d: ItemDoctor) => d.useId === Number(userId)
      );
      console.log("Doctor Info:", doctorInfo); // Log thông tin bác sĩ
      const userApps = appointments.filter(
        (app: ItemAppointment) => app.doctorId === doctorInfo.id
      );

      const enrichedApps = userApps.map((app: any) => {
        const patient = patients.find((p: any) => p.id === app.patientId);
        const doctor = doctors.find((d: any) => d.id === app.doctorId);
        const timeSlot = timeSlots.find((ts: any) => ts.id === app.timeSlotId);
        const clinic = clinics.find((c: any) => c.id === doctor?.clinicId);

        return {
          ...app,
          patientName: patient?.fullName || "Không xác định",
          doctorName: doctor?.fullName || "Không xác định",
          doctorImage: doctor?.image || "",
          clinicName: clinic?.clinicName || "Không xác định",
          startTime: timeSlot?.startTime || "--:--",
          endTime: timeSlot?.endTime || "--:--",
          formattedDate: formatAppointmentDate(app.appointmentDate),
        };
      });

      setUserAppointments(enrichedApps);
    }
  }, [appointments, patients, doctors, timeSlots, clinics, userId]);

  return {
    userAppointments,
    formatAppointmentDate, // Export cả hàm này nếu cần dùng ở component
    isLoading: !appointments || !patients || !doctors || !timeSlots || !clinics,
  };
};
