import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { AlertService } from './Services/Alert.service';
import { CarouselService } from './Services/carousel.service';
import { HousingService } from './Services/Housing.service';
import { CarService } from './Services/car.service';
import { AppRoutingModule } from './app-routing.module';
import { CarModule } from './control-panel/car-control/car.module';
import {AppCarouselModule} from './control-panel/carousel-control/carousel.module';
import { PropertModModule } from './control-panel/propert-mod.module';
import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './Services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ControlPanelComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CarModule,
    AppCarouselModule,
    PropertModModule
  ],
  // exports: [MatFormFieldModule, MatInputModule],
  providers: [CarService, AlertService, CarouselService, HousingService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
