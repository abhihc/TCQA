import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Result } from './../../common/result';
import { QualityPlan } from './../../common/quality-plan.model';
import { ToolDetail } from './../../common/toolDetail.model';
import { ApiService } from './../../common/api.service';
import { QualityPlanService } from './../../common/quality-plan.service';
import { ToolDetailService } from './../../common/toolDetail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [QualityPlanService, ToolDetailService]
})
export class HomeComponent implements OnInit {

  resultData: any;
  viewResultForm: FormGroup;
  show: boolean = false;
  checkid: string;
  noOfQPs: number = 0;
  noOfExecutions: number = 0;
  noofTools: number = 0;

  public showLegend = false;
  public xAxisLabelChart1 = 'Quality Characteristics';
  public yAxisLabelAllCharts = 'Quality Score (%)';
  colorScheme = ['#336699', '#4C1C00', '#98DB92', '#2F4858', '	#FF0000', '#F1BB87', '#700353', '#320D6D'];

  customColors = [];

  yScaleMin = 0;
  yScaleMax = 100;
  yAxisTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  showXAxis = true;
  showYAxis = true;

  dataChart1 = [];

  chartDataMapping = {
    forward: {},
    reverse: {}
  };


  constructor(private apiService: ApiService, public fb: FormBuilder,
    private actRoute: ActivatedRoute, private qualityPlanService: QualityPlanService, private toolDetailService: ToolDetailService) { }

  ngOnInit(): void {
    this.getID();
    this.qualityPlanList();
    this.toolList();
  }

  mainForm() {
    this.viewResultForm = this.fb.group({
      thresholdScore: null
    });
  }

  qualityPlanList() {
    this.qualityPlanService.getQualityPlanList().subscribe((res) => {
      this.qualityPlanService.qualityPlans = res as QualityPlan[];
      this.noOfQPs = this.qualityPlanService.qualityPlans.length;
    });
  }

  toolList() {
    this.toolDetailService.getToolDetailList().subscribe((res) => {
      this.toolDetailService.Tools = res as ToolDetail[];
      this.noofTools = this.toolDetailService.Tools.length;
    });
  }

  getID() {
    let currentid: string = "";
    this.apiService.getResults().subscribe((res) => {
      this.apiService.results = res as Result[];
      this.noOfExecutions = this.apiService.results.length;
      currentid = this.apiService.results[this.apiService.results.length - 1]._id;
      this.checkid = currentid;
      console.log(this.checkid);
      this.getResultData(currentid);
    });
  }

  getResultData(id) {
    const self = this;
    this.apiService.getResult(id).subscribe(data => {
      this.resultData = data;
      let chart1Counter = 0;
      this.resultData.results.QualityCharacteristics.forEach((chart1D) => {
        let chart1Record = {};
        self.chartDataMapping.forward[chart1Counter] = {};
        chart1Record = {
          name: chart1D.qualityCharacteristic,
          value: chart1D.scoreQC,
        };
        self.customColors.push({ name: chart1D.qualityCharacteristic, value: self.colorScheme[chart1Counter] });
        self.dataChart1.push(chart1Record);
        chart1Counter++;
      });
      self.dataChart1 = [...self.dataChart1];
    });
  }

}
