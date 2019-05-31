import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/dashboard.service';
import { ChartModel } from '../../models/chart-model';

@Component({
  templateUrl: 'timelog.component.html',
  styleUrls: ['./timelog.component.scss']
})
export class TimeLogComponent implements OnInit {
 
  columnDefs = [
      {headerName: 'Log Time', field: 'createAt', sortable: true ,valueFormatter: this.numberFormatter},
      {headerName: 'Baking Time (Sec)', field: 'bk_time' },
      {headerName: 'Request Type', field: 'reqst_type'},
      {headerName: 'T1', field: 't1'},
      {headerName: 'T2', field: 't2'},
      {headerName: 'T3', field: 't3'},
      {headerName: 'T4', field: 't4'},
      {headerName: 'T5', field: 't5'},
      {headerName: 'T6', field: 't6'}
  ];
  rowData:any = [];
private defaultColDef;
  constructor(private dashboardService: DashboardService,) {

  }

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
    return params.values;
  }
}
