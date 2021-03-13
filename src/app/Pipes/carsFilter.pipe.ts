import { Pipe, PipeTransform } from '@angular/core';
import { ICar } from '../Interfaces/ICar';

@Pipe({
  name: 'carsFilter'
})
export class CarsFilterPipe implements PipeTransform {

  transform(cars: ICar[],filterParams:carFilterParams): any {
    if (filterParams.HighPrice>0) {
      cars=cars.filter(
        price=> price.price<= +filterParams.HighPrice
      )
    }
    if (filterParams.lowPrice>0) {
      cars=cars.filter(
        price=> price.price>= +filterParams.lowPrice
      )
    }
    if (filterParams.lowModelYear>0) {
      cars=cars.filter(
        model=> model.modelYear>= +filterParams.lowModelYear
      )
    }
    if (filterParams.highModelYear>0) {
      cars=cars.filter(
        car=> car.modelYear<= +filterParams.highModelYear
      )
    }
    if (filterParams.isAuto) {
      cars=cars.filter(
        car=> car.isAuto==filterParams.isAuto
      )
    }
    if (filterParams.isHeavy) {
      cars=cars.filter(
        car=> car.isHeavy==filterParams.isHeavy
      )
    }
    if (filterParams.isRent) {
      cars=cars.filter(
        rent=> rent.isRent==filterParams.isRent
      )
    }

    if (filterParams.carCompanyId>0) {
      cars=cars.filter(
        company=>company.carCompanyId==filterParams.carCompanyId
      )
    }
    return cars;
  }

}


export interface carFilterParams{
  lowModelYear:number,
  highModelYear:number,
  modelName:string,
  isAuto:boolean,
  isHeavy:boolean,
  isRent:boolean,
  lowPrice:number,
  HighPrice:number,
  carCompanyId:number,
}
