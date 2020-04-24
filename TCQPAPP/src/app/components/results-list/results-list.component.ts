import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ApiService } from './../../common/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit, OnDestroy {

  closeResult: string;
  results: any = [];
  qualityPlans: any = [];

  constructor(private apiService: ApiService, private modalService: NgbModal) {
    this.getQualityPlans();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.modalService.dismissAll();
  }


  getQualityPlans(){
    this.apiService.getQualityPlans().subscribe((data) => {
     this.qualityPlans = data;
    });
  }

  showQualityPlanResults(qualityPlan, content) {
    this.apiService.getQualityPlanResults(qualityPlan).subscribe((data) => {
      this.results = data;
      this.modalService.open(content, { size: 'xl' });
     });
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
