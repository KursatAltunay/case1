import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import {AppRoutingModule} from '../../app-routing.module';



@NgModule({
    declarations: [SideMenuComponent],
    exports: [
        SideMenuComponent
    ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class CoreModule { }
