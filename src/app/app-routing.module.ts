import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './components/referentiel/branch/branch.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivitySectorComponent } from './components/referentiel/activity-sector/activity-sector.component';
import { FinancingNatureComponent } from './components/referentiel/financing-nature/financing-nature.component';
import { FinancingTypeComponent } from './components/referentiel/financing-type/financing-type.component';
import { JuridicalFormComponent } from './components/referentiel/juridical-form/juridical-form.component';
import { CurrencyComponent } from './components/referentiel/currency/currency.component';
import { ClientSegmentComponent } from './components/scoring/client-segment/client-segment.component';
import { RetailComponent } from './components/scoring/retail/retail.component';
import { CorporateComponent } from './components/scoring/corporate/corporate.component';
import { ClientNotationComponent } from './components/scoring/client-notation/client-notation.component';


const routes: Routes = [
  { path: '', redirectTo : '/dashboard', pathMatch : 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'currency', component: CurrencyComponent },
  { path: 'branch', component: BranchComponent },
  //{ path: 'update/:id', component: EditComponent },
  { path: 'activitySector', component: ActivitySectorComponent },
  { path: 'financingNature', component: FinancingNatureComponent },
  { path: 'financingType', component: FinancingTypeComponent },
  { path: 'juridicalForm', component: JuridicalFormComponent },
  { path: 'segmentsClients', component: ClientSegmentComponent },
  { path: 'personnesPhysiques', component: RetailComponent },
  { path: 'personnesMorales', component: CorporateComponent },
  { path: 'notesClients', component: ClientNotationComponent },
  //{ path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
