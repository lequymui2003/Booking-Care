export class ItemPatient {
  public id: number;
  public use_id: number;
  public fullName: string;
  public sex: string;
  public date: Date;
  public email: string;
  public phone: string;
  public address: string;

  constructor(
    id: number,
    use_id: number,
    fullName: string,
    sex: string,
    date: Date,
    email: string,
    phone: string,
    address: string
  ) {
    this.id = id;
    this.use_id = use_id;
    this.fullName = fullName;
    this.sex = sex;
    this.date = date;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}
