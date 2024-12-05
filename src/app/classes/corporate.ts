import { ActivitySector } from "./activity-sector";
import { ClientCategory } from "./enum";
import { JuridicalForm } from "./juridical-form";
import { ScoringContractData } from "./scoring-contract-data";

export class Corporate extends ScoringContractData{

    raisonSocial : string | null = null;
    clientCategory : ClientCategory | null = null;
    numNis : string | null = null;
    numRegistreCommerce : string | null = null;
    creationDate : string | null = null;


    nbYearExercice : Number | null = null;
    relationEntryDate : string | null = null;
    seniorityRelation : Number | null = null;
    fiablityFinancialStatus : String | null = null;
    evolutionMarche  : String | null = null;
    positionnementCommerce : String | null = null;
    comportementClient : String | null = null;
    payementIncident : String | null = null;
    unpaidPresence : String | null = null;
    engagementStatus : String | null = null;
    financialRentability : Number | null = null;
    fondRoulement: Number | null = null;
    tauxFondRoulement: Number | null = null;
    autonomieFinanciere: Number | null = null;
    liquiditeGenerale: Number | null = null;


    creationPlace : string | null = null;
    juridicalForm : JuridicalForm ;
    activitySector : ActivitySector;
    
    juridicalFormId : number  | null = null;
    activitySectorId : number  | null = null;


    public constructor(){
        super();
        this.juridicalForm = new JuridicalForm();
        this.activitySector = new ActivitySector();
    };
}
