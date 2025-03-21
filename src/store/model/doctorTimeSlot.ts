export class DoctorTimeSlot{
    id: number;
    doctor_id: number;
    timeSlot_id: number;

    constructor(id: number, doctor_id: number, timeSlot_id: number){
        this.id = id;
        this.doctor_id =doctor_id;
        this.timeSlot_id = timeSlot_id;
    }
}