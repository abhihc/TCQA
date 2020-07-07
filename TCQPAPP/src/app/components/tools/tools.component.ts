import { ToolDetail } from './../../common/toolDetail.model';
import { ToolDetailService } from './../../common/toolDetail.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
  providers: [ToolDetailService]
})
export class ToolsComponent implements OnInit {

  toolForm: FormGroup;
  toolArray: FormArray;

  constructor(private toolDetailService: ToolDetailService, public formbuilder: FormBuilder) {
  }

  ngOnInit() {
    this.toolList();
    this.reset();
    this.toolForm = this.formbuilder.group({
      _id: [''],
      qualityAttribute: [''],
      toolInfo: ['']
    })
  }

  reset(form?: NgForm) {
    if (form)
      form.reset();
    this.toolDetailService.selectedTool = {
      _id: "",
      qualityAttribute: "",
      toolInfo: ""
    }
  }

  onSubmit(form: NgForm) {
    this.toolDetailService.postToolDetail(form.value).subscribe((res) => {
      this.reset(form);
      alert('Tool Details saved successfully');
      location.reload();
    })
  }

  toolList() {
    this.toolDetailService.getToolDetailList().subscribe((res) => {
      this.toolDetailService.Tools = res as ToolDetail[];
    });
    console.log(this.toolDetailService.Tools);
  }
  

}
