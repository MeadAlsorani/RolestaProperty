import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ModalModule} from 'ngx-bootstrap/modal';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PropertyCardComponent } from './Property/property-card/property-card.component';
import { PropertyListComponent } from './Property/property-list/property-list.component';
import {PropertyAddComponent} from './control-panel/property-add/property-add.component';
import { PropertyDetailComponent } from './Property/property-detail/property-detail.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import{UplaodImageComponent} from './control-panel/property-add/uplaodImage/uplaodImage.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ControlListComponent } from './control-panel/control-list/control-list.component';
import {EditPropertyComponent} from './control-panel/edit-property/edit-property.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {CarouselControlComponent} from './control-panel/carousel-control/carousel-control.component';
import {CarouselAddComponent} from './control-panel/carousel-control/carousel-add/carousel-add.component';
import {CarouselCardComponent} from './control-panel/carousel-control/carousel-card/carousel-card.component';
import {CarouselEditComponent} from './control-panel/carousel-control/carousel-edit/carousel-edit.component';
import {CarAddComponent} from './control-panel/car-control/car-add/car-add.component';
import {CarEditComponent} from './control-panel/car-control/car-edit/car-edit.component';
import {CarListComponent} from './control-panel/car-control/car-list/car-list.component';
import {CarService} from './Services/car.service';
import { AlertService } from './Services/Alert.service';
import { CarouselService } from './Services/carousel.service';
import { HousingService } from './Services/Housing.service';
import {UplaodCarImageComponent} from './control-panel/car-control/car-add/uplaodImage/uplaodImage.component';
const appRoutes:Routes=[
  {path:'',component:PropertyListComponent},
  {path:'property-list',component:PropertyListComponent},
  {path:'property-detail/:id',component:PropertyDetailComponent},
  {path:'property-add', component:PropertyAddComponent},
  {path:'control-list',component:ControlListComponent},
  {path:'edit-property/:id',component:EditPropertyComponent},
  {path:'control-panel',component:ControlPanelComponent},
  {path:'carousel-control',component:CarouselControlComponent},
  {path:'car-control',component:CarListComponent},
  {path:'car-add',component:CarAddComponent},
  {path:'car-edit',component:CarEditComponent}
]


@NgModule({
  declarations: [
    AppComponent,
      NavBarComponent,
      PropertyCardComponent,
      PropertyListComponent,
      PropertyDetailComponent,
      PropertyAddComponent,
      UplaodImageComponent,
      ControlListComponent,
      EditPropertyComponent,
      ControlPanelComponent,
      CarouselControlComponent,
      CarouselAddComponent,
      CarouselCardComponent,
      CarouselEditComponent,
      CarAddComponent,
      CarEditComponent,
      CarListComponent,
      UplaodCarImageComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    ModalModule.forRoot(),
    MatSidenavModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDialogModule
  ],
  exports:[
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [CarService,AlertService,CarouselService,HousingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
