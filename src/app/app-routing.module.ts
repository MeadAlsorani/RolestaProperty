import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyListComponent } from './Property/property-list/property-list.component';
import { PropertyDetailComponent } from './Property/property-detail/property-detail.component';
import { PropertyAddComponent } from './control-panel/property-add/property-add.component';
import { ControlListComponent } from './control-panel/control-list/control-list.component';
import { EditPropertyComponent } from './control-panel/edit-property/edit-property.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { CarouselControlComponent } from './control-panel/carousel-control/carousel-control.component';
import { CarListComponent } from './control-panel/car-control/car-list/car-list.component';
import { CarAddComponent } from './control-panel/car-control/car-add/car-add.component';
import { CarEditComponent } from './control-panel/car-control/car-edit/car-edit.component';
import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { PropertyRentComponent } from './Property/property-rent/property-rent.component';
import { PropertBuyComponent } from './Property/propert-buy/propert-buy.component';
import { CarsComponent } from './Property/cars/cars.component';
import { AboutComponent } from './about/about.component';
import { CarDatailsComponent } from './Property/cars/car-datails/car-datails.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/property-list',
    pathMatch: 'full',
  },
  { path: 'property-list', component: PropertyListComponent },
  { path: 'property-detail/:id', component: PropertyDetailComponent },
  {
    path: 'property-add',
    component: PropertyAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'control-list',
    component: ControlListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-property/:id',
    component: EditPropertyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'control-panel',
    component: ControlPanelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'carousel-control',
    component: CarouselControlComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'car-control',
    component: CarListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'car-add', component: CarAddComponent, canActivate: [AuthGuard] },
  {
    path: 'car-edit/:id',
    component: CarEditComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'forRent', component: PropertyRentComponent },
  { path: 'forSale', component: PropertBuyComponent },
  { path: 'car-list', component: CarsComponent },
  { path: 'contactUs', component: AboutComponent },
  { path: 'carDetails/:id', component: CarDatailsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
