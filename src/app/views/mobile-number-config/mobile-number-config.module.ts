import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MobileNumberConfigRoutingModule } from './mobile-number-config-routing.module';
import { FormsModule } from '@angular/forms';
import { MobileNumberConfigComponent } from './mobile-number-config.component';

@NgModule({
  providers: [],
  declarations: [MobileNumberConfigComponent],
  imports: [
    CommonModule,
    FormsModule,
    MobileNumberConfigRoutingModule
  ]
})
export class MobileNumberConfigModule { }
