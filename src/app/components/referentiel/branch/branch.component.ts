import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../services/branch.service';
import { Branch } from '../../../classes/branch';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import * as bootstrap from 'bootstrap';
import * as XLSX from 'xlsx';

@Component({ 
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent implements OnInit {
  
  branch: Branch = new Branch();
  branchs: Branch[]=[];
  selectedBranchId!: number;
  //branch! : Branch;
  /* {
    branchCode: '',
    name: '',
    description:''
  }*/
  constructor(private route: ActivatedRoute, 
    private router: Router, public branchService : BranchService,
    private toast : NgToastService) { 
      
  }

  ngOnInit(): void {

    this.branchService.getAllBranchs().subscribe(
      res=>{
      
        this.branchs=res;
    },
      err=>{console.log(err);

      }
    );
  }
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 10; // Nombre d'éléments par page


  get filteredBranchs() {
    return this.branchs.filter(branch => 
      branch.branchCode.toLowerCase().includes(this.searchText.toLowerCase()) || 
      branch.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  onSubmit(){
    console.log(this.branch);
    this.onAjoutBranch();
  }
  onAjoutBranch(){
    console.log("branch code"+ this.branch.branchCode);
    this.branchService.createNewBranch(this.branch).subscribe( 
      res=>{
        //this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:'5000', position:'topCenter'});
        // Ensuite, fermez la modale
        this.toast.success( "Branch ["+this.branch.branchCode +"] ajoutée avec succès", "success " );
        //this.closeModal();
        //this.goToBranchList()
        this.ngOnInit();
        this.branch= new Branch();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de creation");
      console.log(err);});

  }
  editBranch(selectedBranch: any) {
    this.branch.id = selectedBranch.id;
    this.branch.branchCode = selectedBranch.branchCode;
    this.branch.name = selectedBranch.name;
    this.branch.description = selectedBranch.description;
  }
  onEditBranch(){
    console.log("branch code"+ this.branch.branchCode);
    this.branchService.editBranch(this.branch).subscribe( 
      res=>{
        //this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:'5000', position:'topCenter'});
        // Ensuite, fermez la modale
        this.toast.success( "Branch ["+this.branch.branchCode +"] modifiée avec succès", "success " );
        
        //this.closeModal();
        //this.goToBranchList()
        this.ngOnInit();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de modification",err);
      console.log(err);});

  }

  closeModal() {
    const modalElement = document.getElementById('agencyModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
  
  
  goToBranchList(){
    this.router.navigate(['/branch']);
  }

  onEditSubmit(){
    console.log(this.branch);
    this.onEditBranch();
  }
  openDeleteModal(branchId: number) {
    this.selectedBranchId = branchId;
  }
  confirmDelete() {
    this.branchService.deleteBranch(this.selectedBranchId).subscribe( 
      res=>{
        this.toast.success( "Branch  supprimée avec succès", "success " );
      // Fermez le modal de confirmation
      const modalElement = document.getElementById('confirmDeleteModal');
      /*if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }*/
        this.ngOnInit();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de suppression",err);
      console.log(err);});
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
  
      // Suppose que les données sont dans la première feuille
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet);

      console.log("data import = "+data[0]);
      this.importData(data);
    };
  
    reader.readAsBinaryString(file);
  }
  importData(data: any[]) {
    this.branchService.createNewBranch(this.branch).subscribe(
      res => {
        console.log('Agences importées avec succès', res);
        this.toast.success( "Liste importée  avec succès", "success " );
        // Rafraîchir la liste des agences si nécessaire
        this.ngOnInit();
      },
      error => {
        console.error('Erreur lors de l\'importation des agences', error);
      }
    );

    this.branchService.createNewBranch(this.branch).subscribe( 
      res=>{
        //this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:'5000', position:'topCenter'});
        // Ensuite, fermez la modale
        this.toast.success( "Branch ["+this.branch.branchCode +"] est ajoutée avec succès", "success " );
        //this.closeModal();
        //this.goToBranchList()
        this.ngOnInit();
        this.branch= new Branch();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de creation");
      console.log(err);});

  }
  

}
