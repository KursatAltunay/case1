import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../services/login/service/login.service';
import {LoginModel} from '../../../services/login/model/login-model';
import {UserService} from '../../../services/user/service/user.service';
import {UserModel} from '../../../services/user/model/user-model';
import {AlertifyService} from '../../../core/service/alertify.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormBuilder]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  userList: UserModel[] = [];
  remember = false;

  constructor(
    private formBuilder: FormBuilder,
    private  loginService: LoginService,
    private userService: UserService,
    private  alertify: AlertifyService,
    private activeModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUserList();
  }

  onFormSubmit() {
    const loginUser: LoginModel = this.form.getRawValue();
    if (this.loginService.isSuccessLogin(loginUser, this.userList)){
      this.alertify.success('Başarıyla giriş yaptınız.');
      this.activeModal.close(true);
    }
    else{
      this.alertify.error('Kullanıcı adı ya da şifre hatalı!');
      return;
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      Email : new FormControl('', [Validators.required, Validators.email]),
      Password : new FormControl('' , [Validators.required]),
      remember : new FormControl(this.remember)
    });
  }

  private getUserList() {
    this.userService.getUserList().subscribe(result => {
      if (result){
        this.userList = result;
        console.log(this.userList);
      }
      else{
        this.alertify.error('Veriler alınırken bir hata oluştu.');
      }
    });
  }

  isChecked(event) {
    this.form.controls.remember.patchValue(event.target.checked);
  }
}
