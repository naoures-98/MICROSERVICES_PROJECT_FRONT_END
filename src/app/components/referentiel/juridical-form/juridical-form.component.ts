import { Component, OnInit } from '@angular/core';
import { JuridicalForm } from '../../../classes/juridical-form';
import { ActivatedRoute, Router } from '@angular/router';
import { JuridicalFormService } from '../../../services/juridical-form.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-juridical-form',
  templateUrl: './juridical-form.component.html',
  styleUrl: './juridical-form.component.css'
})
export class JuridicalFormComponent  implements OnInit{

  jForms : JuridicalForm[]=[];
  jForm: JuridicalForm = new JuridicalForm();
  selectedJFormId!: Number;

  //FILTRER LA LISTE DES ACTIVITES :
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 10; // Nombre d'éléments par page

  constructor(private route: ActivatedRoute, 
    private router: Router, public jFormService : JuridicalFormService,
    private toast : NgToastService) { }
  ngOnInit(): void {
    //Récupérer la liste des secteurs d'activités
    this.jFormService.getAllJuridicalForm().subscribe(
      res=>{
      
        this.jForms=res;
    },
      err=>{console.log(err);

      }
    );
  }
  get filteredJForms() {
    return this.jForms.filter(jForm => 
      jForm.juridicalFormCode.toLowerCase().includes(this.searchText.toLowerCase()) || 
      jForm.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  // CREATION D UNe nouvelle forme juridique
  onSubmit(){
    console.log(this.jForm);
    this.onAjoutJForm();
  }
  onAjoutJForm(){
    console.log("jForm code"+ this.jForm.juridicalFormCode);
    this.jFormService.createNewJuridicalForm(this.jForm).subscribe( 
      res=>{
        this.toast.success( "Forme Juridique  ["+this.jForm.juridicalFormCode +"] ajoutée avec succès", "success " );
        this.ngOnInit();
        this.jForm= new JuridicalForm();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de creation");
      console.log(err);});

  }
  // MODIFICATION D UNE ACTIVITE
  editJForm(selectedJForm : any){
    this.jForm.id = selectedJForm.id;
    this.jForm.juridicalFormCode = selectedJForm.juridicalFormCode;
    this.jForm.description = selectedJForm.description;
  }
  onEditSubmit(){
    console.log("jForm code"+ this.jForm.juridicalFormCode);
    this.jFormService.editJuridicalForm(this.jForm).subscribe( 
      res=>{
        //this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:'5000', position:'topCenter'});
        // Ensuite, fermez la modale
        this.toast.success( "Forme juridique ["+this.jForm.juridicalFormCode +"] modifiée avec succès", "success " );
        
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
    this.selectedJFormId = id;
  }
  confirmDelete() {
    this.jFormService.deleteJuridicalForm(this.selectedJFormId).subscribe( 
      res=>{
        this.toast.success( "Forme juridique  supprimée avec succès", "success " );
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
