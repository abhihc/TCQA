import { Result } from './../../common/result';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ApiService } from './../../common/api.service';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  closeResult: string;
  results: any = [];
  show: boolean = false;
  qualityPlans: any = [];

  constructor(private apiService: ApiService) {
    this.getQualityPlans();
  }

  ngOnInit() {}

  

  getQualityPlans(){
    this.apiService.getQualityPlans().subscribe((data) => {
     this.qualityPlans = data;
    });
    
    
    
  }

  showQualityPlanResults(qualityPlan, content) {
    this.apiService.getQualityPlanResults(qualityPlan).subscribe((data) => {
      this.results = data;
     });
     this.show = true;
  }

  deleteResult(resultToDelete, index) {
    if (window.confirm('Are you sure?')) {
        this.apiService.deleteResult(resultToDelete._id).subscribe((data) => {
          this.results.splice(index, 1);
          this.getQualityPlans();
        }
      );
    }
  }

}
