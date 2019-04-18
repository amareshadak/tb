import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private bakeTime = new BehaviorSubject('default message');
  currentBakeingTime = this.bakeTime.asObservable();
  constructor() { }
  changeBakeingTime(message: string) {
    this.bakeTime.next(message);
  }
}
