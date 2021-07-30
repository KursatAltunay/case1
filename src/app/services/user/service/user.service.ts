import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../model/user-model';

const url  = 'https://604a3c9c9251e100177ce3d0.mockapi.io/mulakat/api/v1/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUserList(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(url);
  }

  deleteUser(id): Observable<any>{
    return this.http.delete(url + '/' + id);
  }

  createUser(user: UserModel): Observable<any>{
    return this.http.post(url, user);
  }

  getUserListById(id): Observable<UserModel> {
    return this.http.get<UserModel>(url + '/' + id);
  }

  updateUser(id: string, body: UserModel): Observable<any> {
    return this.http.put(url + '/' + id , body);
  }
}
