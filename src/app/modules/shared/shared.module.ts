import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
    declarations: [DashboardCardComponent, LoginComponent],
    exports: [
        DashboardCardComponent,
    ],
    imports: [
        CommonModule,
        NgSelectModule,
        ReactiveFormsModule
    ]
})
export class SharedModule { }
