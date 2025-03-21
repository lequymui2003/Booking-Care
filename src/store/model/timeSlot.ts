export class TimeSlot{
    id: number;
    startTime: number;
    endTime: number;
    weekday: string;

    constructor(id: number, startTime: number, endTime: number, weekday: string){
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.weekday = weekday
    }
}