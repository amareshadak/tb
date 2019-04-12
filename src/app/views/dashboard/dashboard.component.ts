import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'dashboard.component.html',
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  constructor(public datepipe: DatePipe) { }

  // tslint:disable-next-line:max-line-length
  chartData: Array<any> = [{'id': '1554878886230', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554888043666', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554888250690', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554888369789', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554888387324', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554888744742', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554888807296', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '300', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554888863491', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '100', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554888921884', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '23'}, {'id': '1554914618467', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554951699518', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554955211318', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554969840225', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554970508651', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554999945638', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}, {'id': '1554999947349', 't1': '366', 't2': '380', 't3': '355', 't4': '367', 't5': '366', 't6': '342', 'reqst_type': '1', 'plantid': '1', 'lineid': '1', 'prodid': '1', 'bk_time': '223'}];

  // mainChart

  public mainChartElements: number;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];
  public mainChartData4: Array<number> = [];
  public mainChartData5: Array<number> = [];
  public mainChartData6: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'T1'
    },
    {
      data: this.mainChartData2,
      label: 'T2'
    },
    {
      data: this.mainChartData3,
      label: 'T3'
    },
    {
      data: this.mainChartData4,
      label: 'T4'
    },
    {
      data: this.mainChartData5,
      label: 'T5'
    },
    {
      data: this.mainChartData6,
      label: 'T6'
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<string> = []; // = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: number) {
            return value;
            // return  this.datepipe.transform(this.date, 'yyyy-MM-dd');
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 6),
          max: 500
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: true
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: 'transparent',
      borderColor: '#63c2de',
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: '#6610f2',
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: '#e83e8c', // getStyle('--primary'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: '#f86c6b',
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: '#ffc107',
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: '#17a2b8',
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = true;
  public mainChartType = 'line';


  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnInit(): void {
    this.mainChartElements = this.chartData.length;
    // generate random values for mainChart
    this.chartData.forEach(element => {
      this.mainChartData1.push(element.t1);
      this.mainChartData2.push(element.t2);
      this.mainChartData3.push(element.t3);
      this.mainChartData4.push(element.t4);
      this.mainChartData5.push(element.t5);
      this.mainChartData6.push(element.t6);

      console.log(new Date(element.id));
      let date = new Date(element.id);
      alert(element.id)
      this.mainChartLabels.push(date);
    });

  }
}
