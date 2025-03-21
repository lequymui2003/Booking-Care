import { action, createTypedHooks, useStore, useStoreDispatch } from 'easy-peasy';
import { useCallback } from 'react';
import { StoreModel } from './store';
import bkSDK from './bkSDK';
// import { Patient } from './model/Patient';
// import { Appointment } from './model/appointment';
// import { Clinic } from './model/clinic';
// import { Doctor } from './model/Doctor';
// import { DoctorTimeSlot } from './model/doctorTimeSlot';
// import { Notification } from './model/notification';
// import { Specialties } from './model/specialties';
// import { TimeSlot } from './model/timeSlot';
import { User } from './model/user';

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;

export const useUser = ():[User[], ()=> Promise<User[]>] => {
    const user = useStoreState(state=>state.user) || []
    const setUser = useStoreActions(actions=>actions.setUser);
    const getUser = useCallback(async () => {
      try {
        const user = await bkSDK.getUser({},false);
        setUser(user);
        return user;
      } catch (error) {
        console.error('Error fetching User:', error);
        throw error;
      }
    }, [setUser]);
    return [user, getUser];
  };

  export const patient = ():[any, ()=> Promise<any>] => {
    const patient = useStoreState(state=>state.patient)
    const setPatient = useStoreActions(actions=>actions.setPatient);
    const getPatient = useCallback(async () => {
      try {
        const patient = await bkSDK.getPatient({}, false);
        setPatient(patient);
        return patient;
      } catch (error) {
        console.error('Error fetching patient:', error);
        throw error;
      }
    }, [setPatient]);
    return [patient, getPatient];
  };

  export const doctor = ():[any, ()=> Promise<any>] => {
    const doctor = useStoreState(state=>state.doctor)
    const setDoctor = useStoreActions(actions=>actions.setDoctor);
    const getDoctor = useCallback(async () => {
      try {
        const doctor = await bkSDK.getDoctor({}, false);
        setDoctor(doctor);
        return doctor;
      } catch (error) {
        console.error('Error fetching doctor:', error);
        throw error;
      }
    }, [setDoctor]);
    return [doctor, getDoctor];
  };

  export const appointment = ():[any, ()=> Promise<any>] => {
    const appointment = useStoreState(state=>state.appointment)
    const setAppointment = useStoreActions(actions=>actions.setAppointment);
    const getAppointment = useCallback(async () => {
      try {
        const appointment = await bkSDK.getAppointment({}, false);
        setAppointment(appointment);
        return appointment;
      } catch (error) {
        console.error('Error fetching appointment:', error);
        throw error;
      }
    }, [setAppointment]);
    return [appointment, getAppointment];
  };

  export const clinic = ():[any, ()=> Promise<any>] => {
    const clinic = useStoreState(state=>state.clinic)
    const setClinic = useStoreActions(actions=>actions.setClinic);
    const getClinic = useCallback(async () => {
      try {
        const clinic = await bkSDK.getClinic({}, false);
        setClinic(clinic);
        return clinic;
      } catch (error) {
        console.error('Error fetching clinic:', error);
        throw error;
      }
    }, [setClinic]);
    return [clinic, getClinic];
  };


  
  export const doctorTimeSlot = ():[any, ()=> Promise<any>] => {
    const doctorTimeSlot = useStoreState(state=>state.doctorTimeSlot)
    const setDoctorTimeSlot = useStoreActions(actions=>actions.setDoctorTimeSlot);
    const getDoctorTimeSlot = useCallback(async () => {
      try {
        const doctorTimeSlot = await bkSDK.getDoctorTimeSlot({}, false);
        setDoctorTimeSlot(doctorTimeSlot);
        return doctorTimeSlot;
      } catch (error) {
        console.error('Error fetching doctorTimeSlot:', error);
        throw error;
      }
    }, [setDoctorTimeSlot]);
    return [doctorTimeSlot, getDoctorTimeSlot];
  };


  export const notification = ():[any, ()=> Promise<any>] => {
    const notification = useStoreState(state=>state.notification)
    const setNotification = useStoreActions(actions=>actions.setNotification);
    const getNotification = useCallback(async () => {
      try {
        const notification = await bkSDK.getNotification({}, false);
        setNotification(notification);
        return notification;
      } catch (error) {
        console.error('Error fetching notification:', error);
        throw error;
      }
    }, [setNotification]);
    return [notification, getNotification];
  };

  export const specialties = ():[any, ()=> Promise<any>] => {
    const specialties = useStoreState(state=>state.specialties)
    const setSpecialties = useStoreActions(actions=>actions.setSpecialties);
    const getSpecialties = useCallback(async () => {
      try {
        const specialties = await bkSDK.getSpecialties({}, false);
        setSpecialties(specialties);
        return specialties;
      } catch (error) {
        console.error('Error fetching notification:', error);
        throw error;
      }
    }, [setSpecialties]);
    return [specialties, getSpecialties];
  };

  export const timeSlot = ():[any, ()=> Promise<any>] => {
    const timeSlot = useStoreState(state=>state.timeSlot)
    const setTimeSlot = useStoreActions(actions=>actions.setTimeSlot);
    const getTimeSlot = useCallback(async () => {
      try {
        const timeSlot = await bkSDK.getTimeSlot({}, false);
        setTimeSlot(timeSlot);
        return timeSlot;
      } catch (error) {
        console.error('Error fetching notification:', error);
        throw error;
      }
    }, [setTimeSlot]);
    return [timeSlot, getTimeSlot];
  };