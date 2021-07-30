import {Component, Input, OnInit} from '@angular/core';
import {CardModel,} from '../../../services/user/model/card-model';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input() card: CardModel;

  constructor() { }

  ngOnInit(): void {
  }

}
