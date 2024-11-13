import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancingNature } from '../classes/financing-nature';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancingNatureService {
  constructor( private http : HttpClient ) { }
  private urlFinancingNature = 'http://localhost:8222/Referentiel/FinancingNature';
  private urlFinNat = 'http://localhost:8071/Referentiel/FinancingNature';
  
  
  private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('jwt');
    if(jwtToken){
      return new HttpHeaders().set('Authorization', 'Bearer '+jwtToken);
    }else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }

  createFinancingNature(financingNature : FinancingNature ){
    console.log(financingNature.description);
    return this.http.post(this.urlFinancingNature,financingNature, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllFinancingNature(): Observable<FinancingNature[]> {
    return this.http.get<FinancingNature[]>(this.urlFinancingNature, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  deleteFinancingNature( id : Number ) {
    return this.http.delete(this.urlFinancingNature+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getFinancingNatureById( id : Number){
    return this.http.get<FinancingNature>(this.urlFinancingNature+"/"+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editFinancingNature( branch : FinancingNature){
    return this.http.put(this.urlFinancingNature, branch, {
      headers:this.createAuthorizationHeader()
      
    });
  }
}
