import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IPlant } from '../models/plant';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  Url: string = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getBKData(formDateTime?: string, toDateTime?: string) {
    if (!formDateTime && !toDateTime) {
      return this.http.get(`${this.Url}/bake/getdata`);
    } else {
      return this.http.get(`${this.Url}/bake/findByDateRange?from_datetime=${formDateTime}&to_datetime=${toDateTime}`);
    }
  }

  addOrUpdateMobileNoConfig(data: any) {
    return this.http.post(`${this.Url}/plant/mobile-config`, data, { responseType: 'text' });
  }

  getMobileNumberConfig() {
    return this.http.get(`${this.Url}/plant/mobile-config`);
  }

  addOrUpdateBakeTimeConfig(data: any) {
    return this.http.post(`${this.Url}/product`, data, { responseType: 'text' });
  }

  getBakeTimeConfig() {
    return this.http.get<IPlant[]>(`${this.Url}/product`);
  }

  getAllPlants() {
    return this.http.get(`${this.Url}/plant`);
  }

  addOrUpdatePlant(data: any) {
    return this.http.post(`${this.Url}/plant`, data, { responseType: 'text' });
  }

  addOrUpdateUser(data: IUser) {
    return this.http.post(`${this.Url}/user`, data, { responseType: 'text' });
  }

  getAllUser() {
    return this.http.get<IUser[]>(`${this.Url}/user`);
  }

  getUserByLoginId(data: string) {
    return this.http.get<IUser>(`${this.Url}/user/getUserByLoginId?loginId${data}`);
  }


}
