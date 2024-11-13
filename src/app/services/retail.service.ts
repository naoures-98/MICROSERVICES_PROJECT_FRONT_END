import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Retail } from '../classes/retail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetailService {

  constructor(private http : HttpClient) { }
  private urlRetail= 'http://localhost:8222/Scoring/Retail';
  private urlRet = 'http://localhost:8091/Scoring/Retail';

  private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('jwt');
    if(jwtToken){
      return new HttpHeaders().set('Authorization', 'Bearer '+jwtToken);
    }else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }
  
  createNewClientRetail(retail : Retail ){
    console.log(retail.firstName);
    return this.http.post(this.urlRetail,retail, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllClientsRetail(): Observable<Retail[]> {
    return this.http.get<Retail[]>(this.urlRetail, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getDetailsRetail(id : Number ): Observable<Retail> {
    return this.http.get<Retail>(this.urlRetail+"/findRetailWithAllRelations/"+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  deleteClientRetail( id : Number ) {
    return this.http.delete(this.urlRetail+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getClientRetailById( id : Number){
    return this.http.get(this.urlRetail+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editClientRetail( retail : Retail){
    return this.http.put(this.urlRetail, retail, {
      headers:this.createAuthorizationHeader()
      
    });
  }
}
