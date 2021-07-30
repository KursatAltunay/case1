import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user/service/user.service';
import {UserModel} from '../../../services/user/model/user-model';
import {CardModel} from '../../../services/user/model/card-model';
import {finalize} from 'rxjs/operators';
import {forEach} from 'ol/geom/flat/segments';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userList: UserModel[] = [];
  cardList: CardModel[] = [];

    constructor(
    private userService: UserService
  ) {    }

  ngOnInit(): void {
   this.getData();
  }

  getData(): void{
    this.userService.getUserList()
      .pipe(finalize(() => {
        console.log(this.userList);
        this.filterData();
      }))
      .subscribe(result => {
      if (result){
        this.userList = result;
      }
    });
  }
  private filterData() {
    this.filterByUserCount();
    this.filterByLocatedGermany();
    this.filterByName('Carroll' );
    this.filterByEmail( 'Yahoo' );
  }

  private filterByUserCount() {
    const cardModel: CardModel = {
      cardTitle: 'Kullanıcı Sayısı',
      cardBody: {
        bodyCount: this.userList.length,
        bodyInfo: 'Sistemdeki Toplam Kullanıcı Sayısı'
      }
    };
    this.cardList = [...this.cardList, cardModel];
  }
  private filterByLocatedGermany() {
    const cardModel: CardModel = {
      cardBody: {
        bodyCount: this.userList.filter(x => x.Country.toLowerCase() === 'germany').length,
        bodyInfo: 'Almanya\'da Yaşayan Kullanıcı Sayısı'
      },
      cardTitle: 'Ülkeye Göre Kullanıcı Sayısı'
    };
    this.cardList = [...this.cardList, cardModel];
  }
  private filterByName( name: string ) {
    const cardModel: CardModel = {
      cardBody: {
        bodyCount: this.userList.filter(x => x.Name.toLowerCase().split(' ')[0] === name.toLowerCase()).length,
        bodyInfo: `İsmi  ${name} Olan Kullanıcı Sayısı`
      },
      cardTitle: 'İsme Göre Kullanıcı Sayısı'
    };
    this.cardList = [...this.cardList, cardModel];
  }
  private filterByEmail(emailDomain: string) {
    const cardModel: CardModel = {
      cardBody: {
        bodyCount: this.userList.filter(x => x.Email.toLowerCase().split('@')[1].split('.')[0] === emailDomain.toLowerCase()).length,
        bodyInfo: `Email Adresi ${ emailDomain } Olan Kullanıcı Sayısı`
      },
      cardTitle: 'Email Adresine Göre Kullanıcı Sayısı'
    };
    this.cardList = [...this.cardList, cardModel];
  }
}
