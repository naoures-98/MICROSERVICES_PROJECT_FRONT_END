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
import { ErrorHttpComponent } from './error-http/error-http.component';
import { LoginComponent } from './components/security/login/login.component';
import { GroupComponent } from './components/security/group/group.component';
import { OrganizationUnitComponent } from './components/security/organization-unit/organization-unit.component';
import { UserComponent } from './components/security/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { ClientsNotesComponent } from './components/scoring/clients-notes/clients-notes.component';


const routes: Routes = [
  { path: '', redirectTo : '/dashboard', pathMatch : 'full' },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
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
  { path: 'login', component: LoginComponent },
  { path: 'groups', component: GroupComponent },
  { path: 'organizationUnit', component: OrganizationUnitComponent },
  { path: 'users', component: UserComponent },
  { path: 'clientsNotes', component: ClientsNotesComponent },
  { path: '**', component: ErrorHttpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
