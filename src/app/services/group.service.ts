import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../classes/group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  
  constructor(private http : HttpClient) { }
  private urlGroup = 'http://localhost:8222/Security/groups';


  private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('jwt');
    console.log("jwt = "+jwtToken);
    if(jwtToken){
      return new HttpHeaders().set('Authorization', 'Bearer '+jwtToken);
    }else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }

  createNewGroup(group : Group ){
    console.log(group.groupName);
    return this.http.post(this.urlGroup,group, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.urlGroup, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  deleteGroup( id : Number ) {
    return this.http.delete(this.urlGroup+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getGroupById( id : Number){
    return this.http.get<Group>(this.urlGroup+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editGroup( group : Group){
    return this.http.put(this.urlGroup, group, {
      headers:this.createAuthorizationHeader()
      
    });
  }
}
