import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../Services/dashboard.service';
import { ChartModel } from '../../../models/chart-model';

@Component({
  selector: 'app-dashboard-widgets',
  templateUrl: './dashboard-widgets.component.html',
  styleUrls: ['./dashboard-widgets.component.scss']
})
export class DashboardWidgetsComponent implements OnInit {
  constructor( private dashboardService: DashboardService) { }
  public currentBakingTime = 0 ;

  ngOnInit() {
    this.getBakingTime();
  }
  getBakingTime() {
    this.dashboardService.getBKData().subscribe((data: ChartModel[]) => {
      if (data.length > 0) {
        this.currentBakingTime = data[0].bk_time;
      }
    });
  }

}
