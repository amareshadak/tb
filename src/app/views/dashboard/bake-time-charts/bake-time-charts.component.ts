import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Component, OnInit, ViewChild, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { timeout } from 'q';
import { DomSanitizer } from '@angular/platform-browser';
import { PDFService } from '../../../Services/PDF.service';
import { ExcelService } from '../../../Services/Excel.service';
import { DashboardService } from '../../../Services/dashboard.service';

@Component({
  selector: 'app-bake-time-charts',
  templateUrl: './bake-time-charts.component.html',
  styleUrls: ['./bake-time-charts.component.scss']
})
export class BakeTimeChartsComponent implements OnInit {
  radioModel = '5s';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
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
  chartData: Array<any>;

  // mainChart
  public currentDate = new Date();
  public toDateTime: Date;
  public fromDateTime: Date;
  public mainChartElements: number;
  public mainChartData1: Array<number> = [];
  public mainChartLabels: Array<string> = [];
  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Backing Time'
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
          callback: function(value: any) {
            return value;
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 10,
          stepSize: Math.ceil(500 / 10),
          max: 500
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
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public mainChartLegend = true;
  public mainChartType = 'line';
  public count = true;
  ngOnInit() {
    this.getBackingTValue();
    setInterval(() => {
      this.getBackingTValue();
    }, 10000);
  }

  getBackingTValue() {
    if (this.radioModel === '5s') {
      this.fromDateTime = new Date();
      this.fromDateTime.setMinutes(this.fromDateTime.getMinutes() - 10);
      this.toDateTime = new Date();
   } else if (this.radioModel === '1days') {
     this.fromDateTime = new Date();
      this.fromDateTime.setDate(this.fromDateTime.getDate() - 1);
      this.toDateTime = new Date();
   } else if (this.radioModel === '15days') {
     this.fromDateTime = new Date();
      this.fromDateTime.setDate(this.fromDateTime.getDate() - 15);
      this.toDateTime = new Date();
   } else if (this.radioModel === '30days') {
     this.fromDateTime = new Date();
      this.fromDateTime.setDate(this.fromDateTime.getDate() - 30);
      this.toDateTime = new Date();
   } else if (this.radioModel === '180days') {
     this.fromDateTime = new Date();
      this.fromDateTime.setDate(this.fromDateTime.getDate() - 180);
      this.toDateTime = new Date();
   }




    // tslint:disable-next-line:max-line-length
    this.dashboardService.getBKData(this.datepipe.transform(this.fromDateTime, 'yyyy-MM-dd_HH:mm:ss'), this.datepipe.transform(this.toDateTime, 'yyyy-MM-dd_HH:mm:ss')).subscribe((data: any[]) => {
      if (this.count) {
        this.chartData = data;
        this.mainChartElements = this.chartData.length;
      }
      data.forEach(element => {
        const date = new Date(element.createAt);
        // alert(this.chartData[this.mainChartElements - 1].createAt);
        const lastDate = new Date(this.chartData[this.mainChartElements - 1].createAt);
        if ((date > lastDate) || this.count) {
        this.mainChartData1.push(element.bk_time);
        this.mainChartLabels.push(this.datepipe.transform(date, 'short'));
        this.chartData.push(element);
        this.mainChartElements = this.chartData.length;
        }
      });
      this.count = false;
      this.chart.chart.update();
    });
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.chartData, 'sample');
 }

 exportAsPDF(): void {
  const doc = new jsPDF();
  doc.autoTable({
    html: '#divBackingTime'
  });
  doc.save('pdfname');
}


  filterByDays(): void {
    this.count = true;
    this.chartData = [];
    this.getBackingTValue();
  }
}
