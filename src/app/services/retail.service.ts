import { HttpClient } from '@angular/common/http';
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


  
  createNewClientRetail(retail : Retail ){
    console.log(retail.firstName);
    return this.http.post(this.urlRet,retail);
  }

  getAllClientsRetail(): Observable<Retail[]> {
    return this.http.get<Retail[]>(this.urlRetail);
  }
  getDetailsRetail(id : Number ): Observable<Retail> {
    return this.http.get<Retail>(this.urlRetail+"/findRetailWithAllRelations/"+id);
  }
  deleteClientRetail( id : Number ) {
    return this.http.delete(this.urlRet+'/'+id);
  }
  getClientRetailById( id : Number){
    return this.http.get(this.urlRetail+id);
  }
  editClientRetail( retail : Retail){
    return this.http.put(this.urlRet, retail);
  }
}
