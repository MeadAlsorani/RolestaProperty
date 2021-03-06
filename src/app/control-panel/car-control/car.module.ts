import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ModalModule} from 'ngx-bootstrap/modal';


import {CarAddComponent} from './car-add/car-add.component';
import {CarEditComponent} from './car-edit/car-edit.component';
import {CarListComponent} from './car-list/car-list.component';
import {UplaodCarImageComponent} from './car-add/uplaodImage/uplaodImage.component';
import {CarCardComponent} from './car-card/car-card.component'
import {CarsComponent} from '../../Property/cars/cars.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {CarsFilterPipe} from '../../Pipes/carsFilter.pipe';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot()
  ],
  declarations: [
    CarAddComponent,
      CarEditComponent,
      CarListComponent,
      UplaodCarImageComponent,
      CarCardComponent,
      CarsComponent
  ],
  providers:[CarsFilterPipe]
})
export class CarModule { }
