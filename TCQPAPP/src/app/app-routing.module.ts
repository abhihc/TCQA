import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { CreateQualityPlanComponent } from './create-quality-plan/create-quality-plan.component';
import { QualityPlansComponent } from './quality-plans/quality-plans.component';
import { VisualizationComponent } from './visualization/visualization.component';

const routes: Routes = [
  {path: 'Quality Plans', component: QualityPlansComponent},
  {path: 'Create Quality Plan', component: CreateQualityPlanComponent},
  {path: 'Visualization', component: VisualizationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
