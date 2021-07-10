import { Component, OnInit } from '@angular/core';
import { filterRoot } from 'src/app/Interfaces/ResponseObject';
import { carFilterParams } from 'src/app/Pipes/carsFilter.pipe';
import { ICar, ICarCompany } from '../../Interfaces/ICar';
import { CarService } from '../../Services/car.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  cars: ICar[];
  isloading = true;
  carCompanies: ICarCompany[];
  filterParams: carFilterParams = {
    HighPrice: null,
    carCompanyId: null,
    highModelYear: null,
    isAuto: null,
    isHeavy: null,
    isRent: null,
    lowModelYear: null,
    lowPrice: null,
    modelName: null,
  };
  defaultFilters: filterRoot = {
    pagination: {
      pageNumber: 1,
      pageSize: 20,
    },
    sort: {
      sortBy: 'id',
      isAsec: true,
    },
    filters: {},
  };
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getAllCars(this.defaultFilters).subscribe((car) => {
      this.cars = car;
      this.carService
        .getAllCarsCompany()
        .pipe(tap(() => (this.isloading = false)))
        .subscribe(
          (data) => {
            this.carCompanies = data;
          }
        );
    });
  }

  onFilter(): void {
    this.filterParams = {
      HighPrice: this.filterParams.HighPrice,
      carCompanyId: this.filterParams.carCompanyId,
      highModelYear: this.filterParams.highModelYear,
      isAuto: this.filterParams.isAuto,
      isHeavy: this.filterParams.isHeavy,
      isRent: this.filterParams.isRent,
      lowModelYear: this.filterParams.lowModelYear,
      lowPrice: this.filterParams.lowPrice,
      modelName: this.filterParams.modelName,
    };
  }
}
