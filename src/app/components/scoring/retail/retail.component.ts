import { Component, OnInit } from '@angular/core';
import { Retail } from '../../../classes/retail';
import { ActivatedRoute, Router } from '@angular/router';
import { RetailService } from '../../../services/retail.service';
import { NgToastService } from 'ng-angular-popup';
import { Civility, EmployementStatus, FamilySituation, FamilySituationDisplay, Gender } from '../../../classes/enum';
import { FinancingType } from '../../../classes/financing-type';
import { FinancingTypeService } from '../../../services/financing-type.service';
import { BranchService } from '../../../services/branch.service';
import { Branch } from '../../../classes/branch';
import { ActivitySector } from '../../../classes/activity-sector';
import { ActivitySectorService } from '../../../services/activity-sector.service';

@Component({
  selector: 'app-retail',
  templateUrl: './retail.component.html',
  styleUrl: './retail.component.css'
})
export class RetailComponent implements OnInit {
  retails : Retail[]=[];
  retail: Retail = new Retail();
  selectedRetailId!: Number;
  //branchDescription : String = "";
  financingTypes : FinancingType[]=[];
  activities : ActivitySector[]=[];
  branchs : Branch[]=[];
  branch: Branch = new Branch();
  financingType = new FinancingType();

  lastSequentialNumber = 0; // Variable pour garder la trace du dernier nombre séquentiel


  //FILTRER LA LISTE DES ACTIVITES :
  
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 10; // Nombre d'éléments par page

  constructor(private route: ActivatedRoute, 
    private router: Router, public retailService : RetailService,
    public financingTypeService : FinancingTypeService,
    public branchService: BranchService,
    private activitySectorService : ActivitySectorService,
    private toast : NgToastService) { }
  ngOnInit(): void {
    this.retail.year = new Date().getFullYear();
    this.loadFinancingTypes();
    this.loadBranchs();
    this.loadActivitiesSector();
    //Récupérer la liste des secteurs d'activités
    this.retailService.getAllClientsRetail().subscribe(
      res=>{
        this.retails=res;
    },
      err=>{console.log(err);
      }
    );
  }
// Méthode pour changer la civilité
onCivilityChange(selectedCivility: string) {
  if (selectedCivility === 'MADAME' || selectedCivility === 'MADEMOISELLE') {
    this.retail.gender = Gender.Femme; // Utilisation de l'énumération
  } else {
    this.retail.gender = Gender.Homme; // Utilisation de l'énumération
  }

  if (selectedCivility === 'MADEMOISELLE') {
    this.retail.familySituation = FamilySituation.CELIBATAIRE;
  } else if (selectedCivility === 'MADAME') {
    this.retail.familySituation = FamilySituation.MARIE;
  }else{
    this.retail.familySituation = null;
  }
}
// Méthode pour calculer l'âge lors du changement de la date de naissance
onBirthDateChange(birthDate: string): void {
  if (birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // Ajustement si l'anniversaire n'est pas encore arrivé cette année
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    // Mise à jour de l'âge dans le modèle
    this.retail.age = age;
  }
}

onEmployementEntryDateChange(entryDate: string): void {
  if (entryDate) {
    const date = new Date(entryDate);
    const today = new Date();
    let nb = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();

    // Ajustement si l'anniversaire n'est pas encore arrivé cette année
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      nb--;
    }

    // Mise à jour de l'âge dans le modèle
    this.retail.nbYearExperience = nb;
  }
}

onRevenueChange( montant: number): void {
  if (montant !=null && montant > 0) {
    this.retail.deptRatio = ((this.retail.echeance==null ? 0 : this.retail.echeance)/montant)*100;
  }else {
    this.retail.deptRatio = 0;
  }
}
onEcheanceChange( montant: number): void {

  if (montant !=null && this.retail.revenu!=null &&  this.retail.revenu > 0) {
    this.retail.deptRatio = ((montant)/this.retail.revenu)*100;
  }else {
    this.retail.deptRatio = 0;
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
    this.retail.seniorityRelation = nb;
  }
}
onActivitySectorChange(selectedActivitySectorCode: string) {
  console.log("selectedActivitySectorCode = "+ selectedActivitySectorCode);
  // Recherche de l'agence correspondant au code sélectionné
  const selectedActivitySector= this.activities.find(activitySector => 
    activitySector.code === selectedActivitySectorCode);

  // Si une agence est trouvée, met à jour la description (nom)
  if (selectedActivitySector) {
    this.retail.activitySector =selectedActivitySector;
    this.retail.activitySectorId = selectedActivitySector.id;
  }
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
  onBranchCodeChange(selectedBranchId: any) {
    // Convertir en number si nécessaire pour assurer une comparaison correcte
    const selectedBranch = this.branchs.find(branch => Number(branch.id) === Number(selectedBranchId));
    
    // Si une agence est trouvée, met à jour la description (nom)
    if (selectedBranch) {
      this.retail.branch = { ...selectedBranch };
      this.retail.branchId = selectedBranch.id;
      // Cloner l'objet sélectionné pour éviter les problèmes de référence
      console.log("selectedBranch.branchCode = " + selectedBranch.branchCode);
    }
    console.log("branchcode = " + this.retail.branch.branchCode);
  }

  onFinancingTypeChange(selectedFinancingTypeCode: string) {
    // Recherche de l'agence correspondant au code sélectionné
    const selectedFinancingType= this.financingTypes.find(financingType => 
      financingType.financingTypeCode === selectedFinancingTypeCode);

    // Si une agence est trouvée, met à jour la description (nom)
    if (selectedFinancingType) {
      this.retail.financingTypeId = selectedFinancingType.id;
    }
  }
  //filter par la barre de recherche
  get filteredRetails() {
    return this.retails.filter(retail => 
      (retail.firstName!=null ? retail.firstName.toLowerCase().includes(this.searchText.toLowerCase()):true) ||
      (retail.lastName!=null ? retail.lastName.toLowerCase().includes(this.searchText.toLowerCase()) : true) ||
      (retail.contractReference!=null ? retail.contractReference.toLowerCase().includes(this.searchText.toLowerCase()) : true) 
    );
  }
  // Méthode pour générer la référence de demande
generateContractReference(lastSequentialNumber : String): void {
  // Construire la référence demande
  const year = this.retail.year; // Supposons que year est déjà défini dans retail
  const clientIdentifier = this.retail.clientRequest; // Identifiant Client
  console.log("this.retail.branch.branchCode ="+this.retail.branch.branchCode);
  const agence = this.retail.branch.branchCode;
  this.retail.contractReference = `${year}|${agence}|${clientIdentifier}|${lastSequentialNumber}`; // Format souhaité

}
  // CREATION D UNE NOUVELLE PERSONNE PHYSIQUE 
  onSubmit(){
    // Générer le nombre séquentiel
    this.lastSequentialNumber = this.lastSequentialNumber+1; // Incrémentez le nombre séquentiel
    const sequentialNumber = this.lastSequentialNumber.toString(); // Convertir en chaîne de caractères si nécessaire

    this.generateContractReference(sequentialNumber);
    console.log(this.retail);
    this.onAjoutRetail();
  }
  onAjoutRetail(){
  
    this.retailService.createNewClientRetail(this.retail).subscribe( 
      res=>{
        this.toast.success( "Client ["+this.retail.clientRequest +"] ajoutée avec succès", "success " );
        this.ngOnInit();
        this.retail= new Retail();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de creation");
      console.log(err);});
  }

  showDetails(selectedRetail : any){
    this.retailService.getDetailsRetail(selectedRetail.id).subscribe(
      res=>{
        this.retail=res;
    },
      err=>{console.log(err);

      }
    );
  }
  get civilityOptions() {
    return Object.values(Civility);
  }
  get genderOptions() {
    return Object.values(Gender);
  }
  get familySituationOptions() {
    return Object.values(FamilySituation);
  }
  get familySituationDisplay() {
    return FamilySituationDisplay;
  }
  get emploiStatusOptions() {
    return Object.values(EmployementStatus);
  }

  // MODIFICATION D UNE ACTIVITE
  editRetail(selectedRetail : any){
    this.retailService.getDetailsRetail(selectedRetail.id).subscribe(
      res=>{
        this.retail=res;
        this.retail.id = selectedRetail.id;
        this.retail.branchId =this.retail.branch.id ;
        if(this.retail.activitySector !=null)
          this.retail.activitySectorId =this.retail.activitySector.id ;
        else{
          this.retail.activitySector = new ActivitySector();
        }
        this.retail.financingTypeId =this.retail.financingType.id ;
    },
      err=>{console.log(err);
      }
    );   
  }
  onEditSubmit(){
    if(this.retail.financingType!=null){
      this.financingTypeService.getFinancingTypeByCode(this.retail.financingType.financingTypeCode).subscribe( 
        res=>{
          this.financingType = res;
          this.retail.financingType=this.financingType;
          this.retail.financingTypeId=this.financingType.id;
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
    this.ngOnInit();
  }
  // SUPPRESSION D'UNE ACTIVITE
  openDeleteModal(id : Number) {
    this.selectedRetailId = id;
  }
  
  confirmDelete() {
    this.retailService.deleteClientRetail(this.selectedRetailId).subscribe( 
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
} 
