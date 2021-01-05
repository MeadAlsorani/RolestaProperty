import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../Services/Housing.service';
import { IProperty } from '../../Interfaces/IProperty.interface';
import { ICarousel } from '../../Interfaces/ICarousel';
import {CarouselService} from '../../Services/carousel.service';
import * as myGlobals from '../../../assets/global';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  properties :Array<IProperty>;
  imageUrl:string=myGlobals.baseUrl+"Resources/carousel/";
  constructor(
    private housnigService:HousingService,
    private CarouselService:CarouselService
    ) { }
  carousels:Array<ICarousel>;
  ngOnInit() {
    this.CarouselService.getCaousels().subscribe(data=>{
      this.carousels=data;
    })
    this.housnigService.getAllProperties().subscribe(
      data=>{
        this.properties=data;
        console.log(data);
      }
    )
  }
}
