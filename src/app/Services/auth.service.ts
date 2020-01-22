
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  Url: string = environment.apiUrl;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  login(credentials) {
    this.http.post(this.Url + '/gatekeeper/signin', JSON.stringify(credentials),this.headers).subscribe((res: any) => {
      if(res.status) {
        localStorage.setItem('baketracker_token' , res.payload.token);
        localStorage.setItem('baketracker_username' , res.payload.username);
        localStorage.setItem('baketracker_name' , res.payload.name);
        localStorage.setItem('baketracker_role' , res.payload.role);
        return true;
      }
      else
      {
        return false;
      }
    })
    return false;
  }

  logout() {

  }

  isLoggedIn() {
    if (localStorage.getItem('token') !== '' && localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }
  
  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) { return null; }
    return {
      name: 'admin',
      email: 'admin@gmail.com',
      role: 'user'
    };
  }
}
