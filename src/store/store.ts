import { action, Action, createStore } from 'easy-peasy';
import { Patient } from './model/Patient';
import { Appointment } from './model/appointment';
import { Clinic } from './model/clinic';
import { Doctor } from './model/Doctor';
import { DoctorTimeSlot } from './model/doctorTimeSlot';
import { Notification } from './model/notification';
import { Specialties } from './model/specialties';
import { TimeSlot } from './model/timeSlot';
import { User } from './model/user';
export interface StoreModel {

    patient: Patient[] | null;
    setPatient: Action<StoreModel, any>;

    doctor: Doctor[] | null;
    setDoctor: Action<StoreModel, any>;

    appointment: Appointment[] | null;
    setAppointment: Action<StoreModel, any>

    clinic: Clinic[] | null;
    setClinic: Action<StoreModel, any>

    doctorTimeSlot: DoctorTimeSlot[] | null;
    setDoctorTimeSlot: Action<StoreModel, any>

    notification: Notification[] | null;
    setNotification: Action<StoreModel, any>

    specialties: Specialties[] | null;
    setSpecialties: Action<StoreModel, any>

    timeSlot: TimeSlot[] | null;
    setTimeSlot: Action<StoreModel, any>

    user: User[] | null;
    setUser: Action<StoreModel, any>
   
}
const store = createStore<StoreModel>({
        patient: null,
        setPatient: action((state, payload) =>{
        state.patient = payload;
        }),

        doctor: null,
        setDoctor: action((state, payload) =>{
        state.doctor = payload;
        }),

        appointment: null,
        setAppointment: action((state, payload) =>{
        state.appointment = payload;
        }),

        clinic: null,
        setClinic: action((state, payload) =>{
        state.clinic = payload;
        }),

        doctorTimeSlot: null,
        setDoctorTimeSlot: action((state, payload) =>{
        state.doctorTimeSlot = payload;
        }),

        notification: null,
        setNotification: action((state, payload) =>{
        state.notification = payload;
        }),

        specialties: null,
        setSpecialties: action((state, payload) =>{
        state.specialties = payload;
        }),

        timeSlot: null,
        setTimeSlot: action((state, payload) =>{
        state.timeSlot = payload;
        }),

        user: null,
        setUser: action((state, payload) =>{
        state.user = payload;
        })

})
export default store;