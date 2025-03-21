export class Clinic{
    id: number;
    clinicName: string;
    clinicAddress: string;

    constructor(id: number, clinicName: string, clinicAddress: string){
        this.id = id;
        this.clinicName = clinicName;
        this.clinicAddress = clinicAddress
    }
}