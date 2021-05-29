import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../Interfaces/IUser';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.apiUrl + 'users/';
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
