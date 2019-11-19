import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { PDFService } from '../../../Services/PDF.service';
import { DashboardService } from '../../../Services/dashboard.service';
import { Component,OnInit,ViewChild,SecurityContext, Input } from '@angular/core';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { DomSanitizer } from '@angular/platform-browser';
import { ExcelService } from '../../../Services/Excel.service';
import { ChartModel } from '../../../models/chart-model';


@Component({
  selector: 'app-bake-charts',
  templateUrl: './bake-charts.component.html',
  styleUrls: ['./bake-charts.component.scss']
})
export class BakeChartsComponent implements OnInit {
  radioModel = '5s';
  @Input() bakeTime: any;
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(
    public datepipe: DatePipe,
    private dashboardService: DashboardService,
    sanitizer: DomSanitizer,
    private excelService: ExcelService,
    private pdfService: PDFService
  ) {
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html);
  }
  title = 'Welcome word';
  content = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
  html = `<span class="btn btn-warning">Never trust not sanitized <code>HTML</code>!!!</span>`;

  // tslint:disable-next-line:max-line-length


  // mainChart
  public currentDate = new Date();
  public toDateTime: Date = new Date();
  public fromDateTime: Date = new Date();
  public mainChartElements: number;
  public mainChartData1: Array < number > = [];
  public mainChartData2: Array < number > = [];
  public mainChartData3: Array < number > = [];
  public mainChartData4: Array < number > = [];
  public mainChartData5: Array < number > = [];
  public mainChartData6: Array < number > = [];




  public mainChartLabels: Array < string > = [];
  public chartData: Array < ChartModel > = [];
  public resetChartData: Array < ChartModel > = [];
  public index = 0;
  public mainChartData: Array < any > = [{
      data: this.mainChartData1,
      label: 'Zone 1'
    },
    {
      data: this.mainChartData2,
      label: 'Zone 2'
    },
    {
      data: this.mainChartData3,
      label: 'Zone 3'
    },
    {
      data: this.mainChartData4,
      label: 'Zone 4'
    },
    {
      data: this.mainChartData5,
      label: 'Zone 5'
    },
    {
      data: this.mainChartData6,
      label: 'Zone 6'
    }
  ];

  public mainChartDataZone1: Array < any > = [
  {
    data: this.mainChartData1,
    label: 'Zone 1'
  }
];

public mainChartDataZone2: Array < any > = [
 
  {
    data: this.mainChartData2,
    label: 'Zone 2'
  }
];
public mainChartDataZone3: Array < any > = [
 
  {
    data: this.mainChartData3,
    label: 'Zone 3'
  }
];
public mainChartDataZone4: Array < any > = [
 
  {
    data: this.mainChartData4,
    label: 'Zone 4'
  }
];
public mainChartDataZone5: Array < any > = [
 
  {
    data: this.mainChartData5,
    label: 'Zone 5'
  }
];

public mainChartDataZone6: Array < any > = [
 
  {
    data: this.mainChartData6,
    label: 'Zone 6'
  }
];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return {
            backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor
          };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: true,
        },
        ticks: {
          callback: function (value: any) {
            return value;
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: false,
          max: 350,
          min: 100,
          stepSize: 25
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 1,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: true
    }
  };

  public zoneChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return {
            backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor
          };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: true,
        },
        ticks: {
          callback: function (value: any) {
            return value;
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: false,
          max: 350,
          min: 100,
          stepSize: 25
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 1,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };


  public mainChartColours: Array < any > = [{ // brandInfo
      backgroundColor: 'transparent',
      borderColor: '#0000FF',
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: '#1BE262',
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: '#DC3545', // getStyle('--primary'),
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
      pointHoverBackgroundColor: '#fff'
    }
  ];



  public mainChartLegend = true;
  public mainChartType = 'line';
  public count = true;
  ngOnInit() {
    this.getBakingTValue();
    // setInterval(() => {
    //   this.getBakingTValue();
    // }, 10000000);
  }

  getBakingTValue() {
    const date = new Date();
    this.fromDateTime = new Date();
    if (this.radioModel === '5s') {
      this.fromDateTime = this.addMinutes(date, -60);
      this.toDateTime = date;
    } else if (this.radioModel === '1day') {
      this.fromDateTime.setDate(date.getDate() - 1);
      this.toDateTime = new Date();
    } else if (this.radioModel === '15days') {
      this.fromDateTime.setDate(date.getDate() - 15);
      this.toDateTime = new Date();
    } else if (this.radioModel === '30days') {
      this.fromDateTime.setDate(date.getDate() - 30);
      this.toDateTime = new Date();
    } else if (this.radioModel === '180days') {
      this.fromDateTime.setDate(date.getDate() - 180);
      this.toDateTime = new Date();
    }

    
    // tslint:disable-next-line:max-line-length
    this.dashboardService.getBKData(this.datepipe.transform(this.fromDateTime, 'yyyy-MM-dd_HH:mm:ss'), this.datepipe.transform(this.toDateTime, 'yyyy-MM-dd_HH:mm:ss')).subscribe((data: ChartModel[]) => {
      const ckvalidity = this.chartData === undefined ? 0 : this.chartData.length;
      if (ckvalidity > 0) {
        for (let index = 0; index < data.length; index++) {
          const chartsdate = new Date(data[index].createAt);
          const lastDate = new Date(this.chartData[this.chartData.length - 1].createAt);
          if (chartsdate > lastDate) {
            this.mainChartData1.push(data[index].t1);
            this.mainChartData2.push(data[index].t2);
            this.mainChartData3.push(data[index].t3);
            this.mainChartData4.push(data[index].t4);
            this.mainChartData5.push(data[index].t5);
            this.mainChartData6.push(data[index].t6);
            this.mainChartLabels.push(this.datepipe.transform(data[index].createAt, 'M/d/yy, h:mm a'));
            this.chartData.push(data[index]);
            this.mainChartElements = this.chartData.length;
          }
        }
      } else {
        for (let index = 0; index < data.length; index++) {
          const chartsdate = new Date(data[index].createAt);
          this.mainChartData1.push(data[index].t1);
          this.mainChartData2.push(data[index].t2);
          this.mainChartData3.push(data[index].t3);
          this.mainChartData4.push(data[index].t4);
          this.mainChartData5.push(data[index].t5);
          this.mainChartData6.push(data[index].t6);
          this.mainChartLabels.push(this.datepipe.transform(data[index].createAt, 'M/d/yy, h:mm a'));
          this.chartData.push(data[index]);
          this.mainChartElements = this.chartData.length;
        }
      }
      this.chart.chart.update();
      this.chart.chart.resize();
    });
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.chartData, 'sample');
  }

  exportAsPDF(): void {
    const doc = new jsPDF();
    doc.autoTable({
      html: '#divBaking'
    });
    doc.save('pdfname');
  }

  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  filterByDays(): void {
    this.chartData.length = 0;
    this.mainChartData1.length = 0;
    this.mainChartData2.length = 0;
    this.mainChartData3.length = 0;
    this.mainChartData4.length = 0;
    this.mainChartData5.length = 0;
    this.mainChartData6.length = 0;
    this.mainChartLabels.length = 0;
    this.mainChartElements = 0;
    this.chart.chart.update();
    this.getBakingTValue();
  }
}
