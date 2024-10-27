export class ActivitySector {
    id: number;
    code: string;
    description: string;
    createAt :Date;
    updatedAt :Date;
    public constructor(){
        this.id = 0;
        this.code = '';
        this.description = '';
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
}
