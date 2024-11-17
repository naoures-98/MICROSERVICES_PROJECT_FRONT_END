import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorporateService } from '../../../services/corporate.service';
import { BranchService } from '../../../services/branch.service';
import { NgToastService } from 'ng-angular-popup';
import { Corporate } from '../../../classes/corporate';
import { FinancingType } from '../../../classes/financing-type';
import { FinancingTypeService } from '../../../services/financing-type.service';
import { Branch } from '../../../classes/branch';
import { ClientCategory } from '../../../classes/enum';
import { JuridicalForm } from '../../../classes/juridical-form';
import { JuridicalFormService } from '../../../services/juridical-form.service';
import { ActivitySectorService } from '../../../services/activity-sector.service';
import { ActivitySector } from '../../../classes/activity-sector';
import { Section } from '../../../classes/donnees-financieres';

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
  itemsPerPage: number = 10; // Nombre d'éléments par page

  lastSequentialNumber = 0; // Variable pour garder la trace du dernier nombre séquentiel

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
    // Recherche de l'agence correspondant au code sélectionné
    const selectedFinancingType= this.financingTypes.find(financingType => 
      financingType.financingTypeCode === selectedFinancingTypeCode);

    // Si une agence est trouvée, met à jour la description (nom)
    if (selectedFinancingType) {
      this.corporate.financingType =selectedFinancingType;
      this.corporate.financingTypeId = selectedFinancingType.id;
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
  getGlobalScore(): number {
    return this.sections.reduce((total, section) => total + section.totalScore, 0);
  }
  
  sections: Section[] = [
    {
      name: 'Rentabilité',
      rows: [
        {
          name: 'Rentabilité économique',
          ponderation: 20,
          borneInf: 0,
          borneSup: 30,
          norme: 15,
          scoreMin: 0,
          scoreMax: 20,
          valeurClient: null,
          score: 0,
          scorePondere: 0,
        },
        // Ajoutez d'autres lignes ici
      ],
      totalScore: 0,
    },
    {
      name: 'Rentabilité',
      rows: [
        {
          name: 'Rentabilité économique',
          ponderation: 20,
          borneInf: 0,
          borneSup: 30,
          norme: 15,
          scoreMin: 0,
          scoreMax: 20,
          valeurClient: null,
          score: 0,
          scorePondere: 0,
        },
        // Ajoutez d'autres lignes ici
      ],
      totalScore: 0,
    },
    // Ajoutez d'autres sections ici
  ];
    // Méthode pour calculer les scores (optionnelle)
    calculateScores(): void {
      this.sections.forEach((section) => {
        section.rows.forEach((row) => {
          // Logique de calcul basée sur "valeurClient", "borneInf", etc.
          row.score = Math.min(
            Math.max(row.valeurClient || 0, row.scoreMin),
            row.scoreMax
          );
          row.scorePondere = (row.score * row.ponderation) / 100;
        });
        section.totalScore = section.rows.reduce(
          (total, row) => total + row.scorePondere,
          0
        );
      });
    } 
    

}
