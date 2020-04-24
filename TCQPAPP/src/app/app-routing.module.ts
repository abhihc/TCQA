import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateQualityPlanComponent } from './components/create-quality-plan/create-quality-plan.component';
import { QualityPlansComponent } from './components/quality-plans/quality-plans.component';
import { ResultsViewComponent } from './components/results-view/results-view.component';
import { ResultsAddComponent } from './components/results-add/results-add.component';
import { ResultsListComponent } from './components/results-list/results-list.component';

 
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'results-list' },
  { path: 'view-result/:id', component: ResultsViewComponent },
  { path: 'add-result', component: ResultsAddComponent },
  { path: 'results-list', component: ResultsListComponent },
  {path: 'Quality Plans', component: QualityPlansComponent},
  {path: 'Create Quality Plan', component: CreateQualityPlanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
