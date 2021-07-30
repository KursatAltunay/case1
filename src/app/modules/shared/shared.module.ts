import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import {NgSelectModule} from '@ng-select/ng-select';



@NgModule({
    declarations: [DashboardCardComponent],
    exports: [
        DashboardCardComponent,
    ],
  imports: [
    CommonModule,
    NgSelectModule
  ]
})
export class SharedModule { }
