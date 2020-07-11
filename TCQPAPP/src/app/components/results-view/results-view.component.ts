import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ApiService } from './../../common/api.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { QualityPlanService } from './../../common/quality-plan.service';
import { QualityPlan, QualityPlanAttribute } from './../../common/quality-plan.model';
import { count } from 'console';



@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.css'],
  providers: [QualityPlanService]
})
export class ResultsViewComponent implements OnInit {

  resultData: any;
  qpName: string;
  selectedQPName: any;
  selectedTS: any;
  selectedSTF: any;
  selectedTO: any;
  viewResultForm: FormGroup;
  show: boolean = false;

  public showLegend = false;
  public xAxisLabelChart1 = 'Quality Characteristics';
  public yAxisLabelAllCharts = 'Quality Score (%)';
  public xAxisLabelChart2 = 'Quality Sub-Characteristics';
  public xAxisLabelChart3 = 'Quality Attributes';
  colorScheme = ['#336699', '#4C1C00','#98DB92', '#2F4858', '	#FF0000', '#F1BB87', '#700353' , '#320D6D'];

  customColors = [];

  yScaleMin = 0;
  yScaleMax = 100;
  yAxisTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  showXAxis = true;
  showYAxis = true;

  dataChart1 = [];
  dataChart2 = [];
  dataChart3 = [];

  highlightedChart1 = [];
  highlightedChart2 = [];
  highlightedChart3 = [];


  chartDataMapping = {
    forward: {},
    reverse: {}
  };

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private qualityPlanService: QualityPlanService
    ) { }

    ngOnInit(): void {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.getResultData(id);
       this.qualityPlanList();
    }

    mainForm() {
      this.viewResultForm = this.fb.group({
        thresholdScore: null
      });
    }

    qualityPlanList() {

      this.qualityPlanService.getQualityPlanList().subscribe((res) => {
        this.qualityPlanService.qualityPlans = res as QualityPlan[];
        this.qualityPlanService.qualityPlans.forEach(element => {
          if(element.qualityPlanName == this.qpName){
            this.selectedQPName = element.qualityPlanName;
            this.selectedTS = element.testSuite;
            this.selectedTO = element.testObject;
            this.selectedSTF = element.sourceTestingFramework;
       }
        });
      });


    }

    getResultData(id) {
      const self = this;
      this.apiService.getResult(id).subscribe(data => {
        this.resultData = data;
        let chart1Counter = 0;
        let chart2Counter = 0;
        let chart3Counter = 0;
        this.resultData.results.QualityCharacteristics.forEach((chart1D) => {
          let chart1Record = {};
          const chart1Children = [];
          self.chartDataMapping.forward[chart1Counter] = {};
          chart1D.qualitySubCharacteristics.forEach((chart2D) => {
            let chart2Record = {};
            const chart2Children = [];
            self.chartDataMapping.forward[chart1Counter][chart2Counter] = [];
            chart2D.qualityAttributes.forEach((chart3D) => {
              let chart3Record = {};
              self.chartDataMapping.reverse[chart3Counter] = {};
              self.chartDataMapping.reverse[chart3Counter][chart2Counter] = chart1Counter;
              self.chartDataMapping.forward[chart1Counter][chart2Counter].push(chart3Counter);
              chart3Record = {
                name: chart3D.qualityAttribute,
                value: chart3D.scoreQA,
                extra: {
                  parent: chart2D
                }
              };
              self.customColors.push({name: chart3D.qualityAttribute, value: self.colorScheme[chart1Counter]});
              chart2Children.push(chart3Record);
              self.dataChart3.push(chart3Record);
              chart3Counter++;
            });
            chart2Record = {
              name: chart2D.qualitySubCharacteristic,
              value: chart2D.scoreQBC,
              extra: {
                parent: chart1D,
                children: [...chart2Children]
              }
            };
            self.customColors.push({name: chart2D.qualitySubCharacteristic, value: self.colorScheme[chart1Counter]});
            chart1Children.push(chart2Record);
            self.dataChart2.push(chart2Record);
            chart2Counter++;
          });
          chart1Record = {
            name: chart1D.qualityCharacteristic,
            value: chart1D.scoreQC,
            extra: {
              children: [...chart1Children]
            }
          };
          self.customColors.push({name: chart1D.qualityCharacteristic, value: self.colorScheme[chart1Counter]});
          self.dataChart1.push(chart1Record);
          chart1Counter++;
        });
        self.dataChart1 = [...self.dataChart1];
        self.dataChart2 = [...self.dataChart2];
        self.dataChart3 = [...self.dataChart3];
        this.qpName = this.resultData.qualityPlan;
        console.log(this.qpName);

      });
    }

    decision(){
      this.show = true;
      let count: number = 0;
      let count2: number = 0;
      this.dataChart1.forEach(element => {
        count+=1;
        if(element.value>80){
          count2+=1;
        }
      });
      if(count == count2){
        console.log("Test Suite can be migrated");
      }else{
        console.log("Test Suite should not be migrated");
      }

    }

    public onInteractChart1(event): void {
      if (event && event.value && event.value.extra && event.value.extra.children && event.value.extra.children.length) {
        this.highlightedChart2 = event.value.extra.children;
        this.highlightedChart2 = [...event.value.extra.children];
        this.highlightedChart3 = [];
        for (const child of event.value.extra.children) {
          if (child.extra && child.extra.children && child.extra.children.length) {
            this.highlightedChart3 = this.highlightedChart3.concat(child.extra.children);
          }

        }
        this.highlightedChart3 = [...this.highlightedChart3];
      }
    }

    public onInteractChart2(event): void {
      this.highlightedChart3 = event.value.extra.children;
      this.highlightedChart3 = [...event.value.extra.children];

    }

    public onInteractChart3(event): void {
    }

    public onDeactivate(event): void {
      this.highlightedChart1 = [];
      this.highlightedChart2 = [];
      this.highlightedChart3 = [];
      this.highlightedChart1 = [...this.highlightedChart1];
      this.highlightedChart2 = [...this.highlightedChart2];
      this.highlightedChart3 = [...this.highlightedChart3];
    }

  }
