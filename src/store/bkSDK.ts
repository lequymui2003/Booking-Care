import axios from "axios";
import { Patient } from "./model/patient";
import { Appointment } from "./model/appointment";
import { Clinic } from "./model/clinic";
import { Doctor } from "./model/doctor";
import { DoctorTimeSlot } from "./model/doctorTimeSlot";
import { Notification } from "./model/notification";
import { Specialties } from "./model/specialties";
import { TimeSlot } from "./model/timeSlot";
import { User } from "./model/user";
import pluralize from "pluralize";
export type SKDParams = {
  templateKey: string;
  campaignId: string;
  token: string;
  inset?: { top: number; right: number; bottom: number; left: number };
};

const sdkParams = {} as SKDParams;
const baseUrl: string = "http://localhost:3009/api";
let headersData = { "x-user-token": sdkParams.token };
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "any";

const bkSDK = {
  getSummary: async () => {
    try {
      const response = await axios.get(`http://localhost:3009/admin/products`, {
        headers: headersData,
      });
      return response.data.data.products as any;
    } catch (error) {
      console.error("Error in getSummary:", error);
      throw error;
    }
  },

  getUser: async (condition: any, isMany: boolean) => {
    try {
      const response = await axios.get(`${baseUrl}/users`, {
        params: { condition, isMany },
      });
      const Users: User[] = Object.values(response.data.data.user);
      return Users;
    } catch (error) {
      console.error("Error in getUser:", error);
      throw error;
    }
  },

  getPatient: async (condition: any, isMany: boolean) => {
    try {
      const response = await axios.get(`${baseUrl}/patients`, {
        params: { condition, isMany },
      });
      const Patients: Patient[] = Object.values(response.data.data.patient);
      return Patients;
    } catch (error) {
      console.error("Error in getPatient:", error);
      throw error;
    }
  },

  getDoctor: async (condition: any, isMany: boolean) => {
    try {
      const response = await axios.get(`${baseUrl}/doctors`, {
        params: { condition, isMany },
      });
      const Doctors: Doctor[] = Object.values(response.data.data.doctor);
      // console.log('Doctors array:', Doctors);
      return Doctors;
    } catch (error) {
      console.error("Error in getDoctor:", error);
      throw error;
    }
  },

  getAppointment: async (condition: any, isMany: boolean) => {
    try {
      const response = await axios.get(`${baseUrl}/appointments`, {
        params: { condition, isMany },
      });
      const Appointments: Appointment[] = Object.values(
        response.data.data.appointment
      );
      return Appointments;
    } catch (error) {
      console.error("Error in getAppointment:", error);
      throw error;
    }
  },

  getClinic: async (condition: any, isMany: boolean) => {
    try {
      const response = await axios.get(`${baseUrl}/clinics`, {
        params: { condition, isMany },
      });
      const Clinics: Clinic[] = Object.values(response.data.data.clinic);
      return Clinics;
    } catch (error) {
      console.error("Error in getClinic:", error);
      throw error;
    }
  },

  getDoctorTimeSlot: async (condition: any, isMany: boolean) => {
    try {
      const response = await axios.get(`${baseUrl}/doctorTimeSlots`, {
        params: { condition, isMany },
      });
      const DoctorTimeSlots: DoctorTimeSlot[] = Object.values(
        response.data.data.doctorTimeSlot
      );
      return DoctorTimeSlots;
    } catch (error) {
      console.error("Error in getDoctorTimeSlot:", error);
      throw error;
    }
  },

  getNotification: async (condition: any, isMany: boolean) => {
    try {
      const response = await axios.get(`${baseUrl}/notifications`, {
        params: { condition, isMany },
      });
      const Notifications: Notification[] = Object.values(
        response.data.data.notification
      );
      return Notifications;
    } catch (error) {
      console.error("Error in getDoctorTimeSlot:", error);
      throw error;
    }
  },

  getSpecialties: async (condition: any, isMany: boolean) => {
    try {
      const response = await axios.get(`${baseUrl}/specialties`, {
        params: { condition, isMany },
      });
      const Specialtiess: Specialties[] = Object.values(
        response.data.data.specialties
      );
      return Specialtiess;
    } catch (error) {
      console.error("Error in getSpecialties:", error);
      throw error;
    }
  },

  getTimeSlot: async (condition: any, isMany: boolean) => {
    try {
      const response = await axios.get(`${baseUrl}/timeSlots`, {
        params: { condition, isMany },
      });
      const TimeSlots: TimeSlot[] = Object.values(response.data.data.timeSlot);
      return TimeSlots;
    } catch (error) {
      console.error("Error in getTimeSlot:", error);
      throw error;
    }
  },

  createRecord: async (
    name: string,
    collection: any,
    condition: any,
    isMany: boolean
  ) => {
    // console.log(
    //   name +
    //     " 11111 " +
    //     JSON.stringify(collection) +
    //     " 11111 " +
    //     JSON.stringify(condition)
    // );
    return await axios.post(`${baseUrl}/${name}s`, {
      [pluralize.singular(name)]: collection,
      condition: condition,
      isMany,
    });
  },

  updateRecord: async (
    name: string,
    collection: any,
    condition: any,
    isMany: boolean
  ) => {
    // console.log(
    //   "Name: " +
    //     name +
    //     " data " +
    //     JSON.stringify(condition) +
    //     " Collection: " +
    //     JSON.stringify(collection)
    // );
    return await axios.put(`${baseUrl}/${name}s`, {
      update: collection,
      condition: condition,
      isMany,
    });
  },
};
export default bkSDK;
