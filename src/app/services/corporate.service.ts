import { Injectable } from '@angular/core';
import { Corporate } from '../classes/corporate';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorporateService {

  constructor(private http : HttpClient) { }
  private urlCorporate= 'http://localhost:8222/Scoring/Corporate';
  private urlCorpo = 'http://localhost:8091/Scoring/Corporate';


  
  createNewClientCorpo(corpo : Corporate ){
    console.log(corpo.raisonSocial);
    return this.http.post(this.urlCorpo,corpo);
  }

  getAllClientsCorpo(): Observable<Corporate[]> {
    return this.http.get<Corporate[]>(this.urlCorporate);
  }
  getDetailsCorporate(id : Number ): Observable<Corporate> {
    return this.http.get<Corporate>(this.urlCorporate+"/findCorporateWithAllRelations/"+id);
  }
  deleteClientCorporate( id : Number ) {
    return this.http.delete(this.urlCorpo+'/'+id);
  }
  getClientCorporateById( id : Number){
    return this.http.get(this.urlCorporate+id);
  }
  editClientCorporate( corpo : Corporate){
    return this.http.put(this.urlCorpo, corpo);
  }
}
