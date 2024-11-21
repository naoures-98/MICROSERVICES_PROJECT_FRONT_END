export enum Civility {
    MADAME = 'MADAME',
    MADEMOISELLE = 'MADEMOISELLE',
    MONSIEUR = 'MONSIEUR',
}
export enum Statut {
    En_cours = 'En_cours',
    AttenteValidation = 'AttenteValidation',
    Accorde = 'Accorde',
    AVerifier = 'AVerifier',
}
export const StatutDisplay = {
    [Statut.En_cours]: 'En cours',
    [Statut.AttenteValidation]: 'Attente Validation',
    [Statut.Accorde]: 'Accordé',
    [Statut.AVerifier]: 'À vérifier',
};
export enum Classe {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
}
export enum ClientCategory {
    ASSURANCES = 'ASSURANCES',
    BANQUE = 'BANQUE',
    ENTRPRENEUR_INDIVIDUEL = 'ENTRPRENEUR_INDIVIDUEL',
    GRANDE_ENTREPRISE_PRIVE = 'GRANDE_ENTREPRISE_PRIVE',
    PROFESSION_LIBERALE = 'PROFESSION_LIBERALE',
    GRANDE_ENTREPRISE_PUBLIQUE = 'GRANDE_ENTREPRISE_PUBLIQUE',
    PERSONNE_MORALE_PUBLIQUE = 'PERSONNE_MORALE_PUBLIQUE',
    PERSONNE_MORALE_PRIVEE = 'PERSONNE_MORALE_PRIVEE',
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