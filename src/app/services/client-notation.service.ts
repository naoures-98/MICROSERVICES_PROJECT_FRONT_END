import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientNotation } from '../classes/client-notation';
import { Observable } from 'rxjs';
import { ClientScore } from '../classes/ClientScore';

@Injectable({
  providedIn: 'root'
})
export class ClientNotationService {

  constructor( private http : HttpClient ) { }
  private urlClientNotation = 'http://localhost:8222/Scoring/ClientNotation';
  private urlClientNota = 'http://localhost:8091/Scoring/ClientNotation';


  createNewClientNotation(clientNotation : ClientNotation ){
    console.log(clientNotation.adjustedScore);
    return this.http.post(this.urlClientNota,clientNotation);
  }

  getAllClientNotation(): Observable<ClientNotation[]> {
    return this.http.get<ClientNotation[]>(this.urlClientNotation);
  }
  getAllClientNotationByClient(idClient : Number ): Observable<ClientNotation> {
    return this.http.get<ClientNotation>(this.urlClientNotation+"/byClient/"+idClient);
  }
  calculNbrPersonneScorParSegment(): Observable<ClientScore[]> {
    return this.http.get<ClientScore[]>(this.urlClientNotation+"/nbClientScore");
  }

  deleteClientNotation( id : Number ) {
    return this.http.delete(this.urlClientNota+'/'+id);
  }
  getClientNotationById( id : Number){
    return this.http.get<ClientNotation>(this.urlClientNotation+id);
  }
  editClientNotation( clientNotation : ClientNotation){
    return this.http.put(this.urlClientNota, clientNotation);
  }
}
