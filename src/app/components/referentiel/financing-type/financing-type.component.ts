import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancingNatureService } from '../../../services/financing-nature.service';
import { NgToastService } from 'ng-angular-popup';
import { FinancingTypeService } from '../../../services/financing-type.service';
import { FinancingType } from '../../../classes/financing-type';
import { FinancingNature } from '../../../classes/financing-nature';

@Component({
  selector: 'app-financing-type',
  templateUrl: './financing-type.component.html',
  styleUrl: './financing-type.component.css'
}) 
export class FinancingTypeComponent implements OnInit{
  finTypes : FinancingType[]=[];
  financingNatures : FinancingNature[]=[];
  financingNature = new FinancingNature();
  finType: FinancingType = new FinancingType();
  selectedfinTypeId!: Number;

  selectedFinancingNatureId:  number | null = null;
  
  //FILTRER LA LISTE DES ACTIVITES :
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 10; // Nombre d'éléments par page
  
  constructor(private route: ActivatedRoute, 
    private router: Router, public financingNatureService : FinancingNatureService,
    public financingTypeService : FinancingTypeService,
    private toast : NgToastService) { }

  ngOnInit(): void {
    this.loadFinancingNatures();
    //Récupérer la liste des secteurs d'activités
    this.financingTypeService.getAllFinancingType().subscribe(
      res=>{
      
        this.finTypes=res;
    },
      err=>{console.log(err);

      }
    );
  }

  loadFinancingNatures(): void {
    this.financingNatureService.getAllFinancingNature().subscribe(natures => {
      this.financingNatures = natures;
    });
  }


  get filteredFinancingType() {
    return this.finTypes.filter(finType => 
        (finType.financingTypeCode?.toLowerCase().includes(this.searchText.toLowerCase()) || 
        finType.description?.toLowerCase().includes(this.searchText.toLowerCase()))
    );
}
  // CREATION D UNE NOUVEAU SECTEUR
  onSubmit(){
    console.log(this.finType);
    console.log("finType code = "+ this.finType.financingTypeCode);
    console.log("selectedFinancingNatureId = "+ this.selectedFinancingNatureId);
    if(this.selectedFinancingNatureId!=null)
      this.financingNatureService.getFinancingNatureById(this.selectedFinancingNatureId).subscribe( 
      res=>{
        //this.toast.success( "Type de Financement  ["+this.finType.financingTypeCode +"] ajoutée avec succès", "success " );
        //this.ngOnInit();
        this.financingNature= res;
        this.finType.financingNature=this.financingNature;
        console.log(res);
        console.log(this.financingNature);
        console.log(this.finType);
      }, 
    err=>{
      console.log(err);});
    this.onAjoutFinancingType();
  }
  onAjoutFinancingType(){
    this.financingTypeService.createFinancingType(this.finType).subscribe( 
      res=>{
        this.toast.success( "Type de Financement  ["+this.finType.financingTypeCode +"] ajoutée avec succès", "success " );
        this.ngOnInit();
        this.finType= new FinancingType();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de creation");
      console.log(err);});

  }
  // MODIFICATION D UNE ACTIVITE
  editFinancingType(selectedFinType : any){
    this.finType.id = selectedFinType.id;
    this.finType.financingTypeCode = selectedFinType.financingTypeCode;
    this.finType.description = selectedFinType.description;
    this.finType.financingNature = selectedFinType.financingNature; // Assurez-vous que cela contient l'objet complet
    this.selectedFinancingNatureId = selectedFinType.financingNature.id; 
  }
  onEditSubmit(){
    if(this.selectedFinancingNatureId!=null)
      this.financingNatureService.getFinancingNatureById(this.selectedFinancingNatureId).subscribe( 
      res=>{
        //this.toast.success( "Type de Financement  ["+this.finType.financingTypeCode +"] ajoutée avec succès", "success " );
        //this.ngOnInit();
        this.financingNature= res;
      }, 
    err=>{
      console.log("error = "+err);});

      this.finType.financingNature=this.financingNature;

    this.financingTypeService.editFinancingType(this.finType).subscribe( 
      res=>{
        //this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:'5000', position:'topCenter'});
        // Ensuite, fermez la modale
        this.toast.success( "Type de Financement ["+this.finType.financingTypeCode +"] modifiée avec succès", "success " );
        
        //this.closeModal();
        //this.goToBranchList()
        this.ngOnInit();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de modification",err);
      console.log(err);});    
  }

  // SUPPRESSION D'UNE ACTIVITE
  openDeleteModal(id : Number) {
    this.selectedfinTypeId = id;
  }
  confirmDelete() {
    this.financingTypeService.deleteFinancingType(this.selectedfinTypeId).subscribe( 
      res=>{
        this.toast.success( "Type de Financement  supprimée avec succès", "success " );
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
