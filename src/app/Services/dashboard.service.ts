import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor( private http: HttpClient ) {  }
getBKData(formDateTime?: string, toDateTime?: string) {
    if (!formDateTime && !toDateTime) {
      // http://13.233.74.217:8081/bkdata/getdata
    return this.http.get('https://projectonejava.herokuapp.com/bkdata/getdata');
    } else {
      // tslint:disable-next-line:max-line-length
      return this.http.get(`https://projectonejava.herokuapp.com/bkdata/findByDateRange?from_datetime=${formDateTime}&to_datetime=${toDateTime}`);
    }
  }
}
