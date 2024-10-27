import { FinancingNature } from "./financing-nature";

export class FinancingType {
    id: number;
    financingTypeCode: string;
    description: string;
    createAt :Date;
    updatedAt :Date;
    financingNature : FinancingNature | null
    public constructor(){
        this.id = 0;
        this.financingTypeCode = '';
        this.description = '';
        this.financingNature = null;
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
}
