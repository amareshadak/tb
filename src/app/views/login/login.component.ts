import { AuthService } from './../../Services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  invalidLogin: boolean;
  result: boolean;

  singIn(credentials) {
    let data = {userId : credentials.username, password: credentials.password}
    this.authService.login(data).subscribe((res: any) => {
      if(res.status) {
        localStorage.setItem('baketracker_token' , res.payload.token);
        localStorage.setItem('baketracker_username' , res.payload.username);
        localStorage.setItem('baketracker_name' , res.payload.name);
        localStorage.setItem('baketracker_role' , res.payload.role);
        this.router.navigate(['/']);
      }
      else
      {
        this.invalidLogin = true;
        return false;
      }
    })
  }
}
