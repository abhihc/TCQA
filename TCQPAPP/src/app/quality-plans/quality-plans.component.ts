import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QualityPlanService } from '../common/quality-plan.service';
import { QualityPlan } from '../common/quality-plan.model';

@Component({
  selector: 'app-quality-plans',
  templateUrl: './quality-plans.component.html',
  styleUrls: ['./quality-plans.component.css'],
  providers: [QualityPlanService]
})
export class QualityPlansComponent implements OnInit {

  
  isReadOnly= true;
  buttonDisable = true;

  constructor(private qualityPlanService: QualityPlanService) { }

  testLevelsArray: any = ['Unit Testing','Integration Testing'];
  testCaseTypeArray: any = ['Code-based Test Cases','Natural Language Test Cases'];
  developmentPhaseArray: any = ['Requirements Specification','Design','Implementation','Testing','Maintenance','Migration'];
  purposeArray: any = ['Quality Assessment','Quality Monitoring','Quality Prediction','Quality Control'];

  ngOnInit() {
    this.qualityPlanList();
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
      qualityPlanName: ""
    }
  }

  onSubmit(form: NgForm) {
    if(form.value._id == ""){
    this.qualityPlanService.postQualityPlan(form.value).subscribe((res) => {
      this.reset(form);
      this.qualityPlanList();

    })
    }
    else{
      this.qualityPlanService.putQualityPlan(form.value).subscribe((res) => {
        this.reset(form);
        this.qualityPlanList();
    })
  }

  }


  qualityPlanList() {
    this.qualityPlanService.getQualityPlanList().subscribe((res) => {
      this.qualityPlanService.qualityPlans = res as QualityPlan[];
    });
  }

  onView(qp: QualityPlan){
    this.isReadOnly = true;
    this.buttonDisable = true;
    this.qualityPlanService.selectedQualityPlan = qp;
  }

  onEdit(qp: QualityPlan) {
    this.isReadOnly = false;
    this.buttonDisable = false;
    this.qualityPlanService.selectedQualityPlan = qp;
  }

  onDelete(_id: string) {
    this.buttonDisable = true;
    this.qualityPlanService.deleteQualityPlan(_id).subscribe();
    this.qualityPlanList();
    this.reset();
  }
}
