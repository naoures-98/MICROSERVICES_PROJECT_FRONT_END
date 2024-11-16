import { Component, OnInit } from '@angular/core';
import { OrganizationUser } from '../../../classes/organization-user';
import { ActivatedRoute, Router } from '@angular/router';
import { OraganizationUserService } from '../../../services/oraganization-user.service';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../../../classes/User';
import { JwtService } from '../../../services/jwt.service';

@Component({
  selector: 'app-organization-unit',
  templateUrl: './organization-unit.component.html',
  styleUrl: './organization-unit.component.css'
})
export class OrganizationUnitComponent  implements OnInit{
  orgUsers : OrganizationUser[]=[];
  users : User []=[];
  user : User = new User();
  orgUser: OrganizationUser = new OrganizationUser();
  selectedUserId!: Number;
  selectedUserCodeId!: Number;
  //FILTRER LA LISTE DES ACTIVITES :
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 10; // Nombre d'éléments par page

  constructor(private route: ActivatedRoute, 
    private router: Router, public orgUserService : OraganizationUserService,
    public userService : JwtService,
    private toast : NgToastService) { }
  ngOnInit(): void {
    this.loadUsers();
    //Récupérer la liste des secteurs d'activités
    this.orgUserService.getAllOrganizationUsers().subscribe(
      res=>{
      
        this.orgUsers=res;
    },
      err=>{console.log(err);

      }
    );
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  get filteredOrgUsers() {
    return this.orgUsers.filter(org => 
      org.matricule.toLowerCase().includes(this.searchText.toLowerCase())|| 
      org.userName.toLowerCase().includes(this.searchText.toLowerCase())

    );
  }

  edit(selectedUser : any){
    this.orgUser.id = selectedUser.id;
    this.orgUser.matricule = selectedUser.matricule;
    
    this.orgUser.user = selectedUser.user;
    this.selectedUserCodeId = selectedUser.user.id;
    this.orgUser.userName = selectedUser.userName;
    this.orgUser.userFunction = selectedUser.userFunction;
    this.orgUser.email = selectedUser.email;
    this.orgUser.telephone = selectedUser.telephone;
  }
  openDeleteModal(id : Number) {
    this.selectedUserId = id;
  }

  onEditSubmit(){
    console.log("orgUser code"+ this.orgUser);
    this.orgUserService.editOrganizationUser(this.orgUser).subscribe( 
      res=>{
        //this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:'5000', position:'topCenter'});
        // Ensuite, fermez la modale
        this.toast.success( "Personnel ["+this.orgUser.userName +"] est modifié avec succès", "success " );
        
        //this.closeModal();
        //this.goToBranchList()
        this.ngOnInit();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de modification",err);
      console.log(err);});    
  }
  submitForm(){
    console.log("selecteUserCodeId= "+ this.selectedUserCodeId);
    if (this.selectedUserCodeId != null){
      this.userService.getUserById(this.selectedUserCodeId).subscribe(user =>{
        this.user = user ; 
        this.orgUser.user = user;
        console.log("user = "+this.user);
        this.orgUserService.createNewOrganizationUser(this.orgUser).subscribe(
          res=>{
            this.toast.success( "Personnel ["+this.orgUser.userName +"] ajouté avec succès", "success " );
            this.ngOnInit();
            this.orgUser= new OrganizationUser();
            console.log(res);
    
          }, 
        err=>{
          this.toast.danger("Problem de creation");
          console.log(err);});
  
      }, err => {console.log (err)});
    }
  }

  confirmDelete() {
    this.orgUserService.deleteOrganizationUser(this.selectedUserId).subscribe( 
      res=>{
        this.toast.success( "Personnel  supprimé avec succès", "success " );
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
