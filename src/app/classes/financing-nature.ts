import { FinancingType } from "./financing-type";

export class FinancingNature {
    id: number;
    projectNature: string;
    description: string;
    createAt :Date;
    updatedAt :Date;
    financingTypes : FinancingType[];
    public constructor(){
        this.id = 0;
        this.projectNature = '';
        this.description = '';
        this.financingTypes = [];
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
}
