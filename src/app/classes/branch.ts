export class Branch {
    id: number;
    branchCode: string;
    name: string;
    description: string;
    createAt :Date;
    updatedAt :Date;
    public constructor(){
        this.id = 0;
        this.branchCode = '';
        this.name = '';
        this.description = '';
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
}
