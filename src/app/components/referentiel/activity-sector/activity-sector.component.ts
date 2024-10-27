import { Component, OnInit } from '@angular/core';
import { ActivitySector } from '../../../classes/activity-sector';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ActivitySectorService } from '../../../services/activity-sector.service';

@Component({
  selector: 'app-activity-sector',
  templateUrl: './activity-sector.component.html',
  styleUrl: './activity-sector.component.css'
})
export class ActivitySectorComponent implements OnInit {
  
  activities : ActivitySector[]=[];
  activity: ActivitySector = new ActivitySector();
  selectedActivityId!: Number;

  //FILTRER LA LISTE DES ACTIVITES :
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 10; // Nombre d'éléments par page

  constructor(private route: ActivatedRoute, 
    private router: Router, public activityService : ActivitySectorService,
    private toast : NgToastService) { }
  ngOnInit(): void {
    //Récupérer la liste des secteurs d'activités
    this.activityService.getAllActivities().subscribe(
      res=>{
      
        this.activities=res;
    },
      err=>{console.log(err);

      }
    );
  }
  get filteredActivities() {
    return this.activities.filter(activity => 
      activity.code.toLowerCase().includes(this.searchText.toLowerCase()) || 
      activity.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  // CREATION D UNE NOUVEAU SECTEUR
  onSubmit(){
    console.log(this.activity);
    this.onAjoutActivite();
  }
  onAjoutActivite(){
    console.log("activity code"+ this.activity.code);
    this.activityService.createNewActivity(this.activity).subscribe( 
      res=>{
        this.toast.success( "Secteur ["+this.activity.code +"] ajoutée avec succès", "success " );
        this.ngOnInit();
        this.activity= new ActivitySector();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de creation");
      console.log(err);});

  }
  // MODIFICATION D UNE ACTIVITE
  editActivity(selectedActivity : any){
    this.activity.id = selectedActivity.id;
    this.activity.code = selectedActivity.code;
    this.activity.description = selectedActivity.description;
  }
  onEditSubmit(){
    console.log("secteur code"+ this.activity.code);
    this.activityService.editActivity(this.activity).subscribe( 
      res=>{
        //this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:'5000', position:'topCenter'});
        // Ensuite, fermez la modale
        this.toast.success( "Secteur ["+this.activity.code +"] modifiée avec succès", "success " );
        
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
    this.selectedActivityId = id;
  }
  confirmDelete() {
    this.activityService.deleteActivity(this.selectedActivityId).subscribe( 
      res=>{
        this.toast.success( "Secteur  supprimée avec succès", "success " );
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
