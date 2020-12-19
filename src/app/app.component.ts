import { Component } from '@angular/core';
import * as myGlobals from '../assets/global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RolestaProperty';
  dis=myGlobals.disableContainer();
}
