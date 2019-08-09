import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { PDFService } from './../../Services/PDF.service';
import { DashboardService } from './../../Services/dashboard.service';
import { Component, OnInit, ViewChild, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { timeout } from 'q';
import { DomSanitizer } from '@angular/platform-browser';
import { ExcelService } from '../../Services/Excel.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  constructor(
    public datepipe: DatePipe,
    private dashboardService: DashboardService,
    sanitizer: DomSanitizer,
    private excelService: ExcelService,
    private pdfService: PDFService
    ) {
  }
  ngOnInit() {
  }
}
