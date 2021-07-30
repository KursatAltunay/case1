import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user/service/user.service';
import {finalize} from 'rxjs/operators';
import {UserModel} from '../../../services/user/model/user-model';
import {AlertifyService} from '../../../core/service/alertify.service';
import {Subject} from 'rxjs';
import {UserCommunicateService} from '../../../core/service/user-communicate.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [FormBuilder],
})
export class UserFormComponent implements OnInit, AfterViewInit, OnDestroy {

  title: string;
  userForm: FormGroup;
  id: string;
  user: UserModel;

  destroyed$ = new Subject();

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private  userService: UserService,
    private alertify: AlertifyService,
    private userCommunicateService: UserCommunicateService
  ) {
    this.user = {
      id: null,
      Name: null,
      Email: null,
      PhoneNumber: null,
      Country: null,
      City: null,
      BirthDate: null,
      Avatar: null,
      JobTitle: null,
      createdAt: null,
      BackgrounImage: null,
      Latitude: null,
      Longitude: null,
      Password: null,
      PostCode: null,
      Vehicle: null
    };
  }

  ngOnInit(): void {
    if (this.id){
      this.getUserDataById();
    }
    this.initForm();
  }

  private getUserDataById() {
    this.userService.getUserListById(this.id)
      .pipe( finalize( () => {
          this.fetchFormData();
      }))
      .subscribe(result => {
        if (result){
          this.user = result;
        }
        else{
          this.alertify.error('Veriler alınırken bir hata oluştu.');
        }
      });
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  private initForm() {
    console.log('1');
    this.userForm = this.formBuilder.group({
    Name : new FormControl(this.user?.Name, Validators.required),
    Avatar : new FormControl(this.user.Avatar ? this.user.Avatar : 'https://cdn.fakercloud.com/avatars/adityasutomo_128.jpg', Validators.required),
    City : new FormControl(this.user?.City, Validators.required),
    PostCode : new FormControl(this.user?.PostCode, Validators.required),
    JobTitle : new FormControl(this.user?.JobTitle, Validators.required),
    PhoneNumber : new FormControl(this.user?.PhoneNumber, Validators.required),
    Email : new FormControl(this.user?.Email, [Validators.required, Validators.email]),
    Password : new FormControl(this.user?.Password, Validators.required),
    Latitude : new FormControl(this.user?.Latitude ? this.user?.Latitude : '-36.2853', Validators.required),
    Longitude : new FormControl(this.user?.Longitude ? this.user?.Longitude : '-177.6566', Validators.required),
      BackgrounImage : new FormControl(this.user?.BackgrounImage ? this.user?.BackgrounImage : 'http://placeimg.com/640/480/city', Validators.required),
    Vehicle : new FormControl(this.user?.Vehicle, Validators.required),
    Country : new FormControl(this.user?.Country, Validators.required),
    BirthDate : new FormControl( this.user?.BirthDate ? this.user?.BirthDate :  new Date().toLocaleString(), Validators.required)
  });
  }

  saveButton() {
    if (!this.userForm.valid){
      return;
    }
    const newUser = this.userForm.getRawValue();

    if (!this.id){
      this.userService.createUser(newUser)
        .pipe(finalize(() => {

        }))
        .subscribe(result => {
          if (result){
            this.alertify.success('Kullanıcı başarıyla eklenmiştir.');
            this.userCommunicateService.addUserStatus(true);
            this.activeModal.close(true);
          }
          else{
            this.alertify.error('Kullanıcı eklenirken hata oluştu.');
          }
        });
    }
    else{
      this.userService.updateUser(this.id, newUser)
        .pipe( finalize( () => {
        }))
        .subscribe(result => {
        if (result){
          this.alertify.success('Kullanıcı başarıyla güncellenmiştir.');
          this.userCommunicateService.addUserStatus(true);
          this.activeModal.close(true);
        }
        else{
          this.alertify.error('Bilgiler güncellenirken bir hata oluştu.');
        }
      });
    }

  }

  private fetchFormData() {
    this.userForm.controls.Name.patchValue(this.user.Name);
    this.userForm.controls.Avatar.patchValue(this.user.Avatar);
    this.userForm.controls.City.patchValue(this.user.City);
    this.userForm.controls.PostCode.patchValue(this.user.PostCode);
    this.userForm.controls.JobTitle.patchValue(this.user.JobTitle);
    this.userForm.controls.PhoneNumber.patchValue(this.user.PhoneNumber);
    this.userForm.controls.Email.patchValue(this.user.Email);
    this.userForm.controls.Password.patchValue(this.user.Password);
    this.userForm.controls.Latitude.patchValue(this.user.Latitude);
    this.userForm.controls.Longitude.patchValue(this.user.Longitude);
    this.userForm.controls.BackgrounImage.patchValue(this.user.BackgrounImage);
    this.userForm.controls.Vehicle.patchValue(this.user.Vehicle);
    this.userForm.controls.Country.patchValue(this.user.Country);
    this.userForm.controls.BirthDate.patchValue(this.user.BirthDate);
  }

  ngAfterViewInit(): void {
  this.userCommunicateService.addUserStatus(false);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
