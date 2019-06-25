import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/dashboard.service';
import { ChartModel } from '../../models/chart-model';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../Services/Excel.service';
import { PDFService } from '../../Services/PDF.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  templateUrl: 'timelog.component.html',
  styleUrls: ['./timelog.component.scss']
})
export class TimeLogComponent implements OnInit {

  private rowClassRules;

 
  columnDefs = [
      {headerName: 'Log Time', field: 'createAt', sortable: true ,valueFormatter: this.numberFormatter,suppressSizeToFit: true,width: 190},
      {headerName: 'Baking Time', field: 'bk_time' ,valueFormatter: this.bakingTimeFormatter, width: 140},
      {headerName: 'Product Name', field: 'reqst_type',valueFormatter: this.ProductFormatter,suppressSizeToFit: true,width: 150},
      {headerName: 'T1', field: 't1',width: 90},
      {headerName: 'T2', field: 't2',width: 90},
      {headerName: 'T3', field: 't3',width: 100},
      {headerName: 'T4', field: 't4',width: 100},
      {headerName: 'T5', field: 't5',width: 100},
      {headerName: 'T6', field: 't6',width: 100}
  ];
  rowData:any = [];
  public defaultColDef;
  constructor(private dashboardService: DashboardService, private excelService: ExcelService,private pdfService: PDFService) { }

  ngOnInit() {
      this.dashboardService.getBKData().subscribe((result: ChartModel[]) => {
        this.rowData = result;
      });

      this.defaultColDef = {
        sortable: true,
        resizable: true,
        filter: true,
        headerComponentParams : {
          menuIcon: 'fa-bars'
        }
      };

  }

 getRowClass = function(params) {
    if (params.node.rowIndex % 2 === 0) {
        return 'red';
    }
}

  numberFormatter(params) {
    let date = new Date(params.value)
    return date.toLocaleString();
  }

  bakingTimeFormatter(params) {
    if(params.value==999){
      return 'STOP';
    }
    else{
      return params.value;
    }
    
  }

  ProductFormatter(params) {
    return 'Marie Gold';
  }

  public gridStyle: any = {
    general: {
        normal: 'grid-eor-normal'
    },
    row: {
        general: {
            normal: 'grid-eor-row-normal',
            hovered: 'grid-eor-row-hovered',
            selected: 'grid-eor-row-selected'
        }
    }
}

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.rowData, 'sample');
  }

  exportJsonToPdf(): void {
    const doc = new jsPDF();
    doc.autoTable({
      html: '#divBaking'
    });
    doc.save(new Date() + 'BakeTimeLog');
  }

  exportAsCSV():void {
    this.excelService.exportJsonToCsv(this.rowData);
  }

  copyto(){
    var val = JSON.stringify(this.rowData);
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    alert('Copied !')
  }
}