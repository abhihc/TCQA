import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { FormArray, FormControl, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { QualityPlanService } from './../../common/quality-plan.service';
import { QualityPlan, QualityFactor, QualityPlanAttribute } from './../../common/quality-plan.model';

interface qualityAspect {
  qc: string;
  qbc: string[];
}

@Component({
  selector: 'app-create-quality-plan',
  templateUrl: './create-quality-plan.component.html',
  styleUrls: ['./create-quality-plan.component.css'],
  providers: [QualityPlanService]
})
export class CreateQualityPlanComponent implements OnInit {

  qualityForm: FormGroup;
  goalArray: FormArray;
  questionArray: FormArray;
  qualityFactorArray: FormArray;
  measurementArray: FormArray;

  qpa = new QualityPlanAttribute();

  constructor(private qualityPlanService: QualityPlanService, public formbuilder: FormBuilder) {
  }


  ngOnInit() {

    this.reset();

    this.qualityForm = this.formbuilder.group({
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
      qualityPlanName: "",
    }
  }

  onSubmit(form: NgForm) {
    this.qualityPlanService.postQualityPlan(form.value).subscribe((res) => {
      this.reset(form);

    })
  }

  addGoal() {
    this.goalArray = this.qualityForm.get('goalArray') as FormArray;
    this.goalArray.push(this.createGoal());
  }

  removeGoal(index){
    this.goalArray.removeAt(index);
  }

  addQuestion() {
    this.questionArray = this.qualityForm.get('questionArray') as FormArray;
    this.questionArray.push(this.createQuestion());
  }

  removeQuestion(index){
    this.questionArray.removeAt(index);
  }

  addQualityFactor() {
    this.qualityFactorArray = this.qualityForm.get('qualityFactorArray') as FormArray;
    this.qualityFactorArray.push(this.createQualityFactor());
  }

  removeQualityFactor(index){
    this.qualityFactorArray.removeAt(index);
  }

  addMeasurement(){
    this.measurementArray = this.qualityForm.get('measurementArray') as FormArray;
    this.measurementArray.push(this.createMeasurement());
  }

  removeMeasurement(index){
    this.measurementArray.removeAt(index);
  }

  qualityAspects: qualityAspect[] = [
    {
      qc: 'Test Effectivity',
      qbc: ['Test Coverage', 'Test Correctness', 'Fault-Revealing Capability', 'Test Confidence']

    },
    {
      qc: 'Reliability',
      qbc: ['Test Repeatability', 'Maturity', 'Fault Tolerance', 'Recoverability']
    },
    {
      qc: 'Usability',
      qbc: ['Understandability', 'Learnability', 'Operability', 'Test Evaluability']
    }

  ];


}
