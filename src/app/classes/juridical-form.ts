export class JuridicalForm {
    id: number;
    juridicalFormCode: string;
    description: string;
    createAt :Date;
    updatedAt :Date;
    public constructor(){
        this.id = 0;
        this.juridicalFormCode = '';
        this.description = '';
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
}
