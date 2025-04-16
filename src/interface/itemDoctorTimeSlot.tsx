export class ItemDoctorTimeSlot {
  public id: number;
  public doctorId: number;
  public timeSlotId: number;
  public doctorTimeSlot_Date: Date;

  constructor(
    id: number,
    doctorId: number,
    timeSlotId: number,
    doctorTimeSlot_Date: Date
  ) {
    this.id = id;
    this.doctorId = doctorId;
    this.timeSlotId = timeSlotId;
    this.doctorTimeSlot_Date = doctorTimeSlot_Date;
  }
}
