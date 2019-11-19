import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantsRoutingModule } from './plants-routing.module';
import { PlantsComponent } from './plants.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PlantsComponent],
  imports: [
    CommonModule,
    FormsModule,
    PlantsRoutingModule
  ]
})
export class PlantsModule { }
