import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientSegmentConfig } from '../classes/client-segment-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientSegmentConfigService {

  constructor(private http : HttpClient) { }
  private urlClientSegmtConfig = 'http://localhost:8222/Scoring/CSC';
  private urlClientSeg = 'http://localhost:8091/Scoring/CSC';

 /* private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('jwt');
    if(jwtToken){
      return new HttpHeaders().set('Authorization', 'Bearer '+jwtToken);
    }else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }*/
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
  createNewClientSegmentConfig(clientSegmentConfig : ClientSegmentConfig ){
    console.log(clientSegmentConfig.description);
    return this.http.post(this.urlClientSegmtConfig,clientSegmentConfig, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllClientSegmentConfig(): Observable<ClientSegmentConfig[]> {
    return this.http.get<ClientSegmentConfig[]>(this.urlClientSegmtConfig, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  deleteClientSegmentConfig( id : Number ) {
    return this.http.delete(this.urlClientSegmtConfig+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getClientSegmentConfigById( id : Number){
    return this.http.get(this.urlClientSegmtConfig+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getClientSegmentConfigByCode( code : String){
    return this.http.get<ClientSegmentConfig>(this.urlClientSegmtConfig+"/code/"+code, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editClientSegmentConfig( clientSegmentConfig : ClientSegmentConfig){
    return this.http.put(this.urlClientSegmtConfig, clientSegmentConfig, {
      headers:this.createAuthorizationHeader()
      
    });
  }
}
