export class User {
    id: number;
    userCode: string;
    password: string;
    confirmPassword : string;
    isLocked : boolean;
    createAt :Date;
    updatedAt :Date;
    public constructor(){
        this.id = 0;
        this.userCode = '';
        this.password = '';
        this.confirmPassword = '';
        this.isLocked = false;
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
}
