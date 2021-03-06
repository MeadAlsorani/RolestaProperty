import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carsFilter'
})
export class CarsFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

  }

}

export interface ICarFilterParams{

}
