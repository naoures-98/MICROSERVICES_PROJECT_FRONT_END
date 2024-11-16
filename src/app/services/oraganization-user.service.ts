import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationUser } from '../classes/organization-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OraganizationUserService {

  
  
  constructor(private http : HttpClient) { }
  private urlOrganizationUser = 'http://localhost:8222/Security/organizationUnit';


  private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('jwt');
    if(jwtToken){
      return new HttpHeaders().set('Authorization', 'Bearer '+jwtToken);
    }else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }

  createNewOrganizationUser(organizationUser : OrganizationUser ){
    console.log(organizationUser.matricule);
    return this.http.post(this.urlOrganizationUser,organizationUser, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllOrganizationUsers(): Observable<OrganizationUser[]> {
    return this.http.get<OrganizationUser[]>(this.urlOrganizationUser, {
     // headers:this.createAuthorizationHeader()
      
    });
  }
  deleteOrganizationUser( id : Number ) {
    return this.http.delete(this.urlOrganizationUser+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getOrganizationUserById( id : Number){
    return this.http.get(this.urlOrganizationUser+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editOrganizationUser( organizationUser : OrganizationUser){
    return this.http.put(this.urlOrganizationUser, organizationUser, {
      headers:this.createAuthorizationHeader()
      
    });
  }
}
