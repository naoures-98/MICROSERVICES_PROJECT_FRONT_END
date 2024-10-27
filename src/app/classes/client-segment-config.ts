export class ClientSegmentConfig {
    id: number;
    segmentCode: string;
    description: string;
    createAt :Date;
    updatedAt :Date;
    public constructor(){
        this.id = 0;
        this.segmentCode = '';
        this.description = '';
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
}
