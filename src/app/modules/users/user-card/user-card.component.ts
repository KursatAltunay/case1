import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from '../../../services/user/model/user-model';
import {UserService} from '../../../services/user/service/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserFormComponent} from '../user-form/user-form.component';
import {AlertifyService} from '../../../core/service/alertify.service';
import {UserCommunicateService} from '../../../core/service/user-communicate.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() user: UserModel;

  destroyed$ = new Subject();

  constructor(
    private userService: UserService,
    private ngbModal: NgbModal,
    private alertify: AlertifyService,
    private userCommunicateService: UserCommunicateService,
  ) { }

  ngOnInit(): void {
  }

  editUser(id: string) {
    const ngbRef = this.ngbModal.open(UserFormComponent, {backdrop: 'static', keyboard: true, centered: true, size: 'lg'});
    ngbRef.componentInstance.title = 'Kullanıcı Düzenle';
    ngbRef.componentInstance.id = id;
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(result => {
      if (result){
        this.alertify.success('Kullanıcı başarıyla silindi.');
        this.userCommunicateService.addUserStatus(true);
      }
      else{
        this.alertify.error('Kullanıcı silinirken bir hata oluştu.');
      }
    });
  }

  showOnMap(id: string) {

  }

  ngAfterViewInit(): void {
    this.userCommunicateService.addUserStatus(false);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
