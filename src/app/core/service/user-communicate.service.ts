import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCommunicateService {

  private readonly userStatusListener$ = new Subject<boolean>();

  constructor() { }

  addUserStatus(status: boolean){
    this.userStatusListener$.next(status);
  }

  getUserStatus(): Observable<any>{
    return this.userStatusListener$.asObservable();
  }
}
