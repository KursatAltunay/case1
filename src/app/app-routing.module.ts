import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginGuard} from './core/guard/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [LoginGuard] },
  { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule), canActivate: [LoginGuard] },
  { path: 'map', loadChildren: () => import('./modules/map/map.module').then(m => m.MapModule), canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
