import { HttpClient } from '@angular/common/http';
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


  
  createNewActivity(actitvity : ActivitySector ){
    console.log(actitvity.description);
    return this.http.post(this.urlAct,actitvity);
  }

  getAllActivities(): Observable<ActivitySector[]> {
    return this.http.get<ActivitySector[]>(this.urlActivitySector);
  }
  deleteActivity( id : Number ) {
    return this.http.delete(this.urlAct+'/'+id);
  }
  getActivityById( id : Number){
    return this.http.get(this.urlActivitySector+id);
  }
  editActivity( actitvity : ActivitySector){
    return this.http.put(this.urlAct, actitvity);
  }

}
