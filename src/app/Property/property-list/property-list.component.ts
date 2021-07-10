import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../Services/Housing.service';
import { IProperty } from '../../Interfaces/IProperty.interface';
import { ICarousel } from '../../Interfaces/ICarousel';
import { CarouselService } from '../../Services/carousel.service';

import { FilterPipe } from '../../Pipes/filter.pipe';
import { ICar } from 'src/app/Interfaces/ICar';
import { CarService } from 'src/app/Services/car.service';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
  providers: [FilterPipe],
})
export class PropertyListComponent implements OnInit {
  properties: Array<IProperty>;
  imageUrl: string = environment.baseUrl + 'Resources/carousel/';
  isloading: boolean = true;
  cars: Array<ICar>;
  price:string;
  constructor(
    private housnigService: HousingService,
    private CarouselService: CarouselService,
    private carService: CarService
  ) {}
  carousels: Array<ICarousel>;
  ngOnInit() {
    this.CarouselService.getCaousels().subscribe((data) => {
      this.carousels = data;
    });
    this.getProperties();
    this.getCars();
    let test=formatDate(new Date(),'yyyy/MM/dd','en');

  }
  getProperties() {
    this.housnigService.getLastProperties(8).subscribe((data) => {
      this.properties = data;
      this.isloading = false;
    });
  }
  getCars() {
    this.carService.getLastCars(8).subscribe((car) => {
      this.cars = car;
    });
  }

}
