import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeLogComponent } from './timelog.component';


const routes: Routes = [
  {
    path: '',
    component: TimeLogComponent,
    data: {
      title: 'Bakeing Time Log'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeLogRoutingModule {}
