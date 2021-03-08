import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICar, ICarCompany } from '../../../Interfaces/ICar';
import { CarService } from '../../../Services/car.service';
import * as myGlobals from '../../../../assets/global';
@Component({
  selector: 'app-car-datails',
  templateUrl: './car-datails.component.html',
  styleUrls: ['./car-datails.component.css'],
})
export class CarDatailsComponent implements OnInit {
  carId: number;
  car: ICar = {
    id: null,
    modelYear: null,
    modelName: null,
    isAuto: null,
    lostAmount: null,
    isHeavy: null,
    description: null,
    isRent: null,
    price: null,
    pictures: null,
    carCompanyId: null,
    carCompany: null,
  };
  imageUrl: string = 'Resources/cars/';
  baseUrl = myGlobals.baseUrl;
  carCompany:ICarCompany={
    companyName:null,
    id:null
  }
  constructor(private route: ActivatedRoute, private CarService: CarService) {}

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.carId = +data['id'];
      this.CarService.getCarById(this.carId).subscribe((data) => {
        this.car = data;
        this.CarService.getCarCompanyById(data.carCompanyId).subscribe(
          company=>{
            this.carCompany=company
          }
        )
      });
    });
  }

  isRent(value){
    if (value) {
      return "ايجار";
    }
    else{
      return "مبيع";
    }
  }
  isAuto(value){
    if (value) {
      return "اوتوماتيك";
    }
    else{
      return "عادي";
    }
  }
}
