import { ToolDetail } from './../../common/toolDetail.model';
import { ToolDetailService } from './../../common/toolDetail.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
  providers: [ToolDetailService]
})
export class ToolsComponent implements OnInit {

  toolForm: FormGroup;
  toolArray: FormArray;
  toolsList: ToolDetail[];
  isEditMode: boolean = false;

  constructor(private toolDetailService: ToolDetailService, public formbuilder: FormBuilder, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getToolList();
    this.reset();
    this.toolForm = this.formbuilder.group({
      id: [''],
      qualityAttribute: [''],
      toolName: [''],
      toolInfo: ['']
    })
  }

  getToolList() {
    this.toolDetailService.getToolDetailList().subscribe((res) => {
      this.toolsList = res as ToolDetail[];
    });
  }

  onEdit(t: ToolDetail) {
    this.toolForm.patchValue({
      id: t._id,
      qualityAttribute: t.qualityAttribute,
      toolName: t.toolName,
      toolInfo: t.toolInfo
    });
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

  onSubmit(form: NgForm) {

    const toolData = {
      qualityAttribute: form.value.qualityAttribute,
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
    this.toolDetailService.selectedTool = {
      _id: "",
      qualityAttribute: "",
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



}
