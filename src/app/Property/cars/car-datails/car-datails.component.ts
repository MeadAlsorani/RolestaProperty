import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICar, ICarCompany } from '../../../Interfaces/ICar';
import { CarService } from '../../../Services/car.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-car-datails',
  templateUrl: './car-datails.component.html',
  styleUrls: ['./car-datails.component.css'],
})
export class CarDatailsComponent implements OnInit {
  carId: number;
  currentLang;
  car: ICar = {
    id: null,
    modelYear: null,
    modelName: null,
    modelNameEn:null,
    isAuto: null,
    lostAmount: null,
    isHeavy: null,
    description: null,
    isRent: null,
    price: null,
    pictures: null,
    carCompanyId: null,
    carCompany: null,
    descriptionEn:null,
    descriptionTr:null
  };
  imageUrl: string = 'Resources/cars/';
  baseUrl = environment.baseUrl;
  carCompany:ICarCompany={
    companyName:null,
    id:null
  }
  constructor(
    private route: ActivatedRoute,
    private CarService: CarService,
    private translate:TranslateService
    ) {
      this.translate.onLangChange.subscribe(
        ()=>{
          this.getLanguage();
          this.getCar();
        }
      )
    }

  ngOnInit() {
    this.getLanguage();
    this.getCar();
  }

  getCar(){
    this.route.params.subscribe((data) => {
      this.carId = +data['id'];
      this.CarService.getCarById(this.carId).subscribe((data) => {
        this.car = data;
      });
    });
  }
  getLanguage(){
    this.currentLang=this.translate.currentLang;
  }
  isRent(value){
    if (value) {
      if (this.currentLang=='ar') {
        return "ايجار";
      }
      if (this.currentLang=='en') {
        return "Rent";
      }
      if (this.currentLang=='tr') {
        return "Kira";
      }
    }
    else{
      if (this.currentLang=='ar') {
        return "مبيع";
      }
      if (this.currentLang=='en') {
        return "Sale";
      }
      if (this.currentLang=='tr') {
        return "Satış";
      }
    }
  }
  isAuto(value){
    if (value) {
      if (this.currentLang=='ar') {
        return "اوتوماتيك";
      }
      if (this.currentLang=='en') {
        return "Automatic";
      }
      if (this.currentLang=='tr') {
        return "Oto";
      }
    }
    else{
      if (this.currentLang=='ar') {
        return "عادي";
      }
      if (this.currentLang=='en') {
        return "Manual";
      }
      if (this.currentLang=='tr') {
        return "Düz";
      }
    }
  }
}
