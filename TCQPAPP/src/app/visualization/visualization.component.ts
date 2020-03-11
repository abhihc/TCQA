import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from './Data';
import { Chart } from 'node_modules/chart.js';


@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {
  data: Data[];
  url1 = 'http://localhost:4000/QualitySubCharacteristics';
  url2 = 'http://localhost:2000/QualityCharacteristics';
  qualityCharacteristic = [];
  qualitySubCharacteristic = [];
  percentage = [];
  chart1 = [];
  chart2 = [];


  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.httpClient.get(this.url1).subscribe((res: Data[]) => {
      res.forEach(y => {
        this.qualitySubCharacteristic.push(y.qualitySubCharacteristic);
        this.percentage.push(y.percentage);
      });
      this.chart1 = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.qualitySubCharacteristic,
          datasets: [{
            label: 'Percentage',
            data: this.percentage,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Quality Sub Characteristics',
            fontsize: 30
          },
          legend: {
            display: false
          },
          layout: {
            padding: {
              left: 100,
              right: 100,
              top: 10,
              bottom: 100

            }
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    });


    this.httpClient.get(this.url2).subscribe((res: Data[]) => {
      res.forEach(y => {
        this.qualityCharacteristic.push(y.qualityCharacteristic);
        this.percentage.push(y.percentage);
      })
        ;
      this.chart2 = new Chart('canvas2', {
        type: 'bar',
        data: {
          labels: this.qualityCharacteristic,
          datasets: [{
            label: 'Percentage',
            data: this.percentage,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Quality Characteristics',
            fontsize: 30
          },
          legend: {
            display: false
          },
          layout: {
            padding: {
              left: 100,
              right: 100,
              top: 50,
              bottom: 100

            }
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    });


  }

}
