export class ItemAppointment {
  public id: number;
  public patientId: number;
  public doctorId: number;
  public timeSlotId: number;
  public appointmentDate: Date;
  public status: string;
  public reason: string;

  constructor(
    id: number,
    patientId: number,
    doctorId: number,
    timeSlotId: number,
    appointmentDate: Date,
    status: string,
    reason: string
  ) {
    this.id = id;
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.timeSlotId = timeSlotId;
    this.appointmentDate = appointmentDate;
    this.status = status;
    this.reason = reason;
  }
}
