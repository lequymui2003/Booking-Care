export class ItemClinic {
    public id: number;
    public clinicName: string;
    public clinicAddress: string;
    public image: string;
  
    constructor(id: number ,clinicName: string, clinicAddress: string, image: string) {
      this.id = id;
      this.clinicName = clinicName;
      this.clinicAddress = clinicAddress;
      this.image = image;
    }
  }