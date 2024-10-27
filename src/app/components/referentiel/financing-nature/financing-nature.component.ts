import { Component, OnInit } from '@angular/core';
import { FinancingNature } from '../../../classes/financing-nature';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancingNatureService } from '../../../services/financing-nature.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-financing-nature',
  templateUrl: './financing-nature.component.html',
  styleUrl: './financing-nature.component.css'
})
export class FinancingNatureComponent implements OnInit {
  finNatures : FinancingNature[]=[];
  finNature: FinancingNature = new FinancingNature();
  selectedfinNatureId!: Number;

  //FILTRER LA LISTE DES ACTIVITES :
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 10; // Nombre d'éléments par page

  constructor(private route: ActivatedRoute, 
    private router: Router, public financingNatureService : FinancingNatureService,
    private toast : NgToastService) { }
  ngOnInit(): void {
    //Récupérer la liste des secteurs d'activités
    this.financingNatureService.getAllFinancingNature().subscribe(
      res=>{
      
        this.finNatures=res;
    },
      err=>{console.log(err);

      }
    );
  }
  get filteredFinancingNature() {
    return this.finNatures.filter(finNature => 
      finNature.description.toLowerCase().includes(this.searchText.toLowerCase()) || 
      finNature.projectNature.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  // CREATION D UNE NOUVEAU SECTEUR
  onSubmit(){
    console.log(this.finNature);
    this.onAjoutFinancingNature();
  }
  onAjoutFinancingNature(){
    console.log("finNature code"+ this.finNature.projectNature);
    this.financingNatureService.createFinancingNature(this.finNature).subscribe( 
      res=>{
        this.toast.success( "Nature de Financement  ["+this.finNature.projectNature +"] ajoutée avec succès", "success " );
        this.ngOnInit();
        this.finNature= new FinancingNature();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de creation");
      console.log(err);});

  }
  // MODIFICATION D UNE ACTIVITE
  editFinancingNature(selectedFinNature : any){
    this.finNature.id = selectedFinNature.id;
    this.finNature.projectNature = selectedFinNature.projectNature;
    this.finNature.description = selectedFinNature.description;
  }
  onEditSubmit(){
    console.log("finNature code"+ this.finNature.projectNature);
    this.financingNatureService.editFinancingNature(this.finNature).subscribe( 
      res=>{
        //this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:'5000', position:'topCenter'});
        // Ensuite, fermez la modale
        this.toast.success( "Nature de Financement ["+this.finNature.projectNature +"] modifiée avec succès", "success " );
        
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
    this.selectedfinNatureId = id;
  }
  confirmDelete() {
    this.financingNatureService.deleteFinancingNature(this.selectedfinNatureId).subscribe( 
      res=>{
        this.toast.success( "Nature de Financement  supprimée avec succès", "success " );
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
