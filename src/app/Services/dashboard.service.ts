import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  Url: string = environment.apiUrl;
  
constructor( private http: HttpClient ) {  }

getBKData(formDateTime?: string, toDateTime?: string) {
    if (!formDateTime && !toDateTime) {
      // http://13.233.74.217:8081/bkdata/getdata
    return this.http.get(`${this.Url}/bake/getdata`);
    } else {
      // tslint:disable-next-line:max-line-length
      return this.http.get(`${this.Url}/bake/findByDateRange?from_datetime=${formDateTime}&to_datetime=${toDateTime}`);
      
    }
  }

  addOrUpdateMobileNoConfig(data: any){
    return this.http.post(`${this.Url}/plant/mobile-config`,data,{responseType: 'text'});
  }

  getMobileNumberConfig(){
    return this.http.get(`${this.Url}/plant/mobile-config`);
  }

  addOrUpdateBakeTimeConfig(data: any){
    return this.http.post(`${this.Url}/product`,data,{responseType: 'text'});
  }

  getBakeTimeConfig(){
    return this.http.get(`${this.Url}/product`);
  }
}
