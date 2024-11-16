import { User } from "./User";

export class OrganizationUser {
    id: number;
    matricule: string;
    userName: string;
    userFunction: string;
    email : string;
    telephone : string;
    user : User;
    createAt :Date;
    updatedAt :Date;
    public constructor(){
        this.id = 0;
        this.matricule = '';
        this.userName = '';
        this.userFunction = '';
        this.email = '';
        this.telephone = '';
        this.user = new User();
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
}
