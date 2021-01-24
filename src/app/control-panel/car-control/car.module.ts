import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarAddComponent} from './car-add/car-add.component';
import {CarEditComponent} from './car-edit/car-edit.component';
import {CarListComponent} from './car-list/car-list.component';
import {UplaodCarImageComponent} from './car-add/uplaodImage/uplaodImage.component';
import { SharedModule } from '../../shared/shared.module';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ModalModule} from 'ngx-bootstrap/modal';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TabsModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    CarAddComponent,
      CarEditComponent,
      CarListComponent,
      UplaodCarImageComponent
  ]
})
export class CarModule { }
