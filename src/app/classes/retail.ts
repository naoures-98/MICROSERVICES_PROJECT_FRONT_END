import { ActivitySector } from "./activity-sector";
import { ClientNotation } from "./client-notation";
import { Civility, EmployementStatus, FamilySituation, Gender } from "./enum";
import { ScoringContractData } from "./scoring-contract-data";

export class Retail extends ScoringContractData{

    civility: Civility| null = null;
    gender : Gender | null = null;
    firstName : string | null = null;
    lastName : string | null = null;
    birthDate : string | null = null;
    age : number | null = null;
    revenu : number | null = null;;
    nbrDependents : number | null = null;
    familySituation : FamilySituation | null = null;
    profession : string | null = null;
    employementStatus : EmployementStatus | null = null;
    employerSize: string | null = null;
    activitySector;
    activitySectorId : number  | null = null;
    deptRatio : number | null = null;
    relationEntryDate : string | null = null;
    seniorityRelation : number | null = null;
    unpaidPresence : string | null = null;
    payementIncident : string | null = null;
    echeance : number ;

    employementEntryDate : string | null = null;
    nbYearExperience : number | null = null;

    public constructor(){
        super();
        this.civility =null;
        this.gender = null;
        this.firstName = '';
        this.lastName = '';
        this.age = null;
        this.revenu = 0;
        this.echeance= 0;
        this.nbrDependents = 0;
        this.familySituation= null;
        this.telephone = '';
        this.startDate = new Date();
        this.activitySector = new ActivitySector();
        this.endDate = new Date();

    };


}
