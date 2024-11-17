import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JuridicalForm } from '../classes/juridical-form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuridicalFormService {

  constructor( private http : HttpClient ) { }
  private urlJuridicalForm = 'http://localhost:8222/Referentiel/JuridicalForm';
  private urlJurid = 'http://localhost:8071/Referentiel/JuridicalForm';

  /*private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('jwt');
    if(jwtToken){
      return new HttpHeaders().set('Authorization', 'Bearer '+jwtToken);
    }else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }*/
    private createAuthorizationHeader() {
      const userData = localStorage.getItem('jwt');
      if (!userData) return new HttpHeaders();
  
      try {
        const parsedData = JSON.parse(userData);
        console.log("parsedData.jwtToken = "+parsedData.jwtToken);
        const jwtToken = parsedData.jwtToken;
        return new HttpHeaders().set('Authorization', 'Bearer '+jwtToken);
      }     
       catch (error) {
        console.error('Error parsing JWT:', error);
        return new HttpHeaders();
      }
    }
  createNewJuridicalForm(juridical : JuridicalForm ){
    console.log(juridical.description);
    return this.http.post(this.urlJuridicalForm,juridical, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllJuridicalForm(): Observable<JuridicalForm[]> {
    return this.http.get<JuridicalForm[]>(this.urlJuridicalForm, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  deleteJuridicalForm( id : Number ) {
    return this.http.delete(this.urlJuridicalForm+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getJuridicalFormById( id : Number){
    return this.http.get(this.urlJuridicalForm+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editJuridicalForm( branch : JuridicalForm){
    return this.http.put(this.urlJuridicalForm, branch, {
      headers:this.createAuthorizationHeader()
      
    });
  }
}
