import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../common/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css', './../../components/style/style.component.css']
})
export class ResultsListComponent implements OnInit {

  results: any = [];
  show: boolean = false;
  qualityPlans: any = [];
  selectedItem = null;

  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) {
    this.getQualityPlans();
  }

  ngOnInit() { }

  // Get all quality plans
  getQualityPlans() {
    this.apiService.getQualityPlans().subscribe((data) => {
      this.qualityPlans = data;
    });
  }

  // Show all quality assessment results of a selected quality plan
  showQualityPlanResults(qualityPlan, content) {
    this.apiService.getQualityPlanResults(qualityPlan).subscribe((data) => {
      this.results = data;
    });
    this.selectedItem = qualityPlan;
    this.show = true;
  }

  // Delete assessment result
  deleteResult(resultToDelete, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteResult(resultToDelete._id).subscribe((data) => {
        this.results.splice(index, 1);
        this.getQualityPlans();
        this.openSnackBar('Qulity assessment deleted successfully', null);
      }
      );
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
