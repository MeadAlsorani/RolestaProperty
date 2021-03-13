import { Component, OnInit } from '@angular/core';
import { carFilterParams } from 'src/app/Pipes/carsFilter.pipe';
import {ICar, ICarCompany} from '../../Interfaces/ICar';
import {CarService} from '../../Services/car.service';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars:ICar[];
  isloading:boolean=true;
  carCompanies:ICarCompany[];
  filterParams:carFilterParams={
    HighPrice:null,
    carCompanyId:null,
    highModelYear:null,
    isAuto:null,
    isHeavy:null,
    isRent:null,
    lowModelYear:null,
    lowPrice:null,
    modelName:null
  }
  constructor(
    private carService:CarService
  ) {}

  ngOnInit() {
    this.carService.getAllCars().subscribe(car=>{
      this.cars=car;
    },null,
    ()=>{
      this.isloading=false;
    });
    this.carService.getAllCarsCompany().subscribe(
      data=>{
        this.carCompanies=data
      }
    )
  }

  onFilter(){
    this.filterParams={
      HighPrice:this.filterParams.HighPrice,
      carCompanyId:this.filterParams.carCompanyId,
      highModelYear:this.filterParams.highModelYear,
      isAuto:this.filterParams.isAuto,
      isHeavy:this.filterParams.isHeavy,
      isRent:this.filterParams.isRent,
      lowModelYear:this.filterParams.lowModelYear,
      lowPrice:this.filterParams.lowPrice,
      modelName:this.filterParams.modelName
    }
  }

}
