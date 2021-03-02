import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

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
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ControlPanelComponent,
    PageNotFoundComponent,
    AboutComponent,
    FooterComponent,
    NavbarColorDirective
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
