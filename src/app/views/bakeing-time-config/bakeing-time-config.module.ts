import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BakeingTimeConfigRoutingModule } from './bakeing-time-config-routing.module';
import { BakeingTimeConfigComponent } from './bakeing-time-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  providers: [DatePipe],
  declarations: [ BakeingTimeConfigComponent ],
  imports: [
    CommonModule,
    FormsModule,
    BakeingTimeConfigRoutingModule,
    TabsModule,
    ReactiveFormsModule
  ]
})
export class BakeingTimeConfigModule { }
