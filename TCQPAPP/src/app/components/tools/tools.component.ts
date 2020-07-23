import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ToolDetail } from './../../common/toolDetail.model';
import { ToolDetailService } from './../../common/toolDetail.service';

import { QualityPlanService } from './../../common/quality-plan.service';
import { QualityPlan } from './../../common/quality-plan.model';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css', './../../components/style/style.component.css'],
  providers: [ToolDetailService]
})
export class ToolsComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  qualityAttributeCtrl = new FormControl();
  filteredQualityAttributes: Observable<string[]>;
  qualityAttributes: string[] = [];
  allQualityAttributes: string[] = []; // set of quality attributes from quality plans created
  qualtiyAttributesArray: string[] = [];

  @ViewChild('qualityAttributeInput') qualityAttributeInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  toolForm: FormGroup;
  toolArray: FormArray;
  toolsList: ToolDetail[];
  isEditMode: boolean = false;

  constructor(private qualityPlanService: QualityPlanService, private toolDetailService: ToolDetailService, public formbuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.filteredQualityAttributes = this.qualityAttributeCtrl.valueChanges.pipe(
      startWith(null),
      map((qualityAttribute: string | null) => qualityAttribute ? this._filter(qualityAttribute) : this.allQualityAttributes.slice()));
  }

  ngOnInit() {
    this.getToolList();
    this.getQAList();
    this.reset();
    this.toolForm = this.formbuilder.group({
      id: [''],
      qualityAttribute: [[]],
      toolName: [''],
      toolInfo: ['']
    })
  }

  getToolList() {
    this.toolDetailService.getToolDetailList().subscribe((res) => {
      this.toolsList = res as ToolDetail[];
    });
  }

  // Get list of all quality attributes defined in the quality plans
  getQAList() {
    this.qualityPlanService.getQualityPlanList().subscribe((res) => {
      this.qualityPlanService.qualityPlans = res as QualityPlan[];
      this.qualityPlanService.qualityPlans.forEach(element => {
        element.QualityCharacteristics.forEach(element2 => {
          element2.qualitySubCharacteristics.forEach(element3 => {
            element3.qualityAttributes.forEach(element4 => {
              this.qualtiyAttributesArray.push(element4.qualityAttribute);
            });
          });
        });
      });
      let flag = 0;
      for (let i = 0; i < this.qualtiyAttributesArray.length; i++) {
        flag = 0;
        for (let j = i + 1; j < this.qualtiyAttributesArray.length; j++) {
          if (this.qualtiyAttributesArray[i] == this.qualtiyAttributesArray[j]) {
            flag = 1;
          }
        }
        if (flag == 0) {
          this.allQualityAttributes.push(this.qualtiyAttributesArray[i]);
        }
      }
    });



  }

  onEdit(t: ToolDetail) {
    this.toolForm.patchValue({
      id: t._id,
      qualityAttribute: t.qualityAttribute,
      toolName: t.toolName,
      toolInfo: t.toolInfo
    });
    this.qualityAttributes = t.qualityAttribute;

    this.toolForm.setControl('id', this.formbuilder.control(t._id));
    this.toolForm.setControl('qualityAttribute', this.formbuilder.control(t.qualityAttribute));
    this.toolForm.setControl('toolName', this.formbuilder.control(t.toolName));
    this.toolForm.setControl('toolInfo', this.formbuilder.control(t.toolInfo));
    this.isEditMode = true;
  }

  onDelete(id: string) {
    this.toolDetailService.deleteToolDetail(id).subscribe((res) => {
      this.openSnackBar('Tool deleted successfully', null);
      this.getToolList();
    })
  }

  // Save tool information
  onSubmit(form: NgForm) {

    const toolData = {
      qualityAttribute: this.qualityAttributes,
      toolName: form.value.toolName,
      toolInfo: form.value.toolInfo
    } as ToolDetail;

    if (this.isEditMode) {
      this.toolDetailService.putToolDetail(toolData, form.value.id).subscribe((res) => {
        this.reset(form);
        this.openSnackBar('Tool updated successfully', null);
        this.getToolList();
        this.isEditMode = false;
      })
    } else {
      this.toolDetailService.postToolDetail(toolData).subscribe((res) => {
        this.reset(form);
        this.openSnackBar('Tool created successfully', null);
        this.getToolList();
      })
    }

  }

  reset(form?: NgForm) {
    if (form)
      form.reset();
    this.qualityAttributes = [];
    this.toolDetailService.selectedTool = {
      _id: "",
      qualityAttribute: [],
      toolName: "",
      toolInfo: ""
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our qualityAttribute
    if ((value || '').trim()) {
      this.qualityAttributes.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.qualityAttributeCtrl.setValue(null);
  }

  remove(qualityAttribute: string): void {
    const index = this.qualityAttributes.indexOf(qualityAttribute);

    if (index >= 0) {
      this.qualityAttributes.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.qualityAttributes.push(event.option.viewValue);
    this.qualityAttributeInput.nativeElement.value = '';
    this.qualityAttributeCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allQualityAttributes.filter(qualityAttribute => qualityAttribute.toLowerCase().indexOf(filterValue) === 0);
  }

}
