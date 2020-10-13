
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateQualityPlanComponent } from './components/create-quality-plan/create-quality-plan.component';
import { QualityPlansComponent } from './components/quality-plans/quality-plans.component';
import { ResultsViewComponent } from './components/results-view/results-view.component';
import { ResultsAddComponent } from './components/results-add/results-add.component';
import { ResultsListComponent } from './components/results-list/results-list.component';
import { HomeComponent } from './components/home/home.component';
import { ToolsComponent } from './components/tools/tools.component';
import { DocumentationComponent } from './components/documentation/documentation.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'view-result/:id', component: ResultsViewComponent },
  { path: 'add-result', component: ResultsAddComponent },
  { path: 'results-list', component: ResultsListComponent },
  { path: 'quality-plans', component: QualityPlansComponent },
  { path: 'create-quality-plan', component: CreateQualityPlanComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'tools', component: ToolsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
