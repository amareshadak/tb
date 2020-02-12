import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IPlant } from '../models/plant';
import { IUser, ResponseIUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
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
  
  

  constructor(private http: HttpClient) { }


  getBKData(formDateTime?: string, toDateTime?: string) {
    if (!formDateTime && !toDateTime) {
      return this.http.get(`${this.Url}/bake/getdata`);
    } else {
      return this.http.get(`${this.Url}/bake/findByDateRange?from_datetime=${formDateTime}&to_datetime=${toDateTime}`);
    }
  }

  addOrUpdateMobileNoConfig(data: any) {
    return this.http.post(`${this.Url}/plant/mobile-config`, data, this.headersText);
  }

  getMobileNumberConfig() {
    return this.http.get(`${this.Url}/plant/mobile-config`,this.headers);
  }

  addOrUpdateBakeTimeConfig(data: any) {
    return this.http.post(`${this.Url}/product`, data, this.headersText);
  }

  getBakeTimeConfig() {
    console.log(this.headers)
    return this.http.get<IPlant[]>(`${this.Url}/product`, this.headers);
  }

  getAllPlants() {
    return this.http.get(`${this.Url}/plant`,this.headers);
  }

  addOrUpdatePlant(data: any) {
    return this.http.post(`${this.Url}/plant`, data, this.headersText);
  }

  addOrUpdateUser(data: IUser) {
    return this.http.post(`${this.Url}/user`, data, this.headersText);
  }

  getAllUser() {
    return this.http.get<ResponseIUser>(`${this.Url}/user`,this.headers);
  }

  getUserByLoginId(data: string) {
    return this.http.get<IUser>(`${this.Url}/user/getUserByLoginId?loginId${data}`,this.headers);
  }


}
