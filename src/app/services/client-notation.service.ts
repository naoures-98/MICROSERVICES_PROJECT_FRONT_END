import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientNotation } from '../classes/client-notation';
import { Observable } from 'rxjs';
import { ClientScore } from '../classes/ClientScore';
import { NiveauParSegment } from '../classes/NiveauParSegment';
import { ClientScoreParDate } from '../classes/ClientScoreParDate';

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
  findTop10ByOrderByNotationDateDesc(): Observable<ClientNotation[]> {
    return this.http.get<ClientNotation[]>(this.urlClientNotation+"/findTop10Clients");
  }
  getAllClientNotationByClient(idClient : Number ): Observable<ClientNotation> {
    return this.http.get<ClientNotation>(this.urlClientNotation+"/byClient/"+idClient);
  }
  calculNbrPersonneScorParSegment(): Observable<ClientScore[]> {
    return this.http.get<ClientScore[]>(this.urlClientNotation+"/nbClientScore");
  }
  calculNbrNiveauParSegment(segment : String): Observable<NiveauParSegment[]> {
    return this.http.get<NiveauParSegment[]>(this.urlClientNotation+"/nbNiveauParSegment/"+segment);
  }
  calculNbClientScoreParDate(segment : String): Observable<ClientScoreParDate[]> {
    return this.http.get<ClientScoreParDate[]>(this.urlClientNotation+"/nbClientScoreParDate/"+segment);
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
