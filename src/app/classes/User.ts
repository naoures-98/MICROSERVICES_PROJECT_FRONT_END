import { Group } from "./group";

export class User {
    id: number;
    userCode: string;
    password: string;
    group : Group
    confirmPassword : string;
    isLocked : boolean;
    createAt :Date;
    updatedAt :Date;

    public constructor(){
        this.id = 0;
        this.userCode = '';
        this.password = '';
        this.group = new Group();
        this.confirmPassword = '';
        this.isLocked = false;
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
}
