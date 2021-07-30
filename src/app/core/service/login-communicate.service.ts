import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoginService} from '../../services/login/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginCommunicateService {

  private readonly isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
  ) { }

  addLoggedInStatus(status: boolean){
    this.isLoggedIn$.next(status);
  }

  getLoggedInStatus(): Observable<any>{
    return this.isLoggedIn$.asObservable();
  }
}
