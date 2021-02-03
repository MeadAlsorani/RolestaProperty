import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {MatButtonModule} from '@angular/material/button'
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
