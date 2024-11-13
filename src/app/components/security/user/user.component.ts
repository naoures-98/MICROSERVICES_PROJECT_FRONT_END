import { Component, OnInit } from '@angular/core';
import { User } from '../../../classes/User';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from '../../../services/jwt.service';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent  implements OnInit{
  users : User[]=[];
  user: User = new User();
  selectedUserId!: Number;

  registerForm!: FormGroup;


  //FILTRER LA LISTE DES users :
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 10; // Nombre d'éléments par page

  constructor(private route: ActivatedRoute, 
    private router: Router, public jwtService : JwtService,
    private fb : FormBuilder,
    private toast : NgToastService) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userCode: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {validator : this.passwordMathValidator});

    /*//Récupérer la liste des users
    this.jwtService.getAllJuridicalForm().subscribe(
      res=>{
      
        this.jForms=res;
    },
      err=>{console.log(err);

      }
    );*/


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
    console.log(this.registerForm.value);
    this.jwtService.register(this.registerForm.value).subscribe(
      res=>{
        console.log(res);

        this.toast.success('User '+res.userCode+' Created Successfully');
    },
      err=>{console.log(err);
        this.toast.danger('PROBLEM ERROR');

      }
    );
  }
  editUser(selectedUser : any){
    this.user.id = selectedUser.id;
    this.user.userCode = selectedUser.userCode;
    this.user.password = selectedUser.password;
  }
  onEditSubmit(){
   
  }
  openDeleteModal(id : Number) {
    this.selectedUserId = id;
  }
  confirmDelete() {

  }
}
