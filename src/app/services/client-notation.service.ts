import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('jwt');
    if(jwtToken){
      return new HttpHeaders().set('Authorization', 'Bearer '+jwtToken);
    }else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }

  createNewClientNotation(clientNotation : ClientNotation ){
    console.log(clientNotation.adjustedScore);
    return this.http.post(this.urlClientNotation,clientNotation, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllClientNotation(): Observable<ClientNotation[]> {
    return this.http.get<ClientNotation[]>(this.urlClientNotation, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  findTop10ByOrderByNotationDateDesc(): Observable<ClientNotation[]> {
    return this.http.get<ClientNotation[]>(this.urlClientNotation+"/findTop10Clients", {
      headers:this.createAuthorizationHeader()
      
    });
  }
  findByNotationBySegmentCodeDateDesc(segment : String): Observable<ClientNotation[]> {
    return this.http.get<ClientNotation[]>(this.urlClientNotation+"/findClients/"+segment, {
      headers:this.createAuthorizationHeader()
    });
  }
  getAllClientNotationByClient(idClient : Number ): Observable<ClientNotation> {
    return this.http.get<ClientNotation>(this.urlClientNotation+"/byClient/"+idClient, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  calculNbrPersonneScorParSegment(): Observable<ClientScore[]> {
    return this.http.get<ClientScore[]>(this.urlClientNotation+"/nbClientScore", {
      headers:this.createAuthorizationHeader()
      
    });
  }
  calculNbrNiveauParSegment(segment : String): Observable<NiveauParSegment[]> {
    return this.http.get<NiveauParSegment[]>(this.urlClientNotation+"/nbNiveauParSegment/"+segment, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  calculNbClientScoreParDate(segment : String): Observable<ClientScoreParDate[]> {
    return this.http.get<ClientScoreParDate[]>(this.urlClientNotation+"/nbClientScoreParDate/"+segment, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  deleteClientNotation( id : Number ) {
    return this.http.delete(this.urlClientNotation+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getClientNotationById( id : Number){
    return this.http.get<ClientNotation>(this.urlClientNotation+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editClientNotation( clientNotation : ClientNotation){
    return this.http.put(this.urlClientNotation, clientNotation, {
      headers:this.createAuthorizationHeader()
      
    });
  }
}
