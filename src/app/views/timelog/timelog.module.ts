import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TimeLogComponent } from './timelog.component';
import { TimeLogRoutingModule } from './timelog-routing.module';

@NgModule({
  imports: [
    TimeLogRoutingModule,
    ChartsModule
  ],
  declarations: [ TimeLogComponent ]
})
export class TimeLogModule { }
