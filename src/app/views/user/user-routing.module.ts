import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGurad } from '../../Services/auth-gurad.service';


const routes: Routes = [
  {
  path: '',
  component: UserComponent,
  canActivate: [AuthGurad],
  data: {
    title: 'User'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
