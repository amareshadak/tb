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

    console.log(credentials)

    let data = {userId : credentials.username, password: credentials.password}

    this.result = this.authService.login(data);
    if (this.result) {
      this.router.navigate(['/']);
    } else {
      this.invalidLogin = true;
    }
  }
}
