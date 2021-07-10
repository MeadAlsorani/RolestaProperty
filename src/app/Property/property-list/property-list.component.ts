import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../Services/Housing.service';
import { IProperty } from '../../Interfaces/IProperty.interface';
import { ICarousel } from '../../Interfaces/ICarousel';
import { CarouselService } from '../../Services/carousel.service';

import { ICar } from 'src/app/Interfaces/ICar';
import { CarService } from 'src/app/Services/car.service';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties: Array<IProperty>;
  imageUrl: string = environment.baseUrl + 'Resources/carousel/';
  isloading = true;
  cars: Array<ICar>;
  price: string;
  constructor(
    private housnigService: HousingService,
    private carouselService: CarouselService,
    private carService: CarService
  ) {}
  carousels: Array<ICarousel>;
  ngOnInit(): void {
    this.carouselService.getCaousels().subscribe((data) => {
      this.carousels = data;
    });
    this.getProperties();
    this.getCars();
    // let test = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  }
  getProperties(): void {
    this.housnigService.getLastProperties(8).subscribe((data) => {
      this.properties = data;
      this.isloading = false;
    });
  }
  getCars(): void {
    this.carService.getLastCars(8).subscribe((car) => {
      this.cars = car;
    });
  }
}
