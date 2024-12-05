import { Segment } from "chart.js";
import { ClientSegmentConfig } from "./client-segment-config";
import { ScoreVariable } from "./score-variable";

export class ScoringVariable {

    id: number;
    code : String ;
    description : String ;
    clientSegmentConfig : ClientSegmentConfig| null = null;
    segment : Segment | null = null;
    scoreVariables : ScoreVariable[] = [];
    createAt :Date;
    updatedAt :Date;
    public constructor(){
        this.id = 0;
        this.code = "";
        this.description = "";
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
}
