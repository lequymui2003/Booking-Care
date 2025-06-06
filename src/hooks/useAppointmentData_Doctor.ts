import { useEffect, useState } from "react";
// import {
//   useAppointment,
//   usePatient,
//   useDoctor,
//   useTimeSlot,
//   useClinic,
// } from "../store/hooks";
// import { ItemAppointment, ItemDoctor } from "../interface/itemClass";
import { ItemAppointment } from "../interface/itemAppointment";
import { ItemPatient } from "../interface/itemPatient";
import { ItemDoctor } from "../interface/itemDoctor";
import { ItemTimeSlot } from "../interface/itemTimeSlot";
import { ItemClinic } from "../interface/itemClinic";
import { getPatients } from "../service/patientService";
import { getAppointments } from "../service/appointmentService";
import { getDoctors } from "../service/doctorService";
import { getTimeSlots } from "../service/timeSlotService";
import { getClinics } from "../service/clinicService";

export const useAppointmentDataDoctor = (userId: string | null) => {
  const [userAppointments, setUserAppointments] = useState<any[]>([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [patients, setPatients] = useState([]);

  const fetchData = async () => {
    try {
      const [
        doctorList,
        patientList,
        clinicsList,
        timeSlotlist,
        appointmentsList,
      ] = await Promise.all([
        getDoctors(),
        getPatients(),
        getClinics(),
        getTimeSlots(),
        getAppointments(),
      ]);
      setDoctors(doctorList);
      setClinics(clinicsList);
      setPatients(patientList);
      setAppointments(appointmentsList);
      setTimeSlots(timeSlotlist);
    } catch (err) {
      console.error("❌ Lỗi khi lấy danh sách", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    if (appointments && patients && doctors && timeSlots && clinics) {
      const doctorInfo = doctors.find(
        (d: ItemDoctor) => d.useId === Number(userId)
      ) as ItemDoctor | undefined;
      console.log("Doctor Info:", doctorInfo); // Log thông tin bác sĩ
      const userApps = appointments.filter(
        (app: ItemAppointment) => app.doctorId === doctorInfo?.id
      );

      const enrichedApps = userApps.map((app: ItemAppointment) => {
        const patient = patients.find(
          (p: ItemPatient) => p.id === app.patientId
        ) as ItemPatient | undefined;
        const doctor = doctors.find(
          (d: ItemDoctor) => d.id === app.doctorId
        ) as ItemDoctor | undefined;
        const timeSlot = timeSlots.find(
          (ts: ItemTimeSlot) => ts.id === app.timeSlotId
        ) as ItemTimeSlot | undefined;
        const clinic = clinics.find(
          (c: ItemClinic) => c.id === doctor?.clinicId
        ) as ItemClinic | undefined;

        return {
          ...app,
          patientName: patient?.fullName || "Không xác định",
          doctorName: doctor?.fullName || "Không xác định",
          doctorImage: doctor?.image || "",
          clinicName: clinic?.clinicName || "Không xác định",
          startTime: timeSlot?.startTime || "--:--",
          endTime: timeSlot?.endTime || "--:--",
          formattedDate: formatAppointmentDate(app.appointmentDate.toString()),
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
