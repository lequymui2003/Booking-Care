export class Patient{
    id: number;
    use_id: number;
    fullname: string;
    date: Date;
    email: string;
    phone: string;
    address: string;

    constructor(id: number, use_id: number, fullname: string, date: Date, email: string, phone: string, address: string){
        this.id = id;
        this.use_id = use_id
        this.fullname = fullname;
        this.date = date;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}