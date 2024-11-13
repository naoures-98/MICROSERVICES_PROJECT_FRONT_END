import { Injectable } from '@angular/core';
import { Corporate } from '../classes/corporate';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorporateService {

  constructor(private http : HttpClient) { }
  private urlCorporate= 'http://localhost:8222/Scoring/Corporate';
  private urlCorpo = 'http://localhost:8091/Scoring/Corporate';

  private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('jwt');
    if(jwtToken){
      return new HttpHeaders().set('Authorization', 'Bearer '+jwtToken);
    }else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }
  
  createNewClientCorpo(corpo : Corporate ){
    console.log(corpo.raisonSocial);
    return this.http.post(this.urlCorporate,corpo, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllClientsCorpo(): Observable<Corporate[]> {
    return this.http.get<Corporate[]>(this.urlCorporate, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getDetailsCorporate(id : Number ): Observable<Corporate> {
    return this.http.get<Corporate>(this.urlCorporate+"/findCorporateWithAllRelations/"+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  deleteClientCorporate( id : Number ) {
    return this.http.delete(this.urlCorporate+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getClientCorporateById( id : Number){
    return this.http.get(this.urlCorporate+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editClientCorporate( corpo : Corporate){
    return this.http.put(this.urlCorporate, corpo, {
      headers:this.createAuthorizationHeader()
      
    });
  }
}
