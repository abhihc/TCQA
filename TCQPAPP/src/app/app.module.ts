import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,MatToolbarModule,MatFormFieldModule,MatInputModule, MatSelectModule, MatGridListModule, MatTableModule, MatExpansionModule, MatIconModule, MatDialogModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { HttpClientModule } from '@angular/common/http';

import { NgSelectModule } from '@ng-select/ng-select';


//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateQualityPlanComponent } from './components/create-quality-plan/create-quality-plan.component';
import { QualityPlansComponent } from './components/quality-plans/quality-plans.component';
import { ResultsViewComponent } from './components/results-view/results-view.component';
import { ResultsListComponent } from './components/results-list/results-list.component';
import { ResultsAddComponent } from './components/results-add/results-add.component';

//services
import { QualityPlanService } from './common/quality-plan.service';
import { ApiService } from './common/api.service';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ToolsComponent } from './components/tools/tools.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateQualityPlanComponent,
    QualityPlansComponent,
    ResultsViewComponent,
    ResultsListComponent,
    ResultsAddComponent,
    HeaderComponent,
    HomeComponent,
    DocumentationComponent,
    ToolsComponent
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
    NgSelectModule,
    NgbModalModule,
    NgxChartsModule
  ],
  providers: [QualityPlanService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
