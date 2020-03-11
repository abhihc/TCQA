import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,MatToolbarModule,MatFormFieldModule,MatInputModule, MatSelectModule, MatGridListModule, MatTableModule, MatExpansionModule, MatIconModule, MatDialogModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';

import { NgSelectModule } from '@ng-select/ng-select';


//components
import { NavbarComponent } from './navbar/navbar.component';
import { CreateQualityPlanComponent } from './create-quality-plan/create-quality-plan.component';
import { QualityPlansComponent } from './quality-plans/quality-plans.component';
import { VisualizationComponent } from './visualization/visualization.component';


//services
//import { QualityPlanService } from './common/quality-plan.service';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateQualityPlanComponent,
    QualityPlansComponent,
    VisualizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule, 
    MatGridListModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    ChartsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
