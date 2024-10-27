import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../classes/branch';
@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor( private http : HttpClient ) { }
  private urlReferentiel = 'http://localhost:8222/Referentiel/Branchs';
  private urlRef = 'http://localhost:8071/Referentiel/Branchs';


  createNewBranch(branch : Branch ){
    console.log(branch.name);
    return this.http.post(this.urlRef,branch);
  }

  getAllBranchs(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.urlReferentiel);
  }
  deleteBranch( id : Number ) {
    return this.http.delete(this.urlRef+'/'+id);
  }
  getBranchById( id : Number){
    return this.http.get<Branch>(this.urlReferentiel+'/'+id);
  }
  editBranch( branch : Branch){
    return this.http.put(this.urlRef, branch);
  }
}
