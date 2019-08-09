import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BakeingTimeConfigComponent } from './bakeing-time-config.component';


const routes: Routes = [
  {
    path: '',
    component: BakeingTimeConfigComponent,
    data: {
      title: 'Baking Time Configaration'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BakeingTimeConfigRoutingModule {}
