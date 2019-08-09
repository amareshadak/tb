import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor( private http: HttpClient ) {  }

getBKData(formDateTime?: string, toDateTime?: string) {
    if (!formDateTime && !toDateTime) {
      // http://52.207.62.240:8081/bkdata/getdata
    return this.http.get('http://52.207.62.240:8081/bkdata/getdata');
    } else {
      // tslint:disable-next-line:max-line-length
      return this.http.get(`http://52.207.62.240:8081/bkdata/findByDateRange?from_datetime=${formDateTime}&to_datetime=${toDateTime}`);
    }
  }

  addOrUpdateMobileNoConfig(data: any){
    return this.http.post('http://52.207.62.240:8081/bkdata/mobile-plant-config/save',data,{responseType: 'text'});
  }

  getMobileNumberConfig(){
    return this.http.get('http://52.207.62.240:8081/bkdata/mobile-plant-config');
  }

  addOrUpdateBakeTimeConfig(data: any){
    return this.http.post('http://52.207.62.240:8081/bkdata/bkconfig/save',data,{responseType: 'text'});
  }

  getBakeTimeConfig(){
    return this.http.get('http://52.207.62.240:8081/bkdata/bkconfig');
  }
}
