import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormArray, FormControl, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { QualityPlanService } from './../../common/quality-plan.service';
import { QualityPlan, QualityPlanAttribute } from './../../common/quality-plan.model';
import { reduce } from 'rxjs/operators';

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
      testLevels: [{ value: '', disabled: true }],
      testCaseType: [{ value: '', disabled: true }],
      developmentPhase: [{ value: '', disabled: true }],
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

  createMeasurement(): FormGroup {
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
    form.value._id = this.data._id;
    // console.log(form.value);
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
    //console.log(qp);
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
    this.editForm.setControl('qualityFactorArray', this.setExistingQualityFactor(qp.qualityFactorArray));
    this.editForm.setControl('measurementArray', this.setMeasurement(qp.measurementArray));
    //console.log(this.editForm.value);
    this.isReadOnly = true;
    this.buttonDisable = true;
    this.editForm.get('testLevels').disable();
    this.editForm.get('testCaseType').disable();
    this.editForm.get('developmentPhase').disable();
    this.editForm.get('goalArray').disable();
    this.editForm.get('questionArray').disable();
    this.editForm.get('qualityFactorArray').disable();
    this.editForm.get('measurementArray').disable();
    this.data = qp;
   // console.log(this.data)
  }

  setExistingGoals(goalset: any): FormArray {
    const formArray = new FormArray([]);
    goalset.forEach(element => {
      formArray.push(this.formbuilder.group({
        objectOfStudy: element.objectOfStudy,
        purpose: element.purpose,
        qualityFocus: element.qualityFocus,
        viewpoint: element.viewpoint,
        context: element.context
      }));
    });

    return formArray;
  }

  setExistingQuestions(questionset: any): FormArray {
    const formArray = new FormArray([]);
    questionset.forEach(element => {
      formArray.push(this.formbuilder.group({
        question: element.question
      }));
    });
    return formArray;
  }

  setExistingQualityFactor(qualityFactorSet: any): FormArray {
    const formArray = new FormArray([]);
    qualityFactorSet.forEach(element => {
      formArray.push(this.formbuilder.group({
        qualityCharacteristic: element.qualityCharacteristic,
        qualitySubCharacteristic: element.qualitySubCharacteristic,
        qualityAttribute: element.qualityAttribute
      }));
    });
    return formArray;
  }

  setMeasurement(measurementSet: any): FormArray {
    const formArray = new FormArray([]);
    measurementSet.forEach(element => {
      formArray.push(this.formbuilder.group({
        name: element.name,
        informalDefinition: element.informalDefinition,
        measurementType: element.measurementType,
        measurementMethod: element.measurementMethod,
        scaleType: element.scaleType,
        scaleRange: element.scaleRange,
        interpretation: element.interpretation
      }));
    });
    return formArray;
  }

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
    this.editForm.setControl('qualityFactorArray', this.setExistingQualityFactor(qp.qualityFactorArray));
    this.editForm.setControl('measurementArray', this.setMeasurement(qp.measurementArray));
    this.isReadOnly = false;
    this.buttonDisable = false;
    this.editForm.get('testLevels').enable();
    this.editForm.get('testCaseType').enable();
    this.editForm.get('developmentPhase').enable();
    this.editForm.get('goalArray').enable();
    this.editForm.get('questionArray').enable();
    this.editForm.get('qualityFactorArray').enable();
    this.editForm.get('measurementArray').enable();
    this.data = qp;
  }

  onDelete(_id: string) {
    this.buttonDisable = true;
    this.qualityPlanService.deleteQualityPlan(_id).subscribe();
    this.qualityPlanList();
    this.reset();
    location.reload();
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
}
