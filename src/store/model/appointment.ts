export class Appointment{
    id: number;
    patientId: number;
    doctorId: number;
    timeSlotId: number;
    appointmentDate: Date;
    status: string;
    reason: string;

    constructor(id: number, patientId: number, doctorId: number, timeSlotId: number, appointmentDate: Date, status: string,  reason: string){
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.timeSlotId = timeSlotId;
        this.appointmentDate = appointmentDate;
        this.status = status;
        this.reason = reason
    }
}