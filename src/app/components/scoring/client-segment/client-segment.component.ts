import { Component, OnInit } from '@angular/core';
import { ClientSegmentConfig } from '../../../classes/client-segment-config';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientSegmentConfigService } from '../../../services/client-segment-config.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-client-segment',
  templateUrl: './client-segment.component.html',
  styleUrl: './client-segment.component.css'
})
export class ClientSegmentComponent implements OnInit  {
  clientsSegConf : ClientSegmentConfig[]=[];
  cliSegConf: ClientSegmentConfig = new ClientSegmentConfig();
  selectedCliSegConfId!: Number;

  //FILTRER LA LISTE DES ACTIVITES :
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 10; // Nombre d'éléments par page

  constructor(private route: ActivatedRoute, 
    private router: Router, public cleintSegmentConfigService : ClientSegmentConfigService,
    private toast : NgToastService) { }
  ngOnInit(): void {
    //Récupérer la liste des secteurs d'activités
    this.cleintSegmentConfigService.getAllClientSegmentConfig().subscribe(
      res=>{
      
        this.clientsSegConf=res;
    },
      err=>{console.log(err);

      }
    );
  }
  get filteredClientSegmentConfig() {
    return this.clientsSegConf.filter(cliSegConf => 
      cliSegConf.segmentCode.toLowerCase().includes(this.searchText.toLowerCase()) || 
      cliSegConf.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  // CREATION D UNE NOUVEAU SECTEUR
  onSubmit(){
    console.log(this.cliSegConf);
    this.onAjoutClientSegmentConfig();
  }
  onAjoutClientSegmentConfig(){
    console.log("cliSegConf code"+ this.cliSegConf.segmentCode);
    this.cleintSegmentConfigService.createNewClientSegmentConfig(this.cliSegConf).subscribe( 
      res=>{
        this.toast.success( "Segment ["+this.cliSegConf.segmentCode +"] ajoutée avec succès", "success " );
        this.ngOnInit();
        this.cliSegConf= new ClientSegmentConfig();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de creation");
      console.log(err);});

  }
  // MODIFICATION D UNE ACTIVITE
  editClientSegmentConfig(selectedCliSegConf : any){
    this.cliSegConf.id = selectedCliSegConf.id;
    this.cliSegConf.segmentCode = selectedCliSegConf.segmentCode;
    this.cliSegConf.description = selectedCliSegConf.description;
  }
  onEditSubmit(){
    console.log("segment code"+ this.cliSegConf.segmentCode);
    this.cleintSegmentConfigService.editClientSegmentConfig(this.cliSegConf).subscribe( 
      res=>{
        //this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:'5000', position:'topCenter'});
        // Ensuite, fermez la modale
        this.toast.success( "Segment ["+this.cliSegConf.segmentCode +"] modifiée avec succès", "success " );
        
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
    this.selectedCliSegConfId = id;
  }
  confirmDelete() {
    this.cleintSegmentConfigService.deleteClientSegmentConfig(this.selectedCliSegConfId).subscribe( 
      res=>{
        this.toast.success( "Segment  supprimée avec succès", "success " );
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
