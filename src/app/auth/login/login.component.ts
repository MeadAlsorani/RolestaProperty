import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../Services/Alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  redirectUrl: string='';
  constructor(
    private auth: AuthService,
    private alert: AlertService,
    private route:ActivatedRoute,
    private router:Router
    ) {}

  ngOnInit() {
    this.redirectUrl=this.route.snapshot.queryParams['redirectUrl'];
  }

  onLogin(event: NgForm) {
    this.auth.login(event.value.userEmail, event.value.password).subscribe(
      (data) => {
        localStorage.setItem('token', data.userEmail);
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
        }
        else{
          this.router.navigate(['']);
        }
      },
      (error) => {
        if (error.status == 404) {
          this.alert.error('اسم المستخدم او كلمة المرور غير صحيحة');
        }
      }
    );
  }
}
