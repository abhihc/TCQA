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
  title: 'Graph';
  data: Data[];
  url = 'http://localhost:4000/qualityCharacteristic';
  qualityCharacteristic = [];
  qualitySubCharacteristic = [];
  percentage = [];
  chart = [];
  

  constructor(private httpClient: HttpClient) {

   }

  ngOnInit() {
    this.httpClient.get(this.url).subscribe((res: Data[]) => {
      
      
      res.forEach(y => {
        this.qualityCharacteristic.push(y.qualityCharacteristic)
        this.qualitySubCharacteristic.push(y.qualitySubCharacteristic);
        this.percentage.push(y.percentage);
      });
      this.chart = new Chart('canvas', {
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
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
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
          legend:{
            display: false
          },
          layout:{
            padding:{
              left:100,
              right:100,
              top:100,
              bottom:100
            
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
