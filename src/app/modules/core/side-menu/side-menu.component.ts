import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LoginService} from '../../../services/login/service/login.service';
import {LoginCommunicateService} from '../../../core/service/login-communicate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  isLoggedIn = false;

  constructor(
    private loginCommunicateService: LoginCommunicateService,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isRemembered();
  }

  ngAfterViewInit() {
    this.loginCommunicateService.getLoggedInStatus().subscribe(result => {
      this.isLoggedIn = result;
    });
  }

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['users']);
  }
}
