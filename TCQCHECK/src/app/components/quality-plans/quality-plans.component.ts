import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { QualityPlanService } from './../../common/quality-plan.service';
import { QualityPlan, QualityPlanAttribute, QualityAttribute } from './../../common/quality-plan.model';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ToolDetail } from './../../common/toolDetail.model';
import { ToolDetailService } from './../../common/toolDetail.service';


@Component({
  selector: 'app-quality-plans',
  templateUrl: './quality-plans.component.html',
  styleUrls: ['./quality-plans.component.css', './../../components/style/style.component.css'],
  providers: [QualityPlanService, ToolDetailService]
})
export class QualityPlansComponent implements OnInit {

  editForm: FormGroup;
  goalArray: FormArray;
  questionArray: FormArray;
  QualityCharacteristics: FormArray;
  measurementArray: FormArray;

  data = new QualityPlan(); // Object for selected quality plan
  isReadOnly = true;
  qpa = new QualityPlanAttribute();
  selectedQA = [];
  toolsList: ToolDetail[];

  constructor(private qualityPlanService: QualityPlanService, private toolDetailService: ToolDetailService, public formbuilder: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.selectedQA = [];
    this.getToolList();
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

  // Form builder for Quality Characteristics
  createQC() {
    return this.formbuilder.group({
      qualityCharacteristic: '',
      qualitySubCharacteristics: this.formbuilder.array([this.createQSC()])
    })
  }

  // Form builder for Quality Sub-characteristics
  createQSC() {
    return this.formbuilder.group({
      qualitySubCharacteristic: '',
      qualityAttributes: this.formbuilder.array([this.createQA()])
    })
  }

  // Form builder for Quality Attributes
  createQA() {
    return this.formbuilder.group({
      questionNumber: '',
      qualityAttribute: ''
    })
  }

  createMeasurement(): FormGroup {
    return this.formbuilder.group({
      name: '',
      informalDefinition: '',
      possibleAction: '',
      measurementType: '',
      measurementMethod: '',
      scaleType: '',
      scaleRange: '',
      interpretation: '',
      thresholdValue: null
    })
  }

  // Rest form
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

  // Upate Quality Plan
  onSubmit(form: NgForm) {
    form.value._id = this.data._id;
    this.qualityPlanService.putQualityPlan(form.value).subscribe((res) => {
      this.reset(form);
      this.qualityPlanList();
      this.openSnackBar('Qulity plan updated successfully', null);
    })
  }

  // Get Quality Plans list
  qualityPlanList() {
    this.qualityPlanService.getQualityPlanList().subscribe((res) => {
      this.qualityPlanService.qualityPlans = res as QualityPlan[];
    });
  }

  // To view the specific quality plan
  onView(qp: QualityPlan) {
    this.selectedQA = [];
    this.editForm.patchValue({
      _id: qp._id,
      testObject: qp.testObject,
      testItem: qp.testItem,
      testSuite: qp.testSuite,
      testLevels: qp.testLevels,
      testCaseType: qp.testCaseType,
      developmentPhase: qp.developmentPhase,
      sourceTestingFramework: qp.sourceTestingFramework,
      targetTestingFramework: qp.targetTestingFramework,
      qualityPlanName: qp.qualityPlanName
    })
    this.editForm.setControl('goalArray', this.setExistingGoals(qp.goalArray));
    this.editForm.setControl('questionArray', this.setExistingQuestions(qp.questionArray));
    this.editForm.setControl('QualityCharacteristics', this.setExistingQC(qp.QualityCharacteristics));
    this.editForm.setControl('measurementArray', this.setExistingMeasurement(qp.measurementArray));
    this.isReadOnly = true;
    this.data = qp;
  }

  setExistingGoals(goalset: any): FormArray {
    const existingGoalsArray = new FormArray([]);
    goalset.forEach(element => {
      existingGoalsArray.push(this.formbuilder.group({
        objectOfStudy: element.objectOfStudy,
        purpose: element.purpose,
        qualityFocus: element.qualityFocus,
        viewpoint: element.viewpoint,
        context: element.context
      }));
    });

    return existingGoalsArray;
  }

  setExistingQuestions(questionset: any): FormArray {
    const existingQuestionsArray = new FormArray([]);
    questionset.forEach(element => {
      existingQuestionsArray.push(this.formbuilder.group({
        question: element.question
      }));
    });
    return existingQuestionsArray;
  }

  // Set existing Quality Characteristics
  setExistingQC(qcSet: any): FormArray {
    const existingQCArray = new FormArray([]);
    qcSet.forEach(element => {
      existingQCArray.push(this.formbuilder.group({
        qualityCharacteristic: element.qualityCharacteristic,
        qualitySubCharacteristics: this.setExistingQSC(element.qualitySubCharacteristics)
      }));
    });
    return existingQCArray;
  }

  // Set existing Quality Sub-characteristics
  setExistingQSC(qscSet: any): FormArray {
    const existingQSCArray = new FormArray([]);
    qscSet.forEach(element => {
      existingQSCArray.push(this.formbuilder.group({
        qualitySubCharacteristic: element.qualitySubCharacteristic,
        qualityAttributes: this.setExistingQA(element.qualityAttributes)
      }));
    });
    return existingQSCArray;
  }

  // Set existing Quality Attributes
  setExistingQA(qaSet: any): FormArray {
    const existingQAArray = new FormArray([]);
    qaSet.forEach(element => {
      existingQAArray.push(this.formbuilder.group({
        questionNumber: element.questionNumber,
        qualityAttribute: element.qualityAttribute
      }));
      this.selectedQA.push(element.qualityAttribute);
    });
    return existingQAArray;
  }

  setExistingMeasurement(measurementSet: any): FormArray {
    const existingMeasurementArray = new FormArray([]);
    measurementSet.forEach(element => {
      existingMeasurementArray.push(this.formbuilder.group({
        name: element.name,
        informalDefinition: element.informalDefinition,
        possibleAction: element.possibleAction,
        measurementType: element.measurementType,
        measurementMethod: element.measurementMethod,
        scaleType: element.scaleType,
        scaleRange: element.scaleRange,
        interpretation: element.interpretation,
        thresholdValue: element.thresholdValue
      }));
    });
    return existingMeasurementArray;
  }

  // TO edit the specific quality plan
  onEdit(qp: QualityPlan) {
    this.editForm.patchValue({
      testObject: qp.testObject,
      testItem: qp.testItem,
      testSuite: qp.testSuite,
      testLevels: qp.testLevels,
      testCaseType: qp.testCaseType,
      developmentPhase: qp.developmentPhase,
      sourceTestingFramework: qp.sourceTestingFramework,
      targetTestingFramework: qp.targetTestingFramework,
      qualityPlanName: qp.qualityPlanName
    })
    this.editForm.setControl('goalArray', this.setExistingGoals(qp.goalArray));
    this.editForm.setControl('questionArray', this.setExistingQuestions(qp.questionArray));
    this.editForm.setControl('QualityCharacteristics', this.setExistingQC(qp.QualityCharacteristics));
    this.editForm.setControl('measurementArray', this.setExistingMeasurement(qp.measurementArray));
    this.isReadOnly = false;
    this.data = qp;
  }

  // To delete the specific quality plan
  onDelete(_id: string) {
    this.qualityPlanService.deleteQualityPlan(_id).subscribe();
    this.openSnackBar('Quality plan deleted successfully', null);
    this.qualityPlanList();
    this.reset();
  }

  getToolList() {
    this.toolDetailService.getToolDetailList().subscribe((res) => {
      this.toolsList = res as ToolDetail[];
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }


}
