import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as myGlobals from '../assets/global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RolestaProperty';
  dis=myGlobals.disableContainer();

  constructor(
    private translate:TranslateService
  ) {
    translate.setDefaultLang('ar');
    translate.use('ar');
  }
}
