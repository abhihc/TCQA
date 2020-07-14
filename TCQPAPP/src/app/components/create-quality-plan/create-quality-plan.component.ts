import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { QualityPlanService } from './../../common/quality-plan.service';
import { QualityPlanAttribute } from './../../common/quality-plan.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  QualityCharacteristics: FormArray;
  measurementArray: FormArray;
  Count = [];

  isReadOnly = true;

  qpa = new QualityPlanAttribute();

  constructor(private qualityPlanService: QualityPlanService, public formbuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.Count.length = 1;
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
      QualityCharacteristics: this.formbuilder.array([this.createQC()]),
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

  createQC() {
    return this.formbuilder.group({
      qualityCharacteristic: '',
      qualitySubCharacteristics: this.formbuilder.array([this.createQSC()])
    })
  }

  createQSC() {
    return this.formbuilder.group({
      qualitySubCharacteristic: '',
      qualityAttributes: this.formbuilder.array([this.createQA()])
    })
  }

  createQA() {
    return this.formbuilder.group({
      qualityAttribute: '',
    })
  }

  createMeasurement(): FormGroup {
    return this.formbuilder.group({
      name: '',
      informalDefinition: '',
      measurementType: '',
      measurementMethod: '',
      scaleType: '',
      scaleRange: '',
      interpretation: '',
      thresholdValue: null
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
      QualityCharacteristics: [],
      measurementArray: [],
      qualityPlanName: ""
    }
  }

  onSubmit(form: NgForm) {
    this.qualityPlanService.postQualityPlan(form.value).subscribe((res) => {
      this.reset(form);
      this.openSnackBar('Quality plan saved successfully', null);

    })
  }

  addGoal() {
    this.goalArray = this.qualityForm.get('goalArray') as FormArray;
    this.goalArray.push(this.createGoal());
  }

  removeGoal(index) {
    this.goalArray.removeAt(index);
  }

  addQuestion() {
    this.questionArray = this.qualityForm.get('questionArray') as FormArray;
    this.questionArray.push(this.createQuestion());
  }

  removeQuestion(index) {
    this.questionArray.removeAt(index);
  }

  addQC() {
    const control = <FormArray>this.qualityForm.controls['QualityCharacteristics'];
    control.push(this.createQC());
  }

  addQSC(iqc) {
    const control = (<FormArray>this.qualityForm.controls['QualityCharacteristics']).at(iqc).get('qualitySubCharacteristics') as FormArray;
    control.push(this.createQSC());
  }

  addQA(iqc, iqsc) {
    const control = ((<FormArray>this.qualityForm.controls['QualityCharacteristics']).at(iqc).get('qualitySubCharacteristics') as FormArray).at(iqsc).get('qualityAttributes') as FormArray;
    control.push(this.createQA());
  }

  removeQA(iqc, iqsc) {
    const control = ((<FormArray>this.qualityForm.controls['QualityCharacteristics']).at(iqc).get('qualitySubCharacteristics') as FormArray).at(iqsc).get('qualityAttributes') as FormArray;
    control.removeAt(iqsc);
  }

  removeQSC(iqc) {
    const control = (<FormArray>this.qualityForm.controls['QualityCharacteristics']).at(iqc).get('qualitySubCharacteristics') as FormArray;
    control.removeAt(iqc);
  }

  removeQC(iqc) {
    const control = <FormArray>this.qualityForm.controls['QualityCharacteristics'];
    control.removeAt(iqc);
  }

  // removeQA(iqc,iqsc,iqa){
  //   this.QualityCharacteristics[iqc].qualitySubCharacteristics[iqsc].qualityAttributes.removeAt(iqa);
  // }

  // removeQualityFactor(index) {
  //   this.QualityCharacteristics.removeAt(index);
  // }

  addMeasurement() {
    this.measurementArray = this.qualityForm.get('measurementArray') as FormArray;
    this.measurementArray.push(this.createMeasurement());
  }

  removeMeasurement(index) {
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
    },
    {
      qc: 'Performance Efficiency',
      qbc: ['Time Behaviour', 'Resource Utilization']
    },
    {
      qc: 'Security',
      qbc: ['Confidentiality', 'Accountability', 'Authenticity']
    },
    {
      qc: 'Maintainability',
      qbc: ['Analysability', 'Analysability', 'Stability', 'Complexity']
    },
    {
      qc: 'Portability',
      qbc: ['Adaptability', 'Installability']
    },
    {
      qc: 'Reusability',
      qbc: ['Coupling', 'Flexibility']
    }

  ];

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }


}
