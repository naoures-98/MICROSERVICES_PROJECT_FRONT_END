export class Currency {
    id: number;
    internalCode: string;
    name: string;
    createAt :Date;
    updatedAt :Date;
    public constructor(){
        this.id = 0;
        this.internalCode = '';
        this.name = '';
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
}
