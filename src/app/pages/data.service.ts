
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private doctorView = new BehaviorSubject(false);
  currentView = this.doctorView .asObservable();

  constructor() { }

  changeMessage(message: boolean) {
    this.doctorView .next(message)
  }

}