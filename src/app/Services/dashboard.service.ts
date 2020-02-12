import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  Url: string = environment.apiUrl;

  headers = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("baketracker_token")}`
    })
  };

  headersText = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("baketracker_token")}`,
      "responseType": "text"
    })
  };
  
constructor( private http: HttpClient ) {  }

getBKData(formDateTime?: string, toDateTime?: string) {
    if (!formDateTime && !toDateTime) {
      // http://13.233.74.217:8081/bkdata/getdata
    return this.http.get(`${this.Url}/bake/getdata`,this.headers);
    } else {
      // tslint:disable-next-line:max-line-length
      return this.http.get(`${this.Url}/bake/findByDateRange?from_datetime=${formDateTime}&to_datetime=${toDateTime}`,this.headersText);
      
    }
  }

  addOrUpdateMobileNoConfig(data: any){
    return this.http.post(`${this.Url}/plant/mobile-config`,data,this.headersText);
  }

  getMobileNumberConfig(){
    return this.http.get(`${this.Url}/plant/mobile-config`,this.headers);
  }

  addOrUpdateBakeTimeConfig(data: any){
    return this.http.post(`${this.Url}/product`,data,this.headersText);
  }

  getBakeTimeConfig(){
    return this.http.get(`${this.Url}/product`,this.headers);
  }
}
