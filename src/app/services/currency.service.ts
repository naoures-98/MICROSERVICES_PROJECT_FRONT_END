import { HttpClient } from '@angular/common/http';
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


  
  createNewCurrency(currency : Currency ){
    console.log(currency.name);
    return this.http.post(this.urlCur,currency);
  }

  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.urlCurrency);
  }
  deleteCurrency( id : Number ) {
    return this.http.delete(this.urlCur+'/'+id);
  }
  getCurrencyById( id : Number){
    return this.http.get(this.urlCurrency+id);
  }
  editCurrency( currency : Currency){
    return this.http.put(this.urlCur, currency);
  }
}
