import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScoreVariable } from '../classes/score-variable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreVariableService {

  constructor( private http : HttpClient ) { }
  private url = 'http://localhost:8222/Scoring/ScoreVariable';

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
  createNewScoreVariable(scoreVariable : ScoreVariable ){
    //console.log(branch.name);
    return this.http.post(this.url,scoreVariable, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllScoreVariables(): Observable<ScoreVariable[]> {
    return this.http.get<ScoreVariable[]>(this.url, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  deleteScoreVariable( id : Number ) {
    return this.http.delete(this.url+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getScoreVariableById( id : Number){
    return this.http.get<ScoreVariable>(this.url+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editScoreVariable( scoreVariable : ScoreVariable){
    return this.http.put(this.url, scoreVariable, {
      headers:this.createAuthorizationHeader()
      
    });
  }
}
