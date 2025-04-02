export class ItemRemoteExamination {
  public id: number;
  public remoteExaminationName: string;
  public image: string;

  constructor(id: number, remoteExaminationName: string, image: string) {
    this.id = id;
    this.remoteExaminationName = remoteExaminationName;
    this.image = image;
  }
}
