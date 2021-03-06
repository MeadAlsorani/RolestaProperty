import { Pipe, PipeTransform } from '@angular/core';
import { IProperty } from '../Interfaces/IProperty.interface';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  outproperties: IProperty[];
  transform(properties: IProperty[], filterInfo: FilterParameters): any {
    // this.outproperties=properties
    // if (!filterInfo.categoryId || filterInfo.categoryId == 0) {
    //   return properties;
    // }
console.log(filterInfo);

    if (filterInfo.categoryId>0) {
      console.log("kkkkkkkk");
      properties = properties.filter(
        (prop) => prop.categoryId == filterInfo.categoryId
      );
    }
    if (filterInfo.subCategoryId > 0) {
      console.log("kkkkkkkk");

      properties = properties.filter(
        (sub) => sub.subCategoryId == filterInfo.subCategoryId
      );
    }

    if (filterInfo.secondSubCategoryId> 0) {
      console.log("kkkkkkkk");
      properties = properties.filter(
        (second) => second.secondSubCategoryId == filterInfo.secondSubCategoryId
      );
    }
    if (filterInfo.name) {
      console.log("kkkkkkkk");
      properties=properties.filter(
        nam=> filterInfo.name.includes(nam.name)
      )
    }
    if (filterInfo.lowPrice>0) {
      console.log("kkkkkkkk");
      properties=properties.filter(
        lowP=>lowP.price>= +filterInfo.lowPrice
      )
    }
    if(filterInfo.highPrice){
      console.log("kkkkkkkk");
      properties=properties.filter(
        highP=> highP.price<=+filterInfo.highPrice
      )
    }
    if(filterInfo.highArea){
      console.log("kkkkkkkk");
      properties=properties.filter(
        highA=> highA.price<= +filterInfo.highArea
      )
    }
    if(filterInfo.lowArea){
      console.log("kkkkkkkk");
      properties=properties.filter(
        lowA=> lowA.price>= +filterInfo.lowArea
      )
    }
    if (filterInfo.buildingAgeLow&& filterInfo.buildingAgeLow>=0) {
      console.log("kkkkkkkk");
      properties=properties.filter(
        rooms=> rooms.buildingAge>=filterInfo.buildingAgeLow
      )
    }
    if (filterInfo.buildingAgeHigh && filterInfo.buildingAgeHigh>=0) {
      console.log("kkkkkkkk");
      properties=properties.filter(
        rooms=> rooms.buildingAge<=filterInfo.buildingAgeHigh
      )
    }
    if (filterInfo.noOfRooms&& filterInfo.noOfRooms>=0) {
      console.log("kkkkkkkk");
      properties=properties.filter(
        rooms=> rooms.noOfRooms== +filterInfo.noOfRooms
      )
    }

    return properties;
  }
}

export interface FilterParameters {
  name: string;
  categoryId: number;
  subCategoryId: number;
  secondSubCategoryId: number;
  lowPrice:number;
  highPrice:number;
  lowArea:number;
  highArea:number;
  noOfRooms:number;
  buildingAgeLow:number;
  buildingAgeHigh:number
}
