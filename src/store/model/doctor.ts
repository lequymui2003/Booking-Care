export class Doctor{
    id: number;
    specialtiesId: number;
    clinicId: number;
    useId: number;
    fullName: string;
    date: Date;
    email: string;
    phone: number;
    address: string;
    title: string;
    expertise: string;
    work_experience: string;
    education: string;

    constructor( id: number, specialtiesId: number, clinicId: number, useId: number, fullName: string,  date: Date, email: string, phone: number, address: string, title: string, expertise: string,  work_experience: string, education: string){
        this.id = id;
        this.specialtiesId = specialtiesId;
        this.clinicId = clinicId;
        this.useId = useId;
        this.fullName = fullName;
        this.date = date;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.title = title;
        this.expertise = expertise;
        this.work_experience = work_experience;
        this.education = education;
    }
}