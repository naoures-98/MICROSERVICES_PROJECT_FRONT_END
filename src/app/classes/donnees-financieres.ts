export interface Section {
    name: string;
    rows: Row[];
    totalScore: number; // Optionnel pour calculer le score total de la section
  }
  
  export interface Row {
    name: string;
    ponderation: number;
    borneInf: number;
    borneSup: number;
    norme: number;
    scoreMin: number;
    scoreMax: number;
    valeurClient: number | null; // Saisie par l'utilisateur
    score: number;
    scorePondere: number;
  }
  