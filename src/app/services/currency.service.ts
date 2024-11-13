import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../classes/currency';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http : HttpClient) { }
  private urlCurrency = 'http://localhost:8222/Referentiel/Currency';
  private urlCur = 'http://localhost:8071/Referentiel/Currency';

  private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('jwt');
    if(jwtToken){
      return new HttpHeaders().set('Authorization', 'Bearer '+jwtToken);
    }else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }
  
  createNewCurrency(currency : Currency ){
    console.log(currency.name);
    return this.http.post(this.urlCurrency,currency, {
      headers:this.createAuthorizationHeader()
      
    });
  }

  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.urlCurrency, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  deleteCurrency( id : Number ) {
    return this.http.delete(this.urlCurrency+'/'+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  getCurrencyById( id : Number){
    return this.http.get(this.urlCurrency+id, {
      headers:this.createAuthorizationHeader()
      
    });
  }
  editCurrency( currency : Currency){
    return this.http.put(this.urlCurrency, currency, {
      headers:this.createAuthorizationHeader()
      
    });
  }
}
