import { HttpClient } from '@angular/common/http';
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


  
  createNewClientSegmentConfig(clientSegmentConfig : ClientSegmentConfig ){
    console.log(clientSegmentConfig.description);
    return this.http.post(this.urlClientSeg,clientSegmentConfig);
  }

  getAllClientSegmentConfig(): Observable<ClientSegmentConfig[]> {
    return this.http.get<ClientSegmentConfig[]>(this.urlClientSegmtConfig);
  }
  deleteClientSegmentConfig( id : Number ) {
    return this.http.delete(this.urlClientSeg+'/'+id);
  }
  getClientSegmentConfigById( id : Number){
    return this.http.get(this.urlClientSegmtConfig+id);
  }
  getClientSegmentConfigByCode( code : String){
    return this.http.get<ClientSegmentConfig>(this.urlClientSegmtConfig+"/code/"+code);
  }
  editClientSegmentConfig( clientSegmentConfig : ClientSegmentConfig){
    return this.http.put(this.urlClientSeg, clientSegmentConfig);
  }
}
