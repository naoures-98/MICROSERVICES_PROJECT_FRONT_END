import { User } from "./User";

export class Group {
    id: number;
    groupName: string;
    users : User[];

    public constructor(){
        this.id = 0;
        this.groupName = '';
        this.users  = [];;

    };
}
