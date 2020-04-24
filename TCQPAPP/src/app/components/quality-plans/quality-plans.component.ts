import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QualityPlanService } from './../../common/quality-plan.service';
import { QualityPlan,QualityPlanAttribute } from './../../common/quality-plan.model';

interface qualityAspect {
  qc: string;
  qbc: string[];
}

@Component({
  selector: 'app-quality-plans',
  templateUrl: './quality-plans.component.html',
  styleUrls: ['./quality-plans.component.css'],
  providers: [QualityPlanService]
})
export class QualityPlansComponent implements OnInit {


  isReadOnly = true;
  buttonDisable = true;

  qpa2 = new QualityPlanAttribute();

  constructor(private qualityPlanService: QualityPlanService) { }

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
      goalArray: [],
      questionArray: [],
      qualityFactorArray: [],
      measurementArray: [],
      qualityPlanName: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.qualityPlanService.postQualityPlan(form.value).subscribe((res) => {
        this.reset(form);
        this.qualityPlanList();

      })
    }
    else {
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

  onView(qp: QualityPlan) {
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

  qualityAspects: qualityAspect[] = [
    {
      qc: 'Test Effectivity',
      qbc: ['Test Coverage', 'Test Correctness', 'Fault-Revealing Capability', 'Test Confidence']

    },
    {
      qc: 'Reliability',
      qbc: ['Test Repeatability', 'Maturity', 'Fault Tolerance', 'Recoverability']
    }
  ];
}