import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TimeLogComponent } from './timelog.component';
import { TimeLogRoutingModule } from './timelog-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  providers: [DatePipe],
  imports: [
    FormsModule,
    TimeLogRoutingModule,
    ChartsModule,
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [ TimeLogComponent ]
})
export class TimeLogModule { }
