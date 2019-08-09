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
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { GaugeChartModule } from 'angular-gauge-chart';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BakingTimeZoneOneComponent } from './baking-time-zone-one/baking-time-zone-one.component';
import { BakingTimeZoneTwoComponent } from './baking-time-zone-two/baking-time-zone-two.component';
import { BakingTimeZoneThreeComponent } from './baking-time-zone-three/baking-time-zone-three.component';
import { BakingTimeZoneFourComponent } from './baking-time-zone-four/baking-time-zone-four.component';
import { BakingTimeZoneFiveComponent } from './baking-time-zone-five/baking-time-zone-five.component';
import { BakingTimeZoneSixComponent } from './baking-time-zone-six/baking-time-zone-six.component';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    GaugeChartModule,
    TabsModule
  ],
  declarations: [
    DashboardComponent,
    BakeChartsComponent,
    BakeTimeChartsComponent,
    DashboardWidgetsComponent,
    GaugeChartComponent, 
    BakingTimeZoneOneComponent, 
    BakingTimeZoneTwoComponent, 
    BakingTimeZoneThreeComponent, 
    BakingTimeZoneFourComponent, 
    BakingTimeZoneFiveComponent, 
    BakingTimeZoneSixComponent
  ]
})
export class DashboardModule { }
