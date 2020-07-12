import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule, MatCardModule, MatButtonToggleModule, MatPaginatorModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule, MatTableModule, MatExpansionModule, MatIconModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { HttpClientModule } from '@angular/common/http';

import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

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
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainheaderComponent } from './components/mainheader/mainheader.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';



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
    ToolsComponent,
    MainNavComponent,
    SidebarComponent,
    MainheaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    NgSelectModule,
    NgbModalModule,
    LayoutModule,
    NgxChartsModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    MatTreeModule,
    MatStepperModule,
    MatSnackBarModule
  ],
  providers: [QualityPlanService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
