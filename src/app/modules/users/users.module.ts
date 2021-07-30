import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserCardComponent} from './user-card/user-card.component';
import {UserListComponent} from './user-list/user-list.component';



@NgModule({
  declarations: [UserListComponent, UserFormComponent, UserCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: UserListComponent},
    ]),
    NgbDatepickerModule
  ]
})
export class UsersModule { }
