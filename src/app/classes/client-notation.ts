import { ClientSegmentConfig } from "./client-segment-config";
import { Classe, Decision } from "./enum";
import { ScoringContractData } from "./scoring-contract-data";

export class ClientNotation {

    id: number;
    notationDate: Date| null = null;
    finalScore: Number| null = null;
    adjustedScore: Number| null = null;
    pd: Number| null = null;
    decisionOctroi :Decision| null = null;
    classe : Classe| null = null;
    clientSegmentConfig : ClientSegmentConfig| null = null;
    scoringContractData : ScoringContractData| null = null;
    createAt :Date;
    updatedAt :Date;
    public constructor(){
        this.id = 0;
        this.notationDate = new Date();
        this.finalScore = 0;
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
}
