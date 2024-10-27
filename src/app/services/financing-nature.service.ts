import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancingNature } from '../classes/financing-nature';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancingNatureService {
  constructor( private http : HttpClient ) { }
  private urlFinancingNature = 'http://localhost:8222/Referentiel/FinancingNature';
  private urlFinNat = 'http://localhost:8071/Referentiel/FinancingNature';


  createFinancingNature(financingNature : FinancingNature ){
    console.log(financingNature.description);
    return this.http.post(this.urlFinNat,financingNature);
  }

  getAllFinancingNature(): Observable<FinancingNature[]> {
    return this.http.get<FinancingNature[]>(this.urlFinancingNature);
  }
  deleteFinancingNature( id : Number ) {
    return this.http.delete(this.urlFinNat+'/'+id);
  }
  getFinancingNatureById( id : Number){
    return this.http.get<FinancingNature>(this.urlFinancingNature+"/"+id);
  }
  editFinancingNature( branch : FinancingNature){
    return this.http.put(this.urlFinNat, branch);
  }
}
