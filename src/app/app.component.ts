import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RolestaProperty';
  browserLange;
  currentLang;
  constructor(
    private translate:TranslateService
  ) {
    this.browserLange=translate.getBrowserLang();

    translate.setDefaultLang('ar');
    translate.use(this.browserLange);
    translate.onLangChange.subscribe((data)=>this.currentLang=data.lang)
  }
}
