export class ItemDoctorTimeSlot {
  public id: number;
  public doctor_id: number;
  public timeSlot_id: number;
  public doctorTimeSlot_Date: Date;

  constructor(
    id: number,
    doctor_id: number,
    timeSlot_id: number,
    doctorTimeSlot_Date: Date
  ) {
    this.id = id;
    this.doctor_id = doctor_id;
    this.timeSlot_id = timeSlot_id;
    this.doctorTimeSlot_Date = doctorTimeSlot_Date;
  }
}
