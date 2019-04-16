
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    login(credentials) {
      // return this.http.post('api/authentication', JSON.stringify(credentials));
      if (credentials.username === 'admin' && credentials.password === 'password') {
        // tslint:disable-next-line:max-line-length
        localStorage.setItem('token' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFtYXJlc2ggQWRhayIsImlhdCI6MTUxNjIzOTAyMn0.Ep8FVIQfviNzWFTKNNuekDhQLXqOerLJ1z-Gzjv3bGY');
        return true;
      }
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
        name : 'admin',
        email : 'admin@gmail.com',
        role : 'user'
      };
    }
}
