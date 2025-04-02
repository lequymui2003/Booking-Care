export class ItemTimeSlot {
    public id: number;
    public startTime: string;
    public endTime: string;
  
    constructor(id: number, startTime: string, endTime: string) {
      this.id = id;
      this.startTime = startTime;
      this.endTime = endTime;
    }
  }
  