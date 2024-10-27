import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JuridicalForm } from '../classes/juridical-form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuridicalFormService {

  constructor( private http : HttpClient ) { }
  private urlJuridicalForm = 'http://localhost:8222/Referentiel/JuridicalForm';
  private urlJurid = 'http://localhost:8071/Referentiel/JuridicalForm';


  createNewJuridicalForm(juridical : JuridicalForm ){
    console.log(juridical.description);
    return this.http.post(this.urlJurid,juridical);
  }

  getAllJuridicalForm(): Observable<JuridicalForm[]> {
    return this.http.get<JuridicalForm[]>(this.urlJuridicalForm);
  }
  deleteJuridicalForm( id : Number ) {
    return this.http.delete(this.urlJurid+'/'+id);
  }
  getJuridicalFormById( id : Number){
    return this.http.get(this.urlJuridicalForm+id);
  }
  editJuridicalForm( branch : JuridicalForm){
    return this.http.put(this.urlJurid, branch);
  }
}
