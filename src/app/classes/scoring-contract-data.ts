import { Branch } from "./branch";
import { ClientNotation } from "./client-notation";
import { Currency } from "./currency";
import { Statut } from "./enum";
import { FinancingType } from "./financing-type";

export class ScoringContractData {
    id: number;
    year : number |  null = null;
    clientRequest : String;
    contractReference : string;
    capitalNominal : number | null = null;
    capitalImpaye : number | null = null;
    email : string;
    telephone : string;
    startDate : Date;
    endDate : Date;

    mntSollicite : Number | null =null;
    duree : Number | null = null;
    mntSolliEcheance : Number | null =null;
    mntInitial: Number | null =null;
    capitalRestantDu: Number | null =null;
    mntEncEcheance: Number | null =null;
    endDateEncours: Date | null = null;
    statutDossier : Statut | null = null;

    retourAnalyste : String | null = null;
    clientNotation : ClientNotation| null = null;
    //currencyId : number | null = null;
    //branchId : number | null = null;
    //financingTypeId : number | null = null;

    currency : Currency ;
    branch : Branch ;
    financingType : FinancingType ;

    currencyId : number ;
    branchId : number ;
    financingTypeId : number ;


    createAt :Date;
    updatedAt :Date;
    public constructor(){
        this.id = 0;
        this.year;
        this.clientRequest = '';
        this.contractReference = '';
        this.capitalNominal ;
        this.capitalImpaye ;
        this.email= '';
        this.telephone = '';
        this.startDate = new Date();
        this.endDate = new Date();
        this.clientNotation;
        this.currency = new Currency();
        this.branch = new Branch();
        this.financingType = new FinancingType();
        this.currencyId = 0;
        this.branchId = 0;
        this.financingTypeId = 0;
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
    
}
