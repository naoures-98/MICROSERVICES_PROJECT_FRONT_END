import { Component, OnInit } from '@angular/core';
import { User } from '../../../classes/User';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from '../../../services/jwt.service';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { Group } from '../../../classes/group';
import { OraganizationUserService } from '../../../services/oraganization-user.service';
import { OrganizationUser } from '../../../classes/organization-user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent  implements OnInit{
  users : User[]=[];
  user: User = new User();
  organizationUser : OrganizationUser = new OrganizationUser();
  selectedUserId!: Number;
  selectedRoleId:  number | null = null;
  groups : Group[]=[];
  group : Group = new Group();


 // registerForm!: FormGroup;
 // editForm!: FormGroup;

  //FILTRER LA LISTE DES users :
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 10; // Nombre d'éléments par page

  constructor(private route: ActivatedRoute, 
    private router: Router, public jwtService : JwtService,
    public orgUserService : OraganizationUserService,
    private fb : FormBuilder,
    public groupService : GroupService,
    //public organizationUserService : OraganizationUserService,
    private toast : NgToastService) { }
  ngOnInit(): void {
    this.loadRoles();
    // Initialisation des formulaires
    /*this.registerForm = this.fb.group({
      userCode: ['', Validators.required],

      selectedRoleId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      matricule: ['', Validators.required],
      userName: ['', Validators.required],
      userFunction: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required]
    });*/
    // Initialisation des formulaires
    /*this.editForm = this.fb.group({
      userCode: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      matricule: ['', Validators.required],
      userName: ['', Validators.required],
      userFunction: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required]
    });*/
    //Récupérer la liste des users
    this.jwtService.getAllUsers().subscribe(
      res=>{
      
        this.users=res;
    },
      err=>{console.log(err);

      }
    );
    

  }
  loadRoles(): void {
    this.groupService.getAllGroups().subscribe(groups => {
      this.groups = groups;
    });
  }


  passwordMathValidator(FormGroup : FormGroup)  {
    const password = FormGroup.get('password')?.value;
    const confirmPassword = FormGroup.get('confirmPassword')?.value;
    if(confirmPassword != password ){
      FormGroup.get('confirmPassword')?.setErrors({passwordMisMatch : true})
    }else {
      FormGroup.get('confirmPassword')?.setErrors(null)
    }
  }

  get filteredUsers() {
    return this.users.filter(user => 
      user.userCode.toLowerCase().includes(this.searchText.toLowerCase()) 
    );
  }


  submitForm(){
    console.log("selectedRoleId= "+ this.selectedRoleId);
    if (this.selectedRoleId != null)
      this.groupService.getGroupById(this.selectedRoleId).subscribe(group =>{
      this.group = group ; 
      this.user.group = group;
      console.log("group = "+this.group);
      this.jwtService.register(this.user).subscribe(
        res=>{
          console.log(res);
          console.log(res.id);
          
          this.jwtService.getUserById(res.id).subscribe(
            u=>{
              console.log(u);
              this.organizationUser.user = u
              this.orgUserService.createNewOrganizationUser(this.organizationUser).subscribe(
                res=>{
                  console.log(res);
              },
                err=>{console.log(err);          
                }
              );
          },
            err=>{console.log(err);
            }
          );
          this.toast.success('User '+res.userCode+' Created Successfully');
          this.ngOnInit();
      },
        err=>{console.log(err);
          this.toast.danger('PROBLEM ERROR');
  
        }
      );

    }, err => {console.log (err)});
    

  }
  editUser(selectedUser : any){
    this.user.id = selectedUser.id;
    this.user.userCode = selectedUser.userCode;
    this.selectedRoleId = selectedUser.group.id;
    this.user.group = selectedUser.group;
    this.user.password = selectedUser.password;
  }

  onEditSubmit(){
    console.log("selectedRoleId= "+ this.selectedRoleId);
    if (this.selectedRoleId != null){
      this.groupService.getGroupById(this.selectedRoleId).subscribe( 
        
        group=>{
          this.group = group ; 
          this.user.group = group;
          console.log("group = "+this.group);

          this.jwtService.editUser(this.user).subscribe(
            res=>{              
              this.toast.success('User '+this.user.userCode+' modified Successfully');
          },
            err=>{console.log(err);
              this.toast.danger('PROBLEM ERROR');
      
            }
          );
          this.ngOnInit();
        }, 
      err=>{
        this.toast.danger("Problem de modification",err);
        console.log(err);});    
    }
  }



/*  onEditSubmit(){
    console.log("selectedRoleId= "+ this.selectedRoleId);
    if (this.selectedRoleId != null)
      this.groupService.getGroupById(this.selectedRoleId).subscribe(group =>{
      this.group = group ; 
      this.user.group = group;
      console.log("group = "+this.group);
      this.jwtService.editUser(this.user).subscribe(
        res=>{
          console.log(res);
          console.log(res.id);
          
          this.toast.success('User '+res.userCode+' Created Successfully');
      },
        err=>{console.log(err);
          this.toast.danger('PROBLEM ERROR');
  
        }
      );

    }, err => {console.log (err)});   
  }*/
  openDeleteModal(id : Number) {
    this.selectedUserId = id;
  }
  confirmDelete() {

  }
}
