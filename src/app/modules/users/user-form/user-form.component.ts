import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user/service/user.service';
import {AlertifyService} from '../../../core/service/alertify.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [FormBuilder],
})
export class UserFormComponent implements OnInit {
  title: string;
  userForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private  userService: UserService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  private initForm() {
  this.userForm = this.formBuilder.group({
    Name : new FormControl(null, Validators.required),
    Avatar : new FormControl('https://cdn.fakercloud.com/avatars/adityasutomo_128.jpg', Validators.required),
    City : new FormControl(null, Validators.required),
    PostCode : new FormControl(null, Validators.required),
    JobTitle : new FormControl(null, Validators.required),
    PhoneNumber : new FormControl(null, Validators.required),
    Email : new FormControl(null, [Validators.required, Validators.email]),
    Password : new FormControl(null, Validators.required),
    Latitude : new FormControl('-36.2853', Validators.required),
    Longitude : new FormControl('-177.6566', Validators.required),
    BackgroundImage : new FormControl('http://placeimg.com/640/480/city', Validators.required),
    Vehicle : new FormControl(null, Validators.required),
    Country : new FormControl(null, Validators.required),
    BirthDate : new FormControl(new Date(), Validators.required)
  });
  }

  saveButton() {
    if (!this.userForm.valid){
      return;
    }
    const newUser = this.userForm.getRawValue();
    this.userService.createUser(newUser).subscribe(result => {
      console.log('result', result);
      if (result){
        this.alertify.success('Kullanıcı başarıyla eklenmiştir.');
      }
    });
  }
}
