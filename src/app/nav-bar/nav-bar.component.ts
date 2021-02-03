import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent implements OnInit {
  user:userInfo={
    userEmail:null,
    userName:null,
    password:null
  };
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.isloggedIn()) {
      var email=this.isloggedIn();
      this.auth.getUser(email).subscribe(data=>{
        this.user=data;
      });

    }
  }

  isloggedIn() {
    return localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}

interface userInfo{
  userName:string,
  userEmail:string,
  password:string,
}
