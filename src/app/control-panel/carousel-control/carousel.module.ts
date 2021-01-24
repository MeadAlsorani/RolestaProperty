import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselControlComponent } from './carousel-control.component';
import { CarouselAddComponent } from './carousel-add/carousel-add.component';
import { CarouselCardComponent } from './carousel-card/carousel-card.component';
import { CarouselEditComponent } from './carousel-edit/carousel-edit.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SharedModule } from '../../shared/shared.module';
import {ModalModule} from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    CarouselControlComponent,
    CarouselAddComponent,
    CarouselCardComponent,
    CarouselEditComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    SharedModule,
    ModalModule.forRoot()
  ]
})
export class AppCarouselModule { }
