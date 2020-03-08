import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { QualityPlanService } from '../common/quality-plan.service';
import { QualityPlan } from '../common/quality-plan.model';


@Component({
  selector: 'app-create-quality-plan',
  templateUrl: './create-quality-plan.component.html',
  styleUrls: ['./create-quality-plan.component.css'],
  providers: [QualityPlanService]
})
export class CreateQualityPlanComponent implements OnInit {


  

  constructor(private qualityPlanService: QualityPlanService) { 
    this.qualityPlanService.selectedQualityPlan.goalArray = [];
    this.qualityPlanService.selectedQualityPlan.goalDimensions = [];
    
  }

  testLevelsArray: any = ['Unit Testing', 'Integration Testing'];
  testCaseTypeArray: any = ['Code-based Test Cases', 'Natural Language Test Cases'];
  developmentPhaseArray: any = ['Requirements Specification', 'Design', 'Implementation', 'Testing', 'Maintenance', 'Migration'];
  purposeArray: any = ['Quality Assessment','Quality Monitoring','Quality Prediction','Quality Control'];

  //informationNeedsArray: Array<any> = [];


  ngOnInit() {
    this.reset();
  }

  reset(form?: NgForm) {
    if (form)
      form.reset();
    this.qualityPlanService.selectedQualityPlan = {
      _id: "",
      testObject: "",
      testItem: "",
      testSuite: "",
      testLevels: "",
      testCaseType: "",
      developmentPhase: "",
      sourceTestingFramework: "",
      targetTestingFramework: "",
      // objectOfStudy: "",
      // purpose: "",
      // qualityFocus: "",
      // viewpoint: "",
      // context: "",
      goalDimensions: [],
      goalArray: [],
      question: "",
      qualityPlanName: "",
    }
  }

  onSubmit(form: NgForm) {
    console.log(this.qualityPlanService);
    this.qualityPlanService.postQualityPlan(form.value).subscribe((res) => {
      this.reset(form);

    })
  }

  check(){
    console.log(this.qualityPlanService);
  }

  addGoal(){
    this.qualityPlanService.selectedQualityPlan.goalArray.push(this.qualityPlanService.selectedQualityPlan.goalDimensions);
    this.qualityPlanService.selectedQualityPlan.goalDimensions = [];
  }

}
