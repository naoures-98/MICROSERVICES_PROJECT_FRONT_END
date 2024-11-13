import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from '../../../services/jwt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{

  loginForm!: FormGroup;




  constructor(private route: ActivatedRoute, 
    private router: Router, public jwtService : JwtService,
    private fb : FormBuilder,
    private toast : NgToastService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userCode: ['', [Validators.required]],
      password: ['', [Validators.required]],
      
    });
  }

  submitForm(){
    console.log(this.loginForm.value);
    this.jwtService.login(this.loginForm.value).subscribe(
      (token: string) => {
        console.log('Jeton reçu:', token);
  
        // Stockez le jeton dans le localStorage
        localStorage.setItem('jwt', token);
        // Affichez un message de succès
        this.toast.success('Connexion réussie');
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        console.error('Erreur lors de la connexion:', err);
        this.toast.danger('Erreur lors de la connexion');
      }
    );
  }
}
