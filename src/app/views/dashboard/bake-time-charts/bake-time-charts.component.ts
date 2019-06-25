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
import { ChartModel } from '../../../models/chart-model';

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

  public currentDate = new Date();
  public toDateTime: Date = new Date();
  public fromDateTime: Date = new Date();
  public mainChartElements: number;
  public mainChartData1: Array<number> = [];
  public mainChartLabels: Array<string> = [];
  public chartData: Array<ChartModel> = [];
  public resetChartData: Array<ChartModel> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Baking Time'
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
          // beginAtZero: true,
          // maxTicksLimit: 10,
          // stepSize: Math.ceil(2000 / 10),
          // max: 2000
          beginAtZero: false,
          max: 300,
          min: 100,
          stepSize: 20
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
            this.mainChartLabels.push(this.datepipe.transform(chartsdate, 'short'));
            this.chartData.push(data[index]);
            this.mainChartElements = this.chartData.length;
          }
        }
      } else {
        for (let index = 0; index < data.length; index++) {
        const chartsdate = new Date(data[index].createAt);
        this.mainChartData1.push(data[index].t1);
        this.mainChartLabels.push(this.datepipe.transform(chartsdate, 'short'));
        this.chartData.push(data[index]);
        this.mainChartElements = this.chartData.length;
        }
      }
      this.chart.chart.update();
    });
  }
  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.chartData, 'sample');
 }

 exportAsPDF(): void {
  const doc = new jsPDF();
  doc.autoTable({
    html: '#divBakingTime'
  });
  doc.save('pdfname');
}


  filterByDays(): void {
    this.chartData.length = 0;
    this.mainChartData1.length = 0;
    this.mainChartLabels.length = 0;
    this.mainChartElements = 0;
    this.chart.chart.update();
    this.getBakingTValue();
  }
}
