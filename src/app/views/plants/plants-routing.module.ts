import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGurad } from '../../Services/auth-gurad.service';
import { PlantsComponent } from './plants.component';


const routes: Routes = [
  {
    path: '',
    component: PlantsComponent,
    canActivate: [AuthGurad],
    data: {
      title: 'plant'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantsRoutingModule { }
