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

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PropertyCardComponent } from './Property/property-card/property-card.component';
import { PropertyListComponent } from './Property/property-list/property-list.component';
import {PropertyAddComponent} from './control-panel/property-add/property-add.component';
import { PropertyDetailComponent } from './Property/property-detail/property-detail.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {PropertyDeleteComponent} from './control-panel/property-delete/property-delete.component';
import{UplaodImageComponent} from './control-panel/property-add/uplaodImage/uplaodImage.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ControlListComponent } from './control-panel/control-list/control-list.component';
import { from } from 'rxjs';
const appRoutes:Routes=[
  {path:'',component:PropertyListComponent},
  {path:'property-list',component:PropertyListComponent},
  {path:'property-detail/:id',component:PropertyDetailComponent},
  {path:'property-add', component:PropertyAddComponent},
  {path:'property-delete/:id', component:PropertyDeleteComponent},
  {path:'control-list',component:ControlListComponent}
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
      ControlListComponent
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
    MatInputModule
  ],
  exports:[
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
