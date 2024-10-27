export enum Civility {
    MADAME = 'MADAME',
    MADEMOISELLE = 'MADEMOISELLE',
    MONSIEUR = 'MONSIEUR',
}
export enum Classe {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
}
export enum ClientCategory {
    ASSURANCES = 'ASSURANCES',
    BANQUE = 'BANQUE',
    ENTRPRENEUR_INDIVIDUEL = 'ENTRPRENEUR INDIVIDUEL',
    GRANDE_ENTREPRISE_PRIVE = 'GRANDE ENTREPRISE PRIVE',
    PROFESSION_LIBERALE = 'PROFESSION LIBERALE',
    GRANDE_ENTREPRISE_PUBLIQUE = 'GRANDE ENTREPRISE PUBLIQUE',
    PERSONNE_MORALE_PUBLIQUE = 'PERSONNE MORALE PUBLIQUE',
    PERSONNE_MORALE_PRIVEE = 'PERSONNE MORALE PRIVEE',
}
export enum Decision {
    Excellente = 'Excellente',
    Bonne = 'Bonne',
    Moyenne = 'Moyenne',
    Mauvaise = 'Mauvaise',
}
export enum EmployementStatus {
    CDD = 'CDD',
    CDI = 'CDI',
    RETRAITE = 'RETRAITE',
    SANS_EMPLOI = 'SANS_EMPLOI',
    TRAVAILLEUR_INDEPENDANT = 'TRAVAILLEUR_INDEPENDANT',
    AUTRES = 'AUTRES',
}

export enum FamilySituation {
    MARIE = 'MARIE',
    CELIBATAIRE = 'CELIBATAIRE',
    DIVORCE = 'DIVORCE',
    VEUF = 'VEUF',
}
export const FamilySituationDisplay = {
    [FamilySituation.MARIE]: 'Marié(e)',
    [FamilySituation.CELIBATAIRE]: 'Célibataire',
    [FamilySituation.DIVORCE]: 'Divorcé(e)',
    [FamilySituation.VEUF]: 'Veuf(ve)',
};
export enum Gender {
    Femme = 'Femme',
    Homme = 'Homme',
}