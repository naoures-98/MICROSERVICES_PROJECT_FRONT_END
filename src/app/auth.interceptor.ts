import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toast : NgToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt');
    
    if (token) {
      // Ajoute le jeton à chaque requête
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Si le serveur retourne 401 Unauthorized
          console.error('Token expiré ou invalide');
          
          // Supprimez le token local pour éviter des requêtes inutiles
          localStorage.removeItem('jwt');
          // Affichez un message d'erreur
          this.toast.danger('Votre session a expiré, veuillez vous reconnecter.');
          // Redirigez vers la page de connexion
          this.router.navigateByUrl('/login');
        }else if (error.status === 500 ) {
          // Si le serveur retourne 500 Internal Server Error
          console.error('Erreur interne du serveur');
          this.toast.danger('Session expirée');
          // Redirigez vers la page d'erreur
          this.router.navigateByUrl('/login');
        }
        return throwError(() => error); // Relance l'erreur pour un traitement global
      })
    );
  }
}
