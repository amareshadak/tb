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
      this.result = this.authService.login(credentials);
     if (this.result) {
     this.router.navigate(['/']);
     } else {
       this.invalidLogin = true;
     }
  }
 }
