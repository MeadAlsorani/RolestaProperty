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

const appRoutes: Routes = [
  {
    path: '',
    component: PropertyListComponent,
  },
  { path: 'property-list', component: PropertyListComponent },
  { path: 'property-detail/:id', component: PropertyDetailComponent },
  {
    path: 'property-add',
    component: PropertyAddComponent,
    canActivate: [AuthGuard],
  },
  { path: 'control-list', component: ControlListComponent },
  { path: 'edit-property/:id', component: EditPropertyComponent },
  { path: 'control-panel', component: ControlPanelComponent },
  { path: 'carousel-control', component: CarouselControlComponent },
  { path: 'car-control', component: CarListComponent },
  { path: 'car-add', component: CarAddComponent },
  { path: 'car-edit/:id', component: CarEditComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
