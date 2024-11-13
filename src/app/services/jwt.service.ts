import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http : HttpClient,private toast : NgToastService,private router: Router ) { }

  private urlSecurity = 'http://localhost:8222/Security/auth';
  private urlSec= 'http://localhost:8081/Security/auth';


  register(user : any) : Observable<any> {
    return this.http.post(this.urlSecurity+'/register',user);
  }

  logout() {
    this.http.post(this.urlSecurity+'/logout', {}, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log('Réponse du serveur:', response); // Affiche "Déconnexion réussie."
        this.toast.success('Déconnexion réussie.');
        localStorage.removeItem('jwt');
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
        this.toast.danger('Erreur lors de la déconnexion.');
      }
    });
  }
  
  /*logout(): Observable<void> {
    return this.http.post<void>(this.urlSecurity+'/logout', {},  {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }*/
  
  login(user: any): Observable<string> {
    return this.http.post(this.urlSecurity + '/token', user, {
      responseType: 'text', // Spécifiez que la réponse est du texte brut
    });
  }
}
