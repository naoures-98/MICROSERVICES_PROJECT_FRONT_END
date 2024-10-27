import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancingType } from '../classes/financing-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancingTypeService {
  constructor( private http : HttpClient ) { }
  private urlFinancingType = 'http://localhost:8222/Referentiel/FinancingType';
  private urlFinType = 'http://localhost:8071/Referentiel/FinancingType';


  createFinancingType(financingType : FinancingType ){
    console.log(financingType.financingTypeCode);
    return this.http.post(this.urlFinType,financingType);
  }

  getAllFinancingType(): Observable<FinancingType[]> {
    return this.http.get<FinancingType[]>(this.urlFinancingType);
  }
  deleteFinancingType( id : Number ) {
    return this.http.delete(this.urlFinType+'/'+id);
  }
  getFinancingTypeById( id : Number){
    return this.http.get<FinancingType>(this.urlFinancingType+"/"+id);
  }
  getFinancingTypeByCode( typeCode : String){
    return this.http.get<FinancingType>(this.urlFinancingType+"/code/"+typeCode);
  }
  getFinancingTypeByFinancingNature( financingNature : String){
    return this.http.get<FinancingType[]>(this.urlFinancingType+"/financingNature/"+financingNature);
  }
  editFinancingType( financingType : FinancingType){
    return this.http.put(this.urlFinType, financingType);
  }
}
