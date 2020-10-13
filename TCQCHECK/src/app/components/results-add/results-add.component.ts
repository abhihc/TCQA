import { Router } from '@angular/router';
import { ApiService } from './../../common/api.service';
import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { QualityPlanService } from './../../common/quality-plan.service';
import { QualityPlan, QualityPlanAttribute } from './../../common/quality-plan.model';
import { MatSnackBar } from '@angular/material/snack-bar';

// Component to add quality assessment result
@Component({
  selector: 'app-results-add',
  templateUrl: './results-add.component.html',
  styleUrls: ['./results-add.component.css', './../../components/style/style.component.css'],
  providers: [QualityPlanService]
})
export class ResultsAddComponent implements OnInit {
  @ViewChild('nameInput', { static: false })
  fileUploadElement: ElementRef;


  addResultForm: FormGroup;
  QualityCharacteristics: FormArray;

  submitted = false;
  show: boolean = false;
  isReadOnly = true;

  newResult = {
    name: '',
    results: null
  };

  qpa = new QualityPlanAttribute();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    private qualityPlanService: QualityPlanService,
    private _snackBar: MatSnackBar
  ) {
    this.mainForm();
  }

  ngOnInit() {
    this.qualityPlanList();
  }

  mainForm() {
    this.addResultForm = this.fb.group({
      file: [null],
      executionName: '',
      qualityPlan: '',
      QualityCharacteristics: this.fb.array([this.createQC()])
    });
  }

  // Form builder for Quality Characteristics
  createQC() {
    return this.fb.group({
      qualityCharacteristic: '',
      scoreQC: null,
      qualitySubCharacteristics: this.fb.array([this.createQSC()])
    })
  }

  // Form builder for Quality Sub-characteristics
  createQSC() {
    return this.fb.group({
      qualitySubCharacteristic: '',
      scoreQBC: null,
      qualityAttributes: this.fb.array([this.createQA()])
    })
  }

  // Form builder for Quality Attributes
  createQA() {
    return this.fb.group({
      qualityAttribute: '',
      scoreQA: null
    })
  }

  // Get all Quality Plans list
  qualityPlanList() {
    this.qualityPlanService.getQualityPlanList().subscribe((res) => {
      this.qualityPlanService.qualityPlans = res as QualityPlan[];
    });
  }

  // input quality assessment result
  inputResults(qp: QualityPlan) {
    this.show = true;
    this.addResultForm.patchValue({
      qualityPlan: qp.qualityPlanName
    })
    this.addResultForm.setControl('QualityCharacteristics', this.setExistingQC(qp.QualityCharacteristics));
  }

  // Set existing Quality Characteristics
  setExistingQC(qcSet: any): FormArray {
    const existingQCArray = new FormArray([]);
    qcSet.forEach(element => {
      existingQCArray.push(this.fb.group({
        qualityCharacteristic: element.qualityCharacteristic,
        scoreQC: null,
        qualitySubCharacteristics: this.setExistingQSC(element.qualitySubCharacteristics)
      }));
    });
    return existingQCArray;
  }

  // Set existing Quality Sub-characteristics
  setExistingQSC(qscSet: any): FormArray {
    const existingQSCArray = new FormArray([]);
    qscSet.forEach(element => {
      existingQSCArray.push(this.fb.group({
        qualitySubCharacteristic: element.qualitySubCharacteristic,
        scoreQBC: null,
        qualityAttributes: this.setExistingQA(element.qualityAttributes)
      }));
    });
    return existingQSCArray;
  }

  // Set existing Quality Attributes
  setExistingQA(qaSet: any): FormArray {
    const existingQAArray = new FormArray([]);
    qaSet.forEach(element => {
      existingQAArray.push(this.fb.group({
        qualityAttribute: element.qualityAttribute,
        scoreQA: null
      }));
    });
    return existingQAArray;
  }

  // Set score of Quality Characteristics
  setValueQC(qcs) {
    for (var index in qcs) {
      qcs[index].scoreQC = this.averageQSC(qcs[index].qualitySubCharacteristics);
    }
  }

  // Average of Quality Sub-characteristics Score
  averageQSC(qscs) {
    for (var index in qscs) {
      qscs[index].scoreQBC = this.averageQA(qscs[index].qualityAttributes);
    }
    let sum: number = 0;
    let count: number = 0;
    let average: number = 0;
    for (var index in qscs) {
      sum = sum + qscs[index].scoreQBC;
      count += 1;
    }
    average = (sum / count);
    return average;
  }

  // Average of Quality Attributes Score
  averageQA(qas) {
    let sum: number = 0;
    let count: number = 0;
    let average: number = 0;
    for (var index in qas) {
      sum = sum + qas[index].scoreQA;
      count += 1;
    }
    average = (sum / count);
    return average;
  }

  // Save quality assessment result of a specific quality plan
  onSubmit() {
    this.setValueQC(this.addResultForm.value['QualityCharacteristics']);
    this.submitted = true;
    this.newResult.name = this.addResultForm.value['executionName'];
    this.newResult.results = this.addResultForm.value;

    this.apiService.addResults(this.newResult).subscribe(
      (res) => {
        this.openSnackBar('Quality assessment added successfully', null);
        this.ngZone.run(() => this.router.navigateByUrl('/results-list'));
      }, (error) => {
        alert('An error ocurred when trying to input the results. Please try again.');
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
