import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../../services/user/service/user.service';
import {UserModel} from '../../../services/user/model/user-model';
import {AlertifyService} from '../../../core/service/alertify.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserFormComponent} from '../user-form/user-form.component';
import {Subject} from 'rxjs';
import {UserCommunicateService} from '../../../core/service/user-communicate.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit , OnDestroy, AfterViewInit{

  userList: UserModel[] = [];
  displayUsers: UserModel[] = [];
  pageNumbers = [1, 2, 3, 4, 5, 6];

  displaySize = 12;
  page = 1;
  maxPage: number;

  destroyed$ = new Subject();


  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private ngbModal: NgbModal,
    private userCommunicateService: UserCommunicateService
  ) {
  }

  ngOnInit(): void {
   this.getData();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngAfterViewInit() {
    this.userCommunicateService.getUserStatus()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(hasChange => {
      if (hasChange){
        this.getData();
      }
    });
  }

  private getData() {
    this.userService.getUserList().subscribe(result => {
      if (result){
        this.userList = result;
        this.maxPage = Math.floor(this.userList.length / this.displaySize) + 1;
        this.fetchDisplayItems();
      }
    });
  }

  searchByName(event) {
    const searchValue = event.target.value.toLowerCase();
    this.page = 1;
    if (searchValue){
    this.displayUsers = [... this.userList.filter(x => x.Name.toLowerCase().includes(searchValue))];
    }
    else{
      this.fetchDisplayItems();
    }
  }

  addUser() {
    const ngbRef = this.ngbModal.open(UserFormComponent, {backdrop: 'static', keyboard: true, centered: true, size: 'lg'});
    ngbRef.componentInstance.title = 'Kullanıcı Ekle';
    ngbRef.result.then(result => {
      if (result){
        this.getData();
      }
    });
  }

  previousPage() {
    if (this.page !== 1){
      this.page--;
      this.fetchDisplayItems();
    }
  }

  nextPage() {
    if (this.page !== this.maxPage){
      this.page++;
      this.fetchDisplayItems();
    }
  }

  changePage(number: number) {
    this.page = number;
    this.fetchDisplayItems();
  }

  private fetchDisplayItems() {
    this.displayUsers = [];
    this.displayUsers = [...this.userList.slice((this.page - 1) * this.displaySize, this.page * this.displaySize)];
  }


}
