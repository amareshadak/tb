import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TimeLogComponent } from './timelog.component';
import { TimeLogRoutingModule } from './timelog-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    TimeLogRoutingModule,
    ChartsModule,
    AgGridModule.withComponents([])
  ],
  declarations: [ TimeLogComponent ]
})
export class TimeLogModule { }
