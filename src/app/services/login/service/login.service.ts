import { Injectable } from '@angular/core';
import {LoginModel} from '../model/login-model';
import {UserModel} from '../../user/model/user-model';
import {LoginCommunicateService} from '../../../core/service/login-communicate.service';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn = false;

  constructor(
    private loginCommunicateService: LoginCommunicateService
  ) {   }

  isSuccessLogin(user: LoginModel, userList: UserModel[]){
    let matchUser: UserModel = null;
    matchUser = userList.find(x => x.Email.toLowerCase() === user.Email.toLowerCase() && x.Password === user.Password);
    if (matchUser){
      this.isLoggedIn = true;
      this.loginCommunicateService.addLoggedInStatus(true);
      if (user.remember){
        this.setLocalStorage(user);
      }
      return true;
    }
    else{
      this.isLoggedIn = false;
      return false;
    }
  }

  logOut(){
    this.clearLocalStorage();
  }

  isRemembered(){
   return  !!this.getLocalStorage();
  }

  getLocalStorage(){
   if ( localStorage.getItem('login')){
     this.isLoggedIn = true;
     this.loginCommunicateService.addLoggedInStatus(true)
     return  JSON.parse ( localStorage.getItem('login'));
   }
  }

  setLocalStorage(user: LoginModel){
    this.clearLocalStorage();
    this.isLoggedIn = true;
    this.loginCommunicateService.addLoggedInStatus(true);
    localStorage.setItem('login', JSON.stringify(user));
  }

  clearLocalStorage(){
      this.isLoggedIn = false;
      this.loginCommunicateService.addLoggedInStatus(false);
      localStorage.removeItem('login');
  }
}
