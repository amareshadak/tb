import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { PDFService } from '../../../Services/PDF.service';
import { DashboardService } from '../../../Services/dashboard.service';
import { Component,OnInit,ViewChild,SecurityContext } from '@angular/core';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { DomSanitizer } from '@angular/platform-browser';
import { ExcelService } from '../../../Services/Excel.service';
import { ChartModel, ResponseChartModel } from '../../../models/chart-model';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { BakingTimeConfig } from '../../../models/baking-time-config';

@Component({
  selector: 'app-baking-time-zone-five',
  templateUrl: './baking-time-zone-five.component.html',
  styleUrls: ['./baking-time-zone-five.component.scss']
})
export class BakingTimeZoneFiveComponent implements OnInit {
  radioModel = '5s';
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  lowerLimit: any;
  upperLimit: any;
  constructor(
    public datepipe: DatePipe,
    private dashboardService: DashboardService,
    sanitizer: DomSanitizer,
    private excelService: ExcelService,
    private pdfService: PDFService
  ) {
  }

  // mainChart
  public currentDate = new Date();
  public toDateTime: Date = new Date();
  public fromDateTime: Date = new Date();
  public mainChartElements: number;
  public mainZoneData: Array < number > = [];
  public zoneUpperLimit: Array < number > = [];
  public zoneLowerLimit: Array < number > = [];
  public lowerValue: number;
  public upperValue: number;




  public mainChartLabels: Array < string > = [];
  public chartData: Array < ChartModel > = [];
  public resetChartData: Array < ChartModel > = [];
  public index = 0;
  public mainChartData: Array < any > = [
    {
      data: this.zoneUpperLimit,
      label: 'Upper Tolerance'
    },
    {
      data: this.mainZoneData,
      label: 'Zone 5'
    },
    
    {
      data: this.zoneLowerLimit,
      label: 'Lower Tolerance'
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
      display: false
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


  public mainChartColours: Array < any > = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    },
    { // brandSuccess
      backgroundColor: hexToRgba(getStyle('--success'), 10),
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    }
  ];



  public mainChartLegend = true;
  public mainChartType = 'line';
  public count = true;
  ngOnInit() {
    this.getBakingTValue();
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

    this.dashboardService.getBakeTimeConfig().subscribe((data: BakingTimeConfig[]) => {
      data.forEach(element => {
        if ('1' == element.product_id) {
          this.lowerLimit = element.t5_lower_limit;
          this.upperLimit = element.t5_upper_limit;
        }
      });
    })
    
    // tslint:disable-next-line:max-line-length
    this.dashboardService.getBKData(this.datepipe.transform(this.fromDateTime, 'yyyy-MM-dd_HH:mm:ss'), this.datepipe.transform(this.toDateTime, 'yyyy-MM-dd_HH:mm:ss')).subscribe((res: ResponseChartModel) => {
      let data = res.payload;
      const ckvalidity = this.chartData === undefined ? 0 : this.chartData.length;
      if (ckvalidity > 0) {
        for (let index = 0; index < data.length; index++) {
          const chartsdate = new Date(data[index].createAt);
          const lastDate = new Date(this.chartData[this.chartData.length - 1].createAt);
          if (chartsdate > lastDate) {
            this.mainZoneData.push(data[index].t5);
            this.zoneUpperLimit.push(this.upperLimit);
            this.zoneLowerLimit.push(this.lowerLimit);
            this.mainChartLabels.push(this.datepipe.transform(data[index].createAt, 'M/d/yy, h:mm a'));
            this.chartData.push(data[index]);
            this.mainChartElements = this.chartData.length;
          }
        }
      } else {
        for (let index = 0; index < data.length; index++) {
          const chartsdate = new Date(data[index].createAt);
          this.mainZoneData.push(data[index].t5);
          this.zoneUpperLimit.push(this.upperLimit);
            this.zoneLowerLimit.push(this.lowerLimit);
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
    this.mainZoneData.length = 0;
    this.zoneUpperLimit.length = 0;
    this.zoneLowerLimit.length = 0;
    this.mainChartLabels.length = 0;
    this.mainChartElements = 0;
    this.chart.chart.update();
    this.getBakingTValue();
  }
}
