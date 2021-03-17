import { Component, Input, OnInit } from '@angular/core';
import {ICar, ICarCompany} from '../../../Interfaces/ICar';
import * as myGlobals from '../../../../assets/global';
import { CarService } from 'src/app/Services/car.service';
import { TranslateService } from '@ngx-translate/core';
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
  currentLang:string;
  constructor(
    private carService:CarService,
    private translate:TranslateService
  ) { }

  ngOnInit() {
    this.currentLang=this.translate.currentLang;
    this.translate.onLangChange.subscribe((data)=>{
      this.currentLang=data.lang
    })
    this.carService.getCarCompanyById(this.car.carCompanyId).subscribe(
      Company=>{
        this.carCompany=Company
      }
    )
  }

}
