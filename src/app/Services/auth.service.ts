import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../assets/global';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = myGlobals.apiUrl + 'users/';
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(this.url + 'login', {
      email: email,
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
