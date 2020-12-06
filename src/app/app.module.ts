import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PropertyCardComponent } from './Property/property-card/property-card.component';
import { PropertyListComponent } from './Property/property-list/property-list.component';
import {PropertyAddComponent} from './Property/property-add/property-add.component';
import { PropertyDetailComponent } from './Property/property-detail/property-detail.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {PropertyDeleteComponent} from './Property/property-delete/property-delete.component';
import{UplaodImageComponent} from './Property/property-add/uplaodImage/uplaodImage.component'

const appRoutes:Routes=[
  {path:'',component:PropertyListComponent},
  {path:'property-list',component:PropertyListComponent},
  {path:'property-detail/:id',component:PropertyDetailComponent},
  {path:'property-add', component:PropertyAddComponent},
  {path:'property-delete/:id', component:PropertyDeleteComponent}
]


@NgModule({
  declarations: [
    AppComponent,
      NavBarComponent,
      PropertyCardComponent,
      PropertyListComponent,
      PropertyDetailComponent,
      PropertyAddComponent,
      UplaodImageComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
