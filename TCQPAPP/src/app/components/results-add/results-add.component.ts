import { Router } from '@angular/router';
import { ApiService } from './../../common/api.service';
import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-results-add',
  templateUrl: './results-add.component.html',
  styleUrls: ['./results-add.component.css']
})
export class ResultsAddComponent implements OnInit {
  @ViewChild('nameInput', {static: false})
  fileUploadElement: ElementRef;

  submitted = false;
  addResultForm: FormGroup;

  newResult = {
    name: '',
    results: null
  };

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.addResultForm = this.fb.group({
      file: [null]
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      const fileNameParts = file.name.split('.');
      const fileType = fileNameParts[fileNameParts.length - 1];

      if (fileType.toLowerCase() === 'json' && file.type === 'application/json') {
        this.newResult.name = fileNameParts[0];

        try {
          JSON.parse(reader.result as string);
          this.newResult.results = JSON.parse(reader.result as string);
          this.addResultForm.get('file').updateValueAndValidity();
        } catch (e) {
            alert('Please upload a valid JSON file.');
            this.fileUploadElement.nativeElement.value = '';
            this.addResultForm.get('file').reset();
        }

      } else {
        alert('Please upload only JSON files');
        this.fileUploadElement.nativeElement.value = '';
        this.addResultForm.get('file').reset();
      }
    };
    reader.readAsText(file, 'UTF-8');
  }

  // Getter to access form control
  get myForm(){
    return this.addResultForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.addResultForm.valid) {
      return false;
    } else {
      this.apiService.addResults(this.newResult).subscribe(
        (res) => {
          this.ngZone.run(() => this.router.navigateByUrl('/results-list'));
        }, (error) => {
          console.log(error);
          alert('An error ocurred when trying to upload file. Please try again');
        });
    }
  }

}
