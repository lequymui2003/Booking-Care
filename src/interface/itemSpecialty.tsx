export class ItemSpecialty {
  public id: number;
  public specialtiesName: string;
  public image: string;

  constructor(id: number, specialtiesName: string, image: string) {
    this.id = id;
    this.specialtiesName = specialtiesName;
    this.image = image;
  }
}
