import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlListComponent } from './control-list/control-list.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { UplaodImageComponent } from './property-add/uplaodImage/uplaodImage.component';
import { PropertyCardComponent } from '../Property/property-card/property-card.component';
import { PropertyAddComponent } from './property-add/property-add.component';
import { PropertyDetailComponent } from '../Property/property-detail/property-detail.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PropertyRentComponent } from '../Property/property-rent/property-rent.component';
import { PropertBuyComponent } from '../Property/propert-buy/propert-buy.component';
@NgModule({
  declarations: [
    PropertyCardComponent,
    PropertyDetailComponent,
    PropertyAddComponent,
    UplaodImageComponent,
    ControlListComponent,
    EditPropertyComponent,
    PropertBuyComponent,
    PropertyRentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [PropertyCardComponent],
})
export class PropertModModule {}
