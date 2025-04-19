export class ItemSpecialty {
  public id: number;
  public specialtiesName: string;
  public image: string;
  public checkSpecialties: number;

  constructor(
    id: number,
    specialtiesName: string,
    image: string,
    checkSpecialties: number
  ) {
    this.id = id;
    this.specialtiesName = specialtiesName;
    this.image = image;
    this.checkSpecialties = checkSpecialties;
  }
}
