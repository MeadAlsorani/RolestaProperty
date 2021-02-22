import { Component, OnInit } from '@angular/core';
import {ICar} from '../../Interfaces/ICar';
import {CarService} from '../../Services/car.service';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars:ICar[];
  constructor(
    private carService:CarService
  ) {}

  ngOnInit() {
    this.carService.getAllCars().subscribe(car=>{
      this.cars=car;
    })
  }

}
