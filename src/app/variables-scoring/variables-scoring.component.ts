import { Component, OnInit } from '@angular/core';
import { ScoringConfig } from '../classes/donnees-financieres';

@Component({
  selector: 'app-variables-scoring',
  templateUrl: './variables-scoring.component.html',
  styleUrl: './variables-scoring.component.css'
})
export class VariablesScoringComponent implements OnInit{
  
  
  // Exemple de modèle pour la configuration du scoring
  /*scoringConfig = {
    employerSize: {
      TPE: 0,
      PME: 0,
      GrandeEntreprise: 0
    },
    ancienneteEmployeur: 0,
    activitySector: 'AGRICULTURE',
    revenu: 0,
    employmentStatus: 'CDI'
  };*/

  scoringConfig: ScoringConfig = {
    employerSize: { TPE: 5, PME: 10, GrandeEntreprise: 20 },
    nbYearExperience: { 0: 0, 2: 5, 4: 10, 9: 15, 14: 20 },
    revenu: { 2000: 5, 4000: 10, 8000: 15, 20000: 20 },
  };
  constructor() {}
  ngOnInit(): void {
    //this.loadScoringConfig();
  }
  saveScoringConfig(){}
    // Méthode pour obtenir les clés de nbYearExperience sous forme de nombres
    experienceKeys(): number[] {
      return Object.keys(this.scoringConfig.nbYearExperience).map(key => +key);
    }
  /*loadScoringConfig(): void {
    this.scoringConfigService.getScoringConfig().subscribe(config => {
      this.scoringConfig = config;
    });
  }
  saveScoringConfig(): void {
    this.scoringConfigService.updateScoringConfig(this.scoringConfig).subscribe(res => {
      console.log('Configuration de scoring mise à jour avec succès');
    });
  }*/


}
