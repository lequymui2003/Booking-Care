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

export class ItemDoctor {
  public id: number;
  public specialtiesId: number;
  public clinicId: number;
  public useId: number;
  public fullName: string;
  public sex: string;
  public date: Date;
  public email: string;
  public phone: string;
  public address: string;
  public title: string;
  public description: string;
  public expertise: string;
  public work_experience: string;
  public education: string;
  public image: string;
  public examinationPrice: number;
  public examinationAndTreatment: string;

  constructor(
    id: number,
    specialtiesId: number,
    clinicId: number,
    useId: number,
    fullName: string,
    sex: string,
    date: Date,
    email: string,
    phone: string,
    address: string,
    title: string,
    description: string,
    expertise: string,
    work_experience: string,
    education: string,
    image: string,
    examinationPrice: number,
    examinationAndTreatment: string
  ) {
    this.id = id;
    this.specialtiesId = specialtiesId;
    this.clinicId = clinicId;
    this.useId = useId;
    this.fullName = fullName;
    this.sex = sex;
    this.date = date;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.title = title;
    this.description = description;
    this.expertise = expertise;
    this.work_experience = work_experience;
    this.education = education;
    this.image = image;
    this.examinationPrice = examinationPrice;
    this.examinationAndTreatment = examinationAndTreatment;
  }
}
