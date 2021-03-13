import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { AlertService } from './Services/Alert.service';
import { CarouselService } from './Services/carousel.service';
import { HousingService } from './Services/Housing.service';
import { CarService } from './Services/car.service';
import { AppRoutingModule } from './app-routing.module';
import { CarModule } from './control-panel/car-control/car.module';
import { AppCarouselModule } from './control-panel/carousel-control/carousel.module';
import { PropertModModule } from './control-panel/propert-mod.module';
import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';
import { AuthService } from './Services/auth.service';
import { AuthModule } from './auth/auth.module';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import {NavbarColorDirective} from './shared/navbarColor.directive';
import {PropertyListComponent} from './Property/property-list/property-list.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ControlPanelComponent,
    PageNotFoundComponent,
    AboutComponent,
    FooterComponent,
    NavbarColorDirective,
    PropertyListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CarModule,
    AppCarouselModule,
    PropertModModule,
    AuthModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient],
      },
      defaultLanguage:'ar'
    })
  ],
  providers: [
    CarService,
    AlertService,
    CarouselService,
    HousingService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
