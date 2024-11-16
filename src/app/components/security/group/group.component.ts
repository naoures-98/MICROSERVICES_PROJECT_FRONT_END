import { Component, OnInit } from '@angular/core';
import { Group } from '../../../classes/group';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../../services/group.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit {

  groups : Group[]=[];
  group: Group = new Group();
  selectedGroupId!: Number;

  //FILTRER LA LISTE DES ACTIVITES :
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 10; // Nombre d'éléments par page

  constructor(private route: ActivatedRoute, 
    private router: Router, public groupService : GroupService,
    private toast : NgToastService) { }
  ngOnInit(): void {
    
    //Récupérer la liste des secteurs d'activités
    this.groupService.getAllGroups().subscribe(
      res=>{
      
        this.groups=res;
    },
      err=>{console.log(err);

      }
    );
  }


  get filteredGroups() {
    return this.groups.filter(group => 
      group.groupName.toLowerCase().includes(this.searchText.toLowerCase()) 
    );
  }
  // CREATION D UNE NOUVEAU SECTEUR
  onSubmit(){
    console.log(this.group);
    this.onAjoutGroup();
  }
  onAjoutGroup(){
    console.log("group code"+ this.group.groupName);
    this.groupService.createNewGroup(this.group).subscribe( 
      res=>{
        this.toast.success( "Groupe ["+this.group.groupName +"] ajouté avec succès", "success " );
        this.ngOnInit();
        this.group= new Group();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de creation");
      console.log(err);});

  }
  // MODIFICATION D UNE ACTIVITE
  editGroup(selectedGroup : any){
    this.group.id = selectedGroup.id;
    this.group.groupName = selectedGroup.groupName;
  }
  onEditSubmit(){
    console.log("group code"+ this.group.groupName);
    this.groupService.editGroup(this.group).subscribe( 
      res=>{
        //this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:'5000', position:'topCenter'});
        // Ensuite, fermez la modale
        this.toast.success( "Groupe ["+this.group.groupName +"] modifié avec succès", "success " );
        
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
    this.selectedGroupId = id;
  }
  confirmDelete() {
    this.groupService.deleteGroup(this.selectedGroupId).subscribe( 
      res=>{
        this.toast.success( "Groupe  supprimé avec succès", "success " );
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
