import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('jwt');
    if(jwtToken){
      return new HttpHeaders().set('Authorization', 'Bearer '+jwtToken);
    }else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }

  createFinancingType(financingType : FinancingType ){
    console.log(financingType.financingTypeCode);
    return this.http.post(this.urlFinancingType,financingType, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllFinancingType(): Observable<FinancingType[]> {
    return this.http.get<FinancingType[]>(this.urlFinancingType, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  deleteFinancingType( id : Number ) {
    return this.http.delete(this.urlFinancingType+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getFinancingTypeById( id : Number){
    return this.http.get<FinancingType>(this.urlFinancingType+"/"+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getFinancingTypeByCode( typeCode : String){
    return this.http.get<FinancingType>(this.urlFinancingType+"/code/"+typeCode, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getFinancingTypeByFinancingNature( financingNature : String){
    return this.http.get<FinancingType[]>(this.urlFinancingType+"/financingNature/"+financingNature, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editFinancingType( financingType : FinancingType){
    return this.http.put(this.urlFinancingType, financingType, {
      headers:this.createAuthorizationHeader()
      
    });
  }
}
