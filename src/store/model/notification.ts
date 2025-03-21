export class Notification{
    id: number;
    user_id: number;
    title: string;
    content: string;

    constructor(id: number, user_id: number, title: string, content: string){
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.content = content
    }
}