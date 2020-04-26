import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormArray, FormControl, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
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

  data = new QualityPlan();

  isReadOnly = true;
  buttonDisable = true;

  editForm: FormGroup;
  goalArray: FormArray;
  questionArray: FormArray;
  qualityFactorArray: FormArray;
  measurementArray: FormArray;

  qpa = new QualityPlanAttribute();

  constructor(private qualityPlanService: QualityPlanService, public formbuilder: FormBuilder) { }

  ngOnInit() {
    this.qualityPlanList();
    this.reset();

    this.editForm = this.formbuilder.group({
      _id: [''],
      testObject: [''],
      testItem: [''],
      testSuite: [''],
      testLevels: [''],
      testCaseType: [''],
      developmentPhase: [''],
      sourceTestingFramework: [''],
      targetTestingFramework: [''],
      qualityPlanName: [''],
      goalArray: this.formbuilder.array([this.createGoal()]),
      questionArray: this.formbuilder.array([this.createQuestion()]),
      qualityFactorArray: this.formbuilder.array([this.createQualityFactor()]),
      measurementArray: this.formbuilder.array([this.createMeasurement()])
    })
  }

  createGoal(): FormGroup {
    return this.formbuilder.group({
      objectOfStudy: '',
      purpose: '',
      qualityFocus: '',
      viewpoint: '',
      context: ''
    })
  }

  createQuestion(): FormGroup {
    return this.formbuilder.group({
      question: ''
    })
  }

  createQualityFactor(): FormGroup {
    return this.formbuilder.group({
      qualityCharacteristic: '',
      qualitySubCharacteristic: '',
      qualityAttribute: ''
    })
  }

  createMeasurement(): FormGroup{
    return this.formbuilder.group({
    name: '',
    informalDefinition: '',
    measurementType: '',
    measurementMethod: '',
    scaleType: '',
    scaleRange: '',
    interpretation: ''
    })
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
    console.log(form.value);
    form.value._id = this.data._id;
    
      this.qualityPlanService.putQualityPlan(form.value).subscribe((res) => {
        this.reset(form);
        this.qualityPlanList();
      })
    

  }


  qualityPlanList() {
    this.qualityPlanService.getQualityPlanList().subscribe((res) => {
      this.qualityPlanService.qualityPlans = res as QualityPlan[];
    });
  }

  onView(qp: QualityPlan) {
    this.isReadOnly = true;
    this.buttonDisable = true;
    this.data = qp;
  }

  onEdit(qp: QualityPlan) {
    this.isReadOnly = false;
    this.buttonDisable = false;
    this.data = qp;
    
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
