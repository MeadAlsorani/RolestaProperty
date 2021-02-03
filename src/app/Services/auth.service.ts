import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../assets/global';
import { Observable } from 'rxjs';
import { IUser } from '../Interfaces/IUser';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = myGlobals.apiUrl + 'users/';
  constructor(private http: HttpClient) {}

  getUser(email:string):Observable<any>{
    return this.http.get(this.url+"getUser/"+email);
  }
  login(email: string, password: string):Observable<IUser> {
    return this.http.post<IUser>(this.url + 'login', {
      userEmail: email,
      password: password,
    });
  }

  isLoggedIn():boolean{
    const token=localStorage.getItem("token");
    if (token) {
      return true;
    }
    else{
      return false;
    }
  }
}
