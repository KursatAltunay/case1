import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '../../services/login/service/login.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../../modules/shared/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private ngbModal: NgbModal,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ( this.loginService.isRemembered() || this.loginService.isLoggedIn) {
      return true;
    } else {
     const ngbRef  =  this.ngbModal.open(LoginComponent, {backdrop: 'static', keyboard: false, centered: true, size: 'md'});
     ngbRef.result.then(result => {
        if (result){
          this.router.navigate(['dashboard']);
        }
      });
     return false;
    }
  }
}




