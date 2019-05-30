import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TimeLogComponent } from './timelog.component';
import { TimeLogRoutingModule } from './timelog-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    TimeLogRoutingModule,
    ChartsModule,
    NgxDatatableModule
  ],
  declarations: [ TimeLogComponent ]
})
export class TimeLogModule { }
