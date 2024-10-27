import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BranchComponent } from './components/referentiel/branch/branch.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivitySectorComponent } from './components/referentiel/activity-sector/activity-sector.component';
import { FinancingNatureComponent } from './components/referentiel/financing-nature/financing-nature.component';
import { FinancingTypeComponent } from './components/referentiel/financing-type/financing-type.component';
import { JuridicalFormComponent } from './components/referentiel/juridical-form/juridical-form.component';
import { CurrencyComponent } from './components/referentiel/currency/currency.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgToastModule } from 'ng-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientNotationComponent } from './components/scoring/client-notation/client-notation.component';
import { ClientSegmentComponent } from './components/scoring/client-segment/client-segment.component';
import { CorporateComponent } from './components/scoring/corporate/corporate.component';
import { RetailComponent } from './components/scoring/retail/retail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    BranchComponent,
    HeaderComponent,
    DashboardComponent,
    ActivitySectorComponent,
    FinancingNatureComponent,
    FinancingTypeComponent,
    JuridicalFormComponent,
    CurrencyComponent,
    ClientNotationComponent,
    ClientSegmentComponent,
    CorporateComponent,
    RetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgToastModule,
    BrowserAnimationsModule,
    FontAwesomeModule,

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
