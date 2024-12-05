import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorporateService } from '../../../services/corporate.service';
import { BranchService } from '../../../services/branch.service';
import { NgToastService } from 'ng-angular-popup';
import { Corporate } from '../../../classes/corporate';
import { FinancingType } from '../../../classes/financing-type';
import { FinancingTypeService } from '../../../services/financing-type.service';
import { Branch } from '../../../classes/branch';
import { ClientCategory, Statut, StatutDisplay } from '../../../classes/enum';
import { JuridicalForm } from '../../../classes/juridical-form';
import { JuridicalFormService } from '../../../services/juridical-form.service';
import { ActivitySectorService } from '../../../services/activity-sector.service';
import { ActivitySector } from '../../../classes/activity-sector';
//import { Section } from '../../../classes/donnees-financieres';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrl: './corporate.component.css'
})
export class CorporateComponent  implements OnInit{
  corporates : Corporate[]=[];
  corporate: Corporate = new Corporate();

  financingTypes : FinancingType[]=[];
  branchs : Branch[]=[];
  juridicalForms : JuridicalForm[]=[];
  activities : ActivitySector[]=[];
  //FILTRER LA LISTE DES ACTIVITES :
  selectedCorporateId!: Number;
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 30; // Nombre d'éléments par page

  lastSequentialNumber = 0; // Variable pour garder la trace du dernier nombre séquentiel

  statutDisplay : any = StatutDisplay;
  dateError = false; // Indicateur d'erreur
  dateErrorMessage = ''; // Message d'erreur



//commun
scoreCapitalImpaye = 0;
scoreCapitalNominal=0;
//corpo
scoreClientCategory =0;
scoreAgeSociety =0;
scoreJuridicalForm=0;
scoreActivitySector =0;

scoreNbYearExercice =0;
scoreNbYearRelationBanque =0;
scoreQualiteActionnariat =0;
scoreFiabiliteEtatsFinanciers =0;
scoreEvolutionMarche =0;
scoreVisVisConcurrence =0;
scoreLimiteAutorises =0;
scoreIncidentsPaiement =0;
scoreSituationEngagement =0;
scoreRentabiliteFinancieres =0;
scoreFondRoulements =0;
scoreTauxBFR =0;
scoreAutonomieFinancieres =0;
scoreLiquiditeGenerale =0;


//
scoreHistoriqueEntreprise = 0;
scoreActionnariat = 0;
scoreMarcheSecteurActivite = 0;
scoreQualitatif = 0;
scoreComportementale = 0;

scoreStructureFinanciere = 0;
scoreSolvabilite = 0;
scoreFinancierTotal = 0;
//
pilierFinancier = 0.35;
pilierQualitatif = 0.25;
pilierComportemental = 0.40;
//
scoreFinal = 0; 



scoreProbabiliste = 0 ;


//Retail
scoreAgeRetail =0;
scoreRevenu =0
scoreNbrDependents =0 
scoreSituationFamille =0;
scoreEmploymentstatus=0;
scoreEmployerSize=0;
scoreAncienneteEmployeur=0;
scoreTauxEndettement = 0;
scoreAncienneteRelationBanque =0;
scorePresenceImpaye = 0;
scoreIncidentPayement = 0;


scoreEmployeur  = 0; 
scoreClient = 0;
scoreComportement = 0;




  constructor(private route: ActivatedRoute, 
    private router: Router, public corpoService : CorporateService,
    private financingTypeService : FinancingTypeService,
    private juridicalFormService : JuridicalFormService,
    private activitySectorService : ActivitySectorService,
    public branchService: BranchService,
    private toast : NgToastService) { }
  ngOnInit(): void {
    this.corporate.year = new Date().getFullYear();
    this.loadFinancingTypes();
    this.loadBranchs();
    this.loadActivitiesSector();
    this.loadJuridicalForms();
    //Récupérer la liste des secteurs d'activités
    this.corpoService.getAllClientsCorpo().subscribe(
      res=>{
        this.corporates=res;
    },
      err=>{console.log(err);
      }
    );
  }
  getStatusLabel(statut: string | null): string {
    // Retourne le libellé personnalisé ou le statut brut s'il n'est pas trouvé
    //console.log(statut);
    if(statut==null)
      return  "";
    
    return this.statutDisplay[statut] || statut;
  }
  getStatusClass(statut: string | null): string {
    switch (statut) {
      case 'Accorde':
        return 'status-accorde';
      case 'AVerifier':
        return 'status-a-verifier';
      case 'En_cours':
        return 'status-encours';
      case 'AttenteValidation':
        return 'status-attente-validation';
      default:
        return ''; // Classe par défaut si le statut est inconnu
    }
  }
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  recupererDonneesClient(): void {
    if(this.corporate.clientRequest == '012114') {
        this.corporate.raisonSocial = 'SOCIETE SAIF';
        this.corporate.creationDate = this.formatDate(new Date('1988-05-05'));
        this.corporate.creationPlace = 'TUNIS';
        this.corporate.numNis = '2597';
        this.corporate.numRegistreCommerce = 'TF258';
        this.corporate.email = 'saifbgo@gmail.com';
        this.corporate.telephone ='71831477';
        this.corporate.mntInitial=0;
        this.corporate.capitalRestantDu = 0;
        this.corporate.mntEncEcheance = 8000;
        this.corporate.endDateEncours = null//this.formatDate(new Date('2026-05-05'));
        this.corporate.clientCategory = ClientCategory.ASSURANCES;
        this.activitySectorService.getActivityById(17).subscribe( 
          res=>{
            this.corporate.activitySector = res;
            this.corporate.activitySectorId = res.id;
          });
        this.corporate.nbYearExercice = 36;
        this.corporate.relationEntryDate = this.formatDate(new Date('2022-05-05'));
        this.corporate.seniorityRelation = 22 ; 
        this.juridicalFormService.getJuridicalFormById(6).subscribe( 
          res=>{
            this.corporate.juridicalForm = res;
            this.corporate.juridicalFormId = res.id;
          });
    }
  }

  get filteredCorporates() {
    return this.corporates.filter(corporate => 
      (corporate.raisonSocial!=null ? corporate.raisonSocial.toLowerCase().includes(this.searchText.toLowerCase()):true) ||
      (corporate.clientRequest!=null ? corporate.clientRequest.toLowerCase().includes(this.searchText.toLowerCase()) : true) ||
      (corporate.contractReference!=null ? corporate.contractReference.toLowerCase().includes(this.searchText.toLowerCase()) : true) 
    );
  }

  get clientCategoryOptions() {
    return Object.values(ClientCategory);
  }
  get statutOptions() {
    return Object.values(Statut);
  }
  onJuridicalFormChange(selectedJuridicalFormCode: string) {
    console.log("selectedJuridicalFormCode = "+ selectedJuridicalFormCode);
    // Recherche de l'agence correspondant au code sélectionné
    const selectedJuridicalForm= this.juridicalForms.find(juridicalForm => 
      juridicalForm.juridicalFormCode === selectedJuridicalFormCode);

    // Si une agence est trouvée, met à jour la description (nom)
    if (selectedJuridicalForm) {
      this.corporate.juridicalForm =selectedJuridicalForm;
      this.corporate.juridicalFormId = selectedJuridicalForm.id;
    }
  }

  onActivitySectorChange(selectedActivitySectorCode: string) {
    console.log("selectedActivitySectorCode = "+ selectedActivitySectorCode);
    // Recherche de l'agence correspondant au code sélectionné
    const selectedActivitySector= this.activities.find(activitySector => 
      activitySector.code === selectedActivitySectorCode);

    // Si une agence est trouvée, met à jour la description (nom)
    if (selectedActivitySector) {
      this.corporate.activitySector =selectedActivitySector;
      this.corporate.activitySectorId = selectedActivitySector.id;
    }
  }
  onFinancingTypeChange(selectedFinancingTypeCode: string) {
    console.log("selectedFinancingTypeCode = "+ selectedFinancingTypeCode);
    
    const selectedFinancingType= this.financingTypes.find(financingType => 
      financingType.financingTypeCode === selectedFinancingTypeCode);

    
    if (selectedFinancingType) {
      this.corporate.financingType =selectedFinancingType;
      this.corporate.financingTypeId = selectedFinancingType.id;
    }
  }
  calculateDuration(): void {
    if (this.corporate.startDate && this.corporate.endDate) {
      const start = new Date(this.corporate.startDate);
      const end = new Date(this.corporate.endDate);

      // Validation : La date de fin doit être après la date de début
      if (end < start) {
        this.dateError = true;
        this.dateErrorMessage = 'La date de fin ne peut pas être antérieure à la date de début.';
        this.corporate.duree = 0; // Réinitialiser la durée
        return;
      } else {
        this.dateError = false; // Réinitialiser l'erreur
        this.dateErrorMessage = '';
      }

      // Calcul de la différence en mois
      const yearsDiff = end.getFullYear() - start.getFullYear();
      const monthsDiff = end.getMonth() - start.getMonth();

      // Total mois
      const totalMonths = yearsDiff * 12 + monthsDiff;

      this.corporate.duree = totalMonths >= 0 ? totalMonths : 0;
    } else {
      this.corporate.duree = 0; // Réinitialiser si une des deux dates est manquante
      this.dateError = false; // Réinitialiser l'erreur
      this.dateErrorMessage = '';
    }
  }
  onBranchCodeChange(selectedBranchId: any) {
    // Convertir en number si nécessaire pour assurer une comparaison correcte
    const selectedBranch = this.branchs.find(branch => Number(branch.id) === Number(selectedBranchId));
    
    // Si une agence est trouvée, met à jour la description (nom)
    if (selectedBranch) {
      this.corporate.branch = { ...selectedBranch };
      this.corporate.branchId = selectedBranch.id;
      // Cloner l'objet sélectionné pour éviter les problèmes de référence
      console.log("selectedBranch.branchCode = " + selectedBranch.branchCode);
    }
    console.log("branchcode = " + this.corporate.branch.branchCode);
  }
  loadFinancingTypes(): void {
    this.financingTypeService.getFinancingTypeByFinancingNature("FINANCEMENT ENTREPRISES").subscribe(natures => {
      this.financingTypes = natures;
    });
  }
  loadBranchs(): void {
    this.branchService.getAllBranchs().subscribe(branchs => {
      this.branchs = branchs;
    });
  } 
  loadJuridicalForms(): void {
    this.juridicalFormService.getAllJuridicalForm().subscribe(forms => {
      this.juridicalForms = forms;
    });
  } 
  loadActivitiesSector(): void {
    this.activitySectorService.getAllActivities().subscribe(activities => {
      this.activities = activities;
    });
  } 
  showDetails(selectedCorporate : any){
    this.corpoService.getDetailsCorporate(selectedCorporate.id).subscribe(
      res=>{
        this.corporate=res;
    },
      err=>{console.log(err);

      }
    );
  }

  envoiDossierValidation(){
    //const branch   = this.retail.branch ; 
    console.log('Statut avant PUT:', this.corporate.statutDossier);
    const statut =  this.corporate.statutDossier ; 
    
    this.corporate.statutDossier = Statut.AttenteValidation;
    console.log(' ------ Statut apres  PUT:', this.corporate.statutDossier);
    console.log("branch 2 "+ this.corporate.branch.id);
    this.corpoService.editClientCorporate(this.corporate).subscribe( 
      res=>{
        this.ngOnInit();
        console.log(res);
      }, 
    err=>{
      this.toast.danger("Problem de modification",err);
      console.log(err);}); 
    //this.router.navigate(['/generateNotePart']);
    this.toast.success( "Dossier  ["+this.corporate.contractReference +"] Envoyée pour Validation", "success " );

    this.ngOnInit();

  }
  editCorporate(selectedCorporate : any){
    
    this.corpoService.getDetailsCorporate(selectedCorporate.id).subscribe(
      res=>{
        this.corporate=res;
        this.corporate.id = selectedCorporate.id;
        this.corporate.branchId =this.corporate.branch.id ;
        this.corporate.financingTypeId =this.corporate.financingType.id ;
        if(this.corporate.activitySector != null)
          this.corporate.activitySectorId =this.corporate.activitySector.id ;
        else
          this.corporate.activitySector = new ActivitySector();
        if(this.corporate.juridicalForm !=null)
          this.corporate.juridicalFormId =this.corporate.juridicalForm.id ;
        else 
          this.corporate.juridicalForm = new JuridicalForm();
    },
      err=>{console.log(err);
      }
    );   
  }

  onEditSubmit(){
    console.log('Statut avant PUT:', this.corporate.statutDossier);
    const statut =  this.corporate.statutDossier ; 
    
    this.corporate.statutDossier = Statut.En_cours;
    console.log(' ------ Statut apres  PUT:', this.corporate.statutDossier);
    this.corpoService.editClientCorporate(this.corporate).subscribe( 
      res=>{
        this.toast.success( "Client  ["+this.corporate.clientRequest +"] modifiée avec succès", "success " );
        this.ngOnInit();
        console.log(res);
      }, 
    err=>{
      this.toast.danger("Problem de modification",err);
      console.log(err);}); 
  }
  generateContractReference(lastSequentialNumber : String): void {
    // Construire la référence demande
    const year = this.corporate.year; // Supposons que year est déjà défini dans retail
    const clientIdentifier = this.corporate.clientRequest; // Identifiant Client
    const agence = this.corporate.branch.branchCode;
    this.corporate.contractReference = `${year}|${agence}|${clientIdentifier}|${lastSequentialNumber}`; // Format souhaité
  
  }
  // CREATION D UNE NOUVELLE PERSONNE PHYSIQUE 
  onSubmit(){
    // Générer le nombre séquentiel
    this.lastSequentialNumber = this.lastSequentialNumber+1; // Incrémentez le nombre séquentiel
    const sequentialNumber = this.lastSequentialNumber.toString(); // Convertir en chaîne de caractères si nécessaire
    this.corporate.statutDossier =Statut.En_cours ; 
    this.generateContractReference(sequentialNumber);
    console.log(this.corporate);
    this.onAjoutCorporate();
  }
  onCreationDateChange(CreationDate: string): void {
    if (CreationDate) {
      const date = new Date(CreationDate);
      const today = new Date();
      let nb = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
  
      // Ajustement si l'anniversaire n'est pas encore arrivé cette année
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        nb--;
      }
  
      // Mise à jour de l'âge dans le modèle
      this.corporate.nbYearExercice = nb;
    }
  }
  onRelationEntryDateChange(relationEntryDate: string): void {
    if (relationEntryDate) {
      const relationDate = new Date(relationEntryDate);
      const today = new Date();
      let nb = today.getFullYear() - relationDate.getFullYear();
      const monthDiff = today.getMonth() - relationDate.getMonth();
  
      // Ajustement si l'anniversaire n'est pas encore arrivé cette année
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < relationDate.getDate())) {
        nb--;
      }
  
      // Mise à jour de l'âge dans le modèle
      this.corporate.seniorityRelation = nb;
    }
  }
  onAjoutCorporate(){
  
    this.corpoService.createNewClientCorpo(this.corporate).subscribe( 
      res=>{
        this.toast.success( "Client ["+this.corporate.clientRequest +"] ajoutée avec succès", "success " );
        this.ngOnInit();
        this.corporate= new Corporate();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de creation");
      console.log(err);});
      
  }
  openDeleteModal(id : Number) {
    this.selectedCorporateId = id;
  }
  confirmDelete() {
    this.corpoService.deleteClientCorporate(this.selectedCorporateId).subscribe( 
      res=>{
        this.toast.success( "Client  supprimée avec succès", "success " );
      // Fermez le modal de confirmation
      const modalElement = document.getElementById('confirmDeleteModal');
        this.ngOnInit();
        console.log(res); 

      }, 
    err=>{
      this.toast.danger("Problem de suppression",err);
      console.log(err);});
  }



  

  /////////////////////////////////////////////////////
  getClassByLevel(level: string| null): string {
    if (!level) {
      return 'bg-default'; // Classe par défaut si null ou indéfini
    }
    switch (level.toLowerCase()) {
      case 'mauvaise':
        return 'bg-red';
      case 'excellente':
        return 'bg-green';
      case 'bonne':
        return 'bg-green';        
      case 'moyenne':
        return 'bg-orange';
      default:
        return 'bg-default';
    }
  }
  

  
  /*sections: Section[] = [
    {
      name: 'RENTABILITE',
      rows: [
        {
          name: 'Rentabilité financière',
          ponderation: 30,
          borneInf: 0,
          borneSup: 20,
          norme: 10,
          scoreMin: 0,
          scoreMax: 20,
          valeurClient: null,
          score: 0,
          scorePondere: 0,
        },
      ],
      totalScore: 0,
    },
    {
      name: 'STRUCTURE FINANCIERE/TRESORERIE',
      rows: [
        {
          name: 'Fonds de roulement (FR)',
          ponderation: 50,
          borneInf: 0,
          borneSup: 0.01,
          norme: 0,
          scoreMin: 0,
          scoreMax: 20,
          valeurClient: null,
          score: 0,
          scorePondere: 0,
        },
        {
          name: 'Taux de couverture du BFR',
          ponderation: 50,
          borneInf: 40,
          borneSup: 100,
          norme: 70,
          scoreMin: 0,
          scoreMax: 20,
          valeurClient: null,
          score: 0,
          scorePondere: 0,
        },
      ],
      totalScore: 0,
    },
  ];*/
  
    // Méthode pour calculer les scores (optionnelle)
  /*  calculateScores(): void {
      this.sections.forEach((section: Section) => {
        section.totalScore = 0;
        section.rows.forEach((row: Row) => { // Ajout du type explicite
          if (row.valeurClient !== null) {
            // Calcul du score
            if (row.valeurClient < row.borneInf) {
              row.score = row.scoreMin;
            } else if (row.valeurClient > row.borneSup) {
              row.score = row.scoreMax;
            } else {
              row.score =
                ((row.valeurClient - row.borneInf) /
                  (row.borneSup - row.borneInf)) *
                (row.scoreMax - row.scoreMin) +
                row.scoreMin;
            }
            // Calcul du score pondéré
            row.scorePondere = (row.score * row.ponderation) / 100;
            section.totalScore += row.scorePondere;
          } else {
            row.score = 0;
            row.scorePondere = 0;
          }
        });
      });
    }*/
    
  /*  getGlobalScore(): number {
      return this.sections.reduce((total, section) => total + section.totalScore, 0);
    }
  */    

}
