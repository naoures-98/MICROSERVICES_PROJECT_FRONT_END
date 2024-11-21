import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BranchComponent } from './components/referentiel/branch/branch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { NgChartsModule } from 'ng2-charts';
import { ErrorHttpComponent } from './error-http/error-http.component';
import { LoginComponent } from './components/security/login/login.component';
import { GroupComponent } from './components/security/group/group.component';
import { OrganizationUnitComponent } from './components/security/organization-unit/organization-unit.component';
import { UserComponent } from './components/security/user/user.component';
import { AuthInterceptor } from './auth.interceptor';
import { ClientsNotesComponent } from './components/scoring/clients-notes/clients-notes.component';
import { GenerateNotePartComponent } from './components/scoring/generate-note-part/generate-note-part.component';
import { GenerateNoteCorpComponent } from './components/scoring/generate-note-corp/generate-note-corp.component';
import { VariablesScoringComponent } from './variables-scoring/variables-scoring.component';
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
    ErrorHttpComponent,
    LoginComponent,
    GroupComponent,
    OrganizationUnitComponent,
    UserComponent,
    ClientsNotesComponent,
    GenerateNotePartComponent,
    GenerateNoteCorpComponent,
    VariablesScoringComponent,
    
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
    NgChartsModule,
    ReactiveFormsModule,
    

  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
