import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobileNumberConfigComponent } from './mobile-number-config.component';
import { AuthGurad } from '../../Services/auth-gurad.service';

const routes: Routes = [
  {
  path: '',
  component: MobileNumberConfigComponent,
  canActivate: [AuthGurad],
  data: {
    title: 'Mobile Number Configaration'
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileNumberConfigRoutingModule { }
