
import { ScoringVariable } from "./scoring-variable";

export class ScoreVariable {

    id: number;
    valeur : String | null = null;
    score : Number | null = null;
    //scoringVariable : ScoringVariable| null = null;
    createAt :Date;
    updatedAt :Date;
    public constructor(){
        this.id = 0;   
        this.createAt = new Date();
        this.updatedAt = new Date();
    };
}
