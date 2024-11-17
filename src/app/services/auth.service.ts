import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  getUserRoles(): string[] {
    const userData = localStorage.getItem('jwt');
    if (!userData) return [];

    try {
      const parsedData = JSON.parse(userData);
      const jwtToken = parsedData.jwtToken;
      const payload = JSON.parse(atob(jwtToken.split('.')[1])); // Décoder le JWT
      //console.log(payload);
      return payload.roles || [];
      
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return [];
    }
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }
}
