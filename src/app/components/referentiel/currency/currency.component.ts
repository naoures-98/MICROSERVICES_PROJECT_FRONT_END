import { Component, OnInit } from '@angular/core';
import { Currency } from '../../../classes/currency';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from '../../../services/currency.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.css'
})
export class CurrencyComponent implements OnInit{

  currencies : Currency[]=[];
  currency: Currency = new Currency();
  selectedCurrencyId!: Number;

  //FILTRER LA LISTE DES ACTIVITES :
  searchText: string = '';
  p: number = 1; // Page courante
  itemsPerPage: number = 10; // Nombre d'éléments par page

  constructor(private route: ActivatedRoute, 
    private router: Router, public currencyService : CurrencyService,
    private toast : NgToastService) { }
  ngOnInit(): void {
    //Récupérer la liste des secteurs d'activités
    this.currencyService.getAllCurrencies().subscribe(
      res=>{
      
        this.currencies=res;
    },
      err=>{console.log(err);

      }
    );
  }
  get filteredCurrencies() {
    return this.currencies.filter(currency => 
      currency.name.toLowerCase().includes(this.searchText.toLowerCase()) || 
      currency.internalCode.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  // CREATION D UNE NOUVEAU SECTEUR
  onSubmit(){
    console.log(this.currency);
    this.onAjoutCurrency();
  }
  onAjoutCurrency(){
    console.log("currency code"+ this.currency.internalCode);
    this.currencyService.createNewCurrency(this.currency).subscribe( 
      res=>{
        this.toast.success( "Devise  ["+this.currency.internalCode +"] ajoutée avec succès", "success " );
        this.ngOnInit();
        this.currency= new Currency();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de creation");
      console.log(err);});

  }
  // MODIFICATION D UNE ACTIVITE
  editCurrency(selectedCurrency : any){
    this.currency.id = selectedCurrency.id;
    this.currency.internalCode = selectedCurrency.internalCode;
    this.currency.name = selectedCurrency.name;
  }
  onEditSubmit(){
    console.log("currency code"+ this.currency.internalCode);
    this.currencyService.editCurrency(this.currency).subscribe( 
      res=>{
        //this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:'5000', position:'topCenter'});
        // Ensuite, fermez la modale
        this.toast.success( "Devise ["+this.currency.internalCode +"] modifiée avec succès", "success " );
        
        //this.closeModal();
        //this.goToBranchList()
        this.ngOnInit();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de modification",err);
      console.log(err);});    
  }

  // SUPPRESSION D'UNE ACTIVITE
  openDeleteModal(id : Number) {
    this.selectedCurrencyId = id;
  }
  confirmDelete() {
    this.currencyService.deleteCurrency(this.selectedCurrencyId).subscribe( 
      res=>{
        this.toast.success( "Devise  supprimée avec succès", "success " );
      // Fermez le modal de confirmation
      const modalElement = document.getElementById('confirmDeleteModal');
        this.ngOnInit();
        console.log(res);

      }, 
    err=>{
      this.toast.danger("Problem de suppression",err);
      console.log(err);});
  }

}
