import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor( private http: HttpClient ) {  }
getBKData() {
  return this.http.get('https://projectonejava.herokuapp.com/bkdata/getdata');
}


}
