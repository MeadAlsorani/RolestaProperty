import { Pipe, PipeTransform } from '@angular/core';
import {IProperty} from '../Interfaces/IProperty.interface';
@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  outproperties:IProperty[]
  transform(properties:IProperty[],filterInfo:FilterParameters): any {
    console.log(filterInfo);

    if (!filterInfo.categoryId ||filterInfo.categoryId==0) {
      return properties;
    }

    if (filterInfo.categoryId ||filterInfo.categoryId!=0) {
      this.outproperties=properties.filter(prop=>prop.categoryId==filterInfo.categoryId);
      console.log(this.outproperties);
    }
    if (filterInfo.subCategoryId ||filterInfo.subCategoryId!=0) {
        this.outproperties=this.outproperties.filter(sub=>sub.subCategoryId==filterInfo.subCategoryId);
    }

    if (filterInfo.secondSubCategoryId ||filterInfo.secondSubCategoryId !=0 ) {
      this.outproperties=this.outproperties.filter(second=>second.secondSubCategoryId==filterInfo.secondSubCategoryId);
    }

    return this.outproperties;
  }

}

export interface FilterParameters{
  categoryId:number,
    subCategoryId:number,
    secondSubCategoryId:number,
}
