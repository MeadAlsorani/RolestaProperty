import { Component, Input, OnInit } from '@angular/core';
import {ICar, ICarCompany} from '../../../Interfaces/ICar';
import * as myGlobals from '../../../../assets/global';
import { CarService } from 'src/app/Services/car.service';
@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {
  @Input() car:ICar
  carImageUrl:string=myGlobals.baseUrl+"Resources/cars/";
  carCompany:ICarCompany={
    companyName:null,
    id:null
  }
  constructor(
    private carService:CarService
  ) { }

  ngOnInit() {
    this.carService.getCarCompanyById(this.car.carCompanyId).subscribe(
      Company=>{
        this.carCompany=Company
      }
    )
  }

}
