export class ItemUser {
  public id: number;
  public email: string;
  public password: string;
  public role: string;

  constructor(id: number, email: string, password: string, role: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
