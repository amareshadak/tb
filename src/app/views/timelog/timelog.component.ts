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
 
  columnDefs = [
      {headerName: 'Log Time', field: 'createAt', sortable: true ,valueFormatter: this.numberFormatter},
      {headerName: 'Baking Time (Sec)', field: 'bk_time' },
      {headerName: 'Product Name', field: 'reqst_type',valueFormatter: this.ProductFormatter},
      {headerName: 'T1', field: 't1'},
      {headerName: 'T2', field: 't2'},
      {headerName: 'T3', field: 't3'},
      {headerName: 'T4', field: 't4'},
      {headerName: 'T5', field: 't5'},
      {headerName: 'T6', field: 't6'}
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
        filter: true
      };
  
  }
  numberFormatter(params) {
    let date = new Date(params.value)
    return date.toLocaleString();
  }

  ProductFormatter(params) {
    return 'Marie Gold';
  }

  // onFirstDataRendered(params) {
  //   params.api.sizeColumnsToFit();
  // }

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