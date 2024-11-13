import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivitySector } from '../classes/activity-sector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitySectorService {

  constructor(private http : HttpClient) { }
  private urlActivitySector = 'http://localhost:8222/Referentiel/ActivitySector';
  private urlAct = 'http://localhost:8071/Referentiel/ActivitySector';


  private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('jwt');
    if(jwtToken){
      return new HttpHeaders().set('Authorization', 'Bearer '+jwtToken);
    }else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }

  createNewActivity(actitvity : ActivitySector ){
    console.log(actitvity.description);
    return this.http.post(this.urlActivitySector,actitvity, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllActivities(): Observable<ActivitySector[]> {
    return this.http.get<ActivitySector[]>(this.urlActivitySector, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  deleteActivity( id : Number ) {
    return this.http.delete(this.urlActivitySector+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getActivityById( id : Number){
    return this.http.get(this.urlActivitySector+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editActivity( actitvity : ActivitySector){
    return this.http.put(this.urlActivitySector, actitvity, {
      headers:this.createAuthorizationHeader()
      
    });
  }

}
