export class ItemPatient {
  public id: number;
  public useId: number;
  public fullName: string;
  public sex: string;
  public date: Date;
  public email: string;
  public phone: string;
  public address: string;

  constructor(
    id: number,
    useId: number,
    fullName: string,
    sex: string,
    date: string | Date,
    email: string,
    phone: string,
    address: string
  ) {
    this.id = id;
    this.useId = useId;
    this.fullName = fullName;
    this.sex = sex;
    this.date = typeof date === "string" ? new Date(date) : date; // Chuyển đổi string -> Date
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}
