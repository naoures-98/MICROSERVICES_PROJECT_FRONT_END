import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../classes/branch';
@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor( private http : HttpClient ) { }
  private urlReferentiel = 'http://localhost:8222/Referentiel/Branchs';
  private urlRef = 'http://localhost:8071/Referentiel/Branchs';


  /*private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('jwt');
    if(jwtToken){
      return new HttpHeaders().set('Authorization', 'Bearer '+jwtToken);
    }else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }*/
    /*private createAuthorizationHeader() {
      const jwtToken = localStorage.getItem('jwt');
      let headers = new HttpHeaders();
    
      if (jwtToken) {
        headers = headers.set('Authorization', 'Bearer ' + jwtToken);
      } else {
        console.log("JWT token not found in local storage");
      }
    
      // Ajouter l'en-tête CORS
      //headers = headers.set('Access-Control-Allow-Origin', '*');
    
      return headers;
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
  createNewBranch(branch : Branch ){
    console.log(branch.name);
    return this.http.post(this.urlReferentiel,branch, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllBranchs(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.urlReferentiel, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  deleteBranch( id : Number ) {
    return this.http.delete(this.urlReferentiel+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getBranchById( id : Number){
    return this.http.get<Branch>(this.urlReferentiel+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editBranch( branch : Branch){
    return this.http.put(this.urlReferentiel, branch, {
      headers:this.createAuthorizationHeader()
      
    });
  }
}
