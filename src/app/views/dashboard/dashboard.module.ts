import { BakeTimeChartsComponent } from './bake-time-charts/bake-time-charts.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { BakeChartsComponent } from './bake-charts/bake-charts.component';
import { DashboardWidgetsComponent } from './dashboard-widgets/dashboard-widgets.component';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule
  ],
  declarations: [ DashboardComponent , BakeChartsComponent, BakeTimeChartsComponent, DashboardWidgetsComponent ]
})
export class DashboardModule { }
