import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwt'); // Vérifiez si le JWT est présent
    if (token) {
      return true; // Autoriser l'accès
    } else {
      this.router.navigate(['/login']); // Redirigez vers la page de connexion si non authentifié
      return false;
    }
  }
}
