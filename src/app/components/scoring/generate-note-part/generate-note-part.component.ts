import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorporateService } from '../../../services/corporate.service';
import { FinancingTypeService } from '../../../services/financing-type.service';
import { JuridicalFormService } from '../../../services/juridical-form.service';
import { ActivitySectorService } from '../../../services/activity-sector.service';
import { BranchService } from '../../../services/branch.service';
import { NgToastService } from 'ng-angular-popup';
import { Retail } from '../../../classes/retail';
import { RetailService } from '../../../services/retail.service';
import { Corporate } from '../../../classes/corporate';
import { Classe, ClientCategory, Decision, EmployementStatus, FamilySituation, Statut, StatutDisplay } from '../../../classes/enum';
import { ClientNotation } from '../../../classes/client-notation';
import { ClientNotationService } from '../../../services/client-notation.service';
import { ClientSegmentConfigService } from '../../../services/client-segment-config.service';
import { ClientSegmentConfig } from '../../../classes/client-segment-config';
import { JuridicalForm } from '../../../classes/juridical-form';
import { ActivitySector } from '../../../classes/activity-sector';
import { ClientScore } from '../../../classes/ClientScore';
import { FinancingType } from '../../../classes/financing-type';
import { Branch } from '../../../classes/branch';

@Component({
  selector: 'app-generate-note-part',
  templateUrl: './generate-note-part.component.html',
  styleUrl: './generate-note-part.component.css'
})
export class GenerateNotePartComponent   implements OnInit{
  //FILTRER LA LISTE DES ACTIVITES :
  
  activities : ActivitySector[]=[];


  searchTextRetail: string = '';
  pRetail: number = 1; // Page courante
  itemsPerPageRetail: number = 20; // Nombre d'éléments par page
  clientScore : number =0;
  

  financingType = new FinancingType();
  financingTypes : FinancingType[]=[];

  
  clientSegmentConfig: ClientSegmentConfig = new ClientSegmentConfig();
  retails : Retail[]=[];
  retail: Retail = new Retail();
  branchs : Branch[]=[];
  isScored : Boolean = false;
  clientNotation: ClientNotation = new ClientNotation();


  statutDisplay : any = StatutDisplay;


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
    private router: Router, 
    public retailService : RetailService  ,
    private clientNotationService : ClientNotationService ,
    private clientSegmentConfigService : ClientSegmentConfigService,
    public financingTypeService : FinancingTypeService,
    public branchService: BranchService,
    private activitySectorService : ActivitySectorService,
    private cdr: ChangeDetectorRef,
    private toast : NgToastService) { }
  ngOnInit(): void {
    this.loadFinancingTypes();
    this.loadBranchs();
    this.loadActivitiesSector();

    this.retailService.getAllClientsRetail().subscribe(
      res=>{
        this.retails=res;
    },
      err=>{console.log(err);
      }
    );
  }
  loadFinancingTypes(): void {
    this.financingTypeService.getFinancingTypeByFinancingNature("FINANCEMENT PARTICULIERS").subscribe(natures => {
      this.financingTypes = natures;
    });
  }
  loadBranchs(): void {
    this.branchService.getAllBranchs().subscribe(branchs => {
      this.branchs = branchs;
    });
  }
  loadActivitiesSector(): void {
    this.activitySectorService.getAllActivities().subscribe(activities => {
      this.activities = activities;
    });
  }
  //filter par la barre de recherche
  get filteredRetails() {
    return this.retails.filter(retail => 
      (retail.firstName!=null ? retail.firstName.toLowerCase().includes(this.searchTextRetail.toLowerCase()):true) ||
      (retail.lastName!=null ? retail.lastName.toLowerCase().includes(this.searchTextRetail.toLowerCase()) : true) ||
      (retail.contractReference!=null ? retail.contractReference.toLowerCase().includes(this.searchTextRetail.toLowerCase()) : true) 
    );
  }

  get statutOptions() {
    return Object.values(Statut);
  }
  get emploiStatusOptions() {
    return Object.values(EmployementStatus);
  }
  isStatutDisabled(): boolean {
    return this.retail.statutDossier === 'Accorde' || 
           this.retail.statutDossier === 'AVerifier' || 
           this.retail.statutDossier === 'En_cours';
  }
  
  showDetails(selectedRetail : any){
    this.retailService.getDetailsRetail(selectedRetail.id).subscribe(
      res=>{
        this.retail=res;
        this.retail.id = selectedRetail.id;
    },
      err=>{console.log(err);

      }
    );
  }

  getStatusClass(statut: string | null): string { // couleur affichage
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
  getStatusLabel(statut: string | null): string {
    // Retourne le libellé personnalisé ou le statut brut s'il n'est pas trouvé
    
    if(statut==null)
      return  "";
    
    return this.statutDisplay[statut] || statut;
  }  

  validerDossierRetail(){
    const branch   = this.retail.branch ; 
    console.log('Statut avant PUT:', this.retail.statutDossier);
    const statut =  this.retail.statutDossier ; 
    console.log("branch "+ this.retail.branch.id);
    //if(this.retail.activitySector !=null)
    //  this.retail.activitySectorId =this.retail.activitySector.id ;
    //console.log("activitySectorId = "+ this.retail.activitySector.id)
    if(this.retail.activitySector )
      this.retail.activitySectorId = this.retail.activitySector.id;
    if(this.retail.financingType!=null){
      this.financingTypeService.getFinancingTypeByCode(this.retail.financingType.financingTypeCode).subscribe( 
        res=>{
          this.financingType = res;
          this.retail.financingType=this.financingType;
          this.retail.financingTypeId=this.financingType.id;
          this.retail.branch = branch 
          this.retail.branchId  = branch.id 
          this.retail.statutDossier = statut;
          console.log(' ------ Statut apres  PUT:', this.retail.statutDossier);
          console.log("branch 2 "+ this.retail.branch.id);
          this.retailService.editClientRetail(this.retail).subscribe( 
            res=>{
              this.toast.success( "Client  ["+this.retail.clientRequest +"] modifiée avec succès", "success " );
              console.log(res);
              this.ngOnInit();

            }, 
          err=>{
            this.toast.danger("Problem de modification",err);
            console.log(err);}); 
        }, 
      err=>{
        console.log("error = "+err);});
    }
    this.router.navigate(['/generateNotePart']);
    this.ngOnInit();

  }
  calculerScoreRetail(selectedRetail : any){
    this.toast.info('Calcul du score en cours...');
    console.log("selectedRetail = "+selectedRetail.id);
    this.clientNotationService.getAllClientNotationByClient(selectedRetail.id).subscribe(
      res=>{
        console.log("getAllClientNotationByClient = "+res);
        if(res != null ){
          console.log("res.id = "+res.id);
          this.clientNotation = res;
          
          console.log("this.clientNotation.id = "+this.clientNotation.id);
        }
  
        console.log("clientNotation = "+this.clientNotation);
        console.log("351 this.clientNotation.id = "+this.clientNotation.id);
  
        //Employeur contre partie 
  
        // Calcul du score taille employeur
        if(this.retail.employerSize!==null){
          if(this.retail.employerSize =="Grande Entreprise")
            this.scoreEmployerSize = 20 ;
          else if(this.retail.employerSize =="PME")
            this.scoreEmployerSize = 10 ;
          else if(this.retail.employerSize =="TPE")
            this.scoreEmployerSize = 5 ;
        }else{
          this.scoreEmployerSize = 0 ;
        }
  
        //score avec ponderation
        this.scoreEmployerSize = this.scoreEmployerSize * 0.40;
  
        //Score ancienneté avec la banque
        if(this.retail.nbYearExperience != null){
          if(this.retail.nbYearExperience >= 0 && this.retail.nbYearExperience < 2 )
            this.scoreAncienneteEmployeur = 0 ;
          else if(this.retail.nbYearExperience >= 2 && this.retail.nbYearExperience <4 )
            this.scoreAncienneteEmployeur = 5 ;
          else if(this.retail.nbYearExperience >= 4 && this.retail.nbYearExperience <9)
            this.scoreAncienneteEmployeur = 10 ;
          else if(this.retail.nbYearExperience >= 9 && this.retail.nbYearExperience <14)
            this.scoreAncienneteEmployeur = 20 ;
          /*else
            this.scoreAncienneteEmployeur = 20 ;*/
        }
        //score avec ponderation
        this.scoreAncienneteEmployeur = this.scoreAncienneteEmployeur * 0.20;
  
        // Calcul du score Secteur d'Activité
        if(this.retail.activitySector!==null){
          if(this.retail.activitySector.code == "AGRICULTURE" || this.retail.activitySector.code == "INDUSTRIE" ||
          this.retail.activitySector.code == "CONSTRUCTION" ||	this.retail.activitySector.code == "SERVICES"){
            this.scoreActivitySector = 5 ;
          }else if (this.retail.activitySector.code == "BANQUE" ||	this.retail.activitySector.code == "ASSURANCE" ||
            this.retail.activitySector.code == "IMMOBILIER") {
              this.scoreActivitySector = 10 ;
          } else if (this.retail.activitySector.code == "ENTREPRENEURSHIP" || this.retail.activitySector.code == "PUBLIC SERVICES"){
            this.scoreActivitySector = 15;
          }	
        }else{
          this.scoreActivitySector = 0;
        }
        //score avec ponderation
        this.scoreActivitySector = this.scoreActivitySector * 0.40;
  
  
        // Rubrique Client/ Financement
  
        //Score revenue
        if(this.retail.revenu != null){
          if(this.retail.revenu <= 2000)
            this.scoreRevenu = 5 ;
          else if (this.retail.revenu > 2000 && this.retail.revenu <= 4000)
            this.scoreRevenu = 10 ;
          else if (this.retail.revenu > 4000 && this.retail.revenu <= 8000)
            this.scoreRevenu = 15 ;
          else
            this.scoreRevenu = 20 ;
        }
        //score avec ponderation
        this.scoreRevenu = this.scoreRevenu * 0.3;
  
  
        //Score statut emploi
        if(this.retail.employementStatus != null ){
          if(this.retail.employementStatus == EmployementStatus.CDI )
            this.scoreEmploymentstatus = 20 ;
          else if (this.retail.employementStatus == EmployementStatus.CDD) 
            this.scoreEmploymentstatus = 10 ;
          else if ( this.retail.employementStatus == EmployementStatus.RETRAITE) 
            this.scoreEmploymentstatus = 15 ;
          else if (this.retail.employementStatus == EmployementStatus.TRAVAILLEUR_INDEPENDANT || this.retail.employementStatus == EmployementStatus.AUTRES)
            this.scoreEmploymentstatus = 0 ;
          else
            this.scoreEmploymentstatus = 0 ;
        }
        //score avec ponderation
        this.scoreEmploymentstatus = this.scoreEmploymentstatus * 0.15;
  
        // score family situation
        if(this.retail.familySituation != null ){
          if(this.retail.familySituation == FamilySituation.CELIBATAIRE)
            this.scoreSituationFamille = 20 ;
          else if (this.retail.familySituation == FamilySituation.MARIE)
            this.scoreSituationFamille = 15 ;
          else if (this.retail.familySituation == FamilySituation.VEUF)
            this.scoreSituationFamille = 10 ;
          else if (this.retail.familySituation == FamilySituation.DIVORCE)
            this.scoreSituationFamille = 10 ;
        }
        //score avec ponderation
        this.scoreSituationFamille = this.scoreSituationFamille * 0.05;
  
        //  score nb personne a charge
        if(this.retail.nbrDependents !=null){
          if(this.retail.nbrDependents >=0&& this.retail.nbrDependents <= 2)
            this.scoreNbrDependents = 20 ;
          else if (this.retail.nbrDependents >2 && this.retail.nbrDependents <=  5)
            this.scoreNbrDependents = 15 ;
          else if (this.retail.nbrDependents >5 && this.retail.nbrDependents <= 7)
            this.scoreNbrDependents = 5 ;
          else if (this.retail.nbrDependents >7 )
            this.scoreNbrDependents = 0 ;
        }
        //score avec ponderation
        this.scoreNbrDependents = this.scoreNbrDependents * 0.05;
  
  
        //Score Taux Endettement
        if(this.retail.deptRatio != null){
          if(this.retail.deptRatio < 30)
            this.scoreTauxEndettement = 20 ;
          else if (this.retail.deptRatio >= 30 && this.retail.deptRatio < 40)
            this.scoreTauxEndettement = 15 ;
          else if (this.retail.deptRatio >= 40 && this.retail.deptRatio < 45)
            this.scoreTauxEndettement = 10 ;
          else
            this.scoreTauxEndettement = 5 ;
        }
        //score avec ponderation
        this.scoreTauxEndettement = this.scoreTauxEndettement * 0.25;
  
        //Score ancienneté avec la banque
        if(this.retail.seniorityRelation != null){
          if(this.retail.seniorityRelation  <= 1 )
            this.scoreAncienneteRelationBanque = 0 ;
          else if(this.retail.seniorityRelation > 1 && this.retail.seniorityRelation <=2 )
            this.scoreAncienneteRelationBanque = 5 ;
          else if(this.retail.seniorityRelation > 2 && this.retail.seniorityRelation <=5)
            this.scoreAncienneteRelationBanque = 10 ;
          else if(this.retail.seniorityRelation > 5 && this.retail.seniorityRelation <=10)
            this.scoreAncienneteRelationBanque = 15 ;
          else if(this.retail.seniorityRelation > 10)
            this.scoreAncienneteRelationBanque = 20 ;
        }
        //score avec ponderation
        this.scoreAncienneteRelationBanque = this.scoreAncienneteRelationBanque * 0.10;
  
        //Score age
        if(this.retail.age != null){
          if(this.retail.age < 30)
            this.scoreAgeRetail = 10 ;
          else if (this.retail.age >= 30 && this.retail.age < 40)
            this.scoreAgeRetail = 20 ;
          else if (this.retail.age >= 40 && this.retail.age < 50)
            this.scoreAgeRetail = 10 ;
          else
            this.scoreAgeRetail = 5 ;
        }
        //score avec ponderation
        this.scoreAgeRetail = this.scoreAgeRetail * 0.10;
  
  
        // Comportement                     
  
        //Score presence impayé
        if(this.retail.unpaidPresence != null){
          if(this.retail.unpaidPresence = "Aucun impayé")
            this.scorePresenceImpaye = 20 ;
          else if (this.retail.unpaidPresence =="impayé inf 2 mois")
            this.scorePresenceImpaye = 15 ;
          else if (this.retail.unpaidPresence=="impayé sup 2 mois")
            this.scorePresenceImpaye = 5 ;
          else if (this.retail.unpaidPresence=="impayé sup 3 mois")
            this.scorePresenceImpaye = 0 ;
        }
        //score avec ponderation
        this.scorePresenceImpaye = this.scorePresenceImpaye * 0.60;
  
  
        //Score incident de payement
        if(this.retail.payementIncident != null){
          if(this.retail.payementIncident = "Aucun incident")
            this.scoreIncidentPayement = 20 ;
          else if (this.retail.payementIncident =="incident de paiement sur cheque")
            this.scoreIncidentPayement = 0 ;
        }
        //score avec ponderation
        this.scoreIncidentPayement = this.scoreIncidentPayement * 0.40;
  
        //Calcul  score Employeur contre partie 
        this.scoreEmployeur =( this.scoreEmployerSize + this.scoreAncienneteEmployeur +this.scoreActivitySector ) *0.40;
  
        //Calcul  score Client / financement
        this.scoreClient = (this.scoreAgeRetail + this.scoreAncienneteRelationBanque + this.scoreTauxEndettement +
        this.scoreNbrDependents +this.scoreSituationFamille + this.scoreEmploymentstatus +	this.scoreRevenu ) * 0.30;
  
        //Calcul  score Comportement client 
        this.scoreComportement = (this.scorePresenceImpaye + this.scoreIncidentPayement) * 0.30;
  
  
        this.clientNotation.finalScore = this.scoreEmployeur + this.scoreClient + this.scoreComportement ; 
        this.clientNotation.adjustedScore = ((Number(this.clientNotation.finalScore|| 0) -10 )*10) /10;
        this.scoreProbabiliste = 1/ ( 1 + Math.exp( - (this.clientNotation.adjustedScore)));
  
        this.clientNotation.pd = 1 -this.scoreProbabiliste;
  
        if(Number(this.clientNotation.pd)  >= 0  && Number(this.clientNotation.pd) <=  0.1){
          this.clientNotation.decisionOctroi = Decision.Excellente ;
        }else if (Number(this.clientNotation.pd)  >0.1 && Number(this.clientNotation.pd) <=  0.2){
          this.clientNotation.decisionOctroi = Decision.Bonne ;
        }else if (Number(this.clientNotation.pd)  >0.2 && Number(this.clientNotation.pd) <=  0.3){
          this.clientNotation.decisionOctroi = Decision.Moyenne ;
        }else {
          this.clientNotation.decisionOctroi = Decision.Mauvaise ;
        }
  
        if(Number(this.clientNotation.pd)  >= 0  && Number(this.clientNotation.pd) <=  0.1){
          this.clientNotation.classe = Classe.A ;
        }else if (Number(this.clientNotation.pd)  >0.1 && Number(this.clientNotation.pd) <=  0.2){
          this.clientNotation.classe = Classe.B ;
        }else if (Number(this.clientNotation.pd)  >0.2 && Number(this.clientNotation.pd) <=  0.3){
          this.clientNotation.classe = Classe.C ;
        }else {
          this.clientNotation.classe = Classe.D ;
        }
  
        this.clientNotation.notationDate = new Date();
        //this.clientNotation.id = clientNotation.id || 0;
        console.log("586 this.clientNotation.id = "+this.clientNotation.id);
  
        this.clientSegmentConfigService.getClientSegmentConfigByCode("PARTICULIERS").subscribe(
          res=>{
            this.clientSegmentConfig = res;
              if (this.clientNotation && this.clientSegmentConfig) {
              this.clientNotation.clientSegmentConfig = this.clientSegmentConfig;
              console.log(this.clientNotation.clientSegmentConfig.segmentCode);
            } else {
              console.log("clientNotation ou clientSegmentConfig est null");
            }
            if(this.clientNotation.clientSegmentConfig !=null)
              console.log(this.clientNotation.clientSegmentConfig.segmentCode);
            /*
            this.corporate.clientNotation = this.clientNotation;
            */
            this.clientNotation.scoringContractData = this.retail;
      
            console.log("this.clientNotation.scoringContractData = "+this.clientNotation.scoringContractData);
            console.log("596 this.clientNotation.id = " + this.clientNotation.id);
            console.log("this.retail.clientNotation.id = " + this.retail.clientNotation?.id);
    
      
            this.clientNotationService.editClientNotation(this.clientNotation).subscribe(
              res=>{
                console.log("edit ClientNOtation"+res);
                this.retail.clientNotation = this.clientNotation ; 
              }, 
              err=>{
                console.log(err);
              }
            ); 
          }, err=>{
            console.log(err);
          }
        ); 
  
        
        
      },err=>{
        console.log(err);
      }
    );
  
  
    this.isScored = true ;
    this.toast.success( "Calcul effectué avec succes !" );
    // Forcer la détection des changements
    //this.cdr.detectChanges();
  
    //this.retail.clientNotation = this.clientNotation;
  }
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
  
}
