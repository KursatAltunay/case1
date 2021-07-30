import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../services/user/model/user-model';
import {UserService} from '../../../services/user/service/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserFormComponent} from '../user-form/user-form.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: UserModel;

  constructor(
    private userService: UserService,
    private ngbModal: NgbModal
  ) { }

  ngOnInit(): void {
  }

  editUser(id: string) {
    const ngbRef = this.ngbModal.open(UserFormComponent, {backdrop: 'static', keyboard: true, centered: true, size: 'lg'});
    ngbRef.componentInstance.title = 'Kullanıcı Düzenle';
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(result=>{
      console.log("delete",result);
    })
  }

  showOnMap(id: string) {

  }
}
