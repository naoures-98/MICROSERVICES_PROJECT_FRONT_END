import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScoringVariable } from '../classes/scoring-variable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoringVariableService {

  constructor( private http : HttpClient ) { }
  private url = 'http://localhost:8222/Scoring/ScoringVariable';
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
  createNewScoringVariable(scoringVariable : ScoringVariable ){
    //console.log(branch.name);
    return this.http.post(this.url,scoringVariable, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllScoringVariables(): Observable<ScoringVariable[]> {
    return this.http.get<ScoringVariable[]>(this.url, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  deleteScoringVariable( id : Number ) {
    return this.http.delete(this.url+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getScoringVariableById( id : Number){
    return this.http.get<ScoringVariable>(this.url+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editScoringVariable( scoringVariable : ScoringVariable){
    return this.http.put(this.url, scoringVariable, {
      headers:this.createAuthorizationHeader()
      
    });
  }
}
