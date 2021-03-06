import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ICategory, ISecondSubCategory } from 'src/app/Interfaces/ICategory';
import { FilterParameters } from 'src/app/Pipes/filter.pipe';
import { CategoryService } from 'src/app/Services/category.service';
import { IProperty } from '../../Interfaces/IProperty.interface';
import { HousingService } from '../../Services/Housing.service';
@Component({
  selector: 'app-propert-buy',
  templateUrl: './propert-buy.component.html',
  styleUrls: ['./propert-buy.component.css'],
})
export class PropertBuyComponent implements OnInit {
  properties: IProperty[];
  isloading: boolean = true;
  categories;
  filterParams:FilterParameters={
    categoryId:null,
    highArea:null,
    highPrice:null,
    lowArea:null,
    lowPrice:null,
    name:null,
    noOfRooms:null,
    secondSubCategoryId:null,
    subCategoryId:null,
    buildingAgeLow:null,
    buildingAgeHigh:null
  }
  constructor(
    private proService: HousingService,
    private catService:CategoryService
    ) {}

  ngOnInit() {
    this.getBuyProperties();
    this.catService.getCategoris().subscribe(data=>{
      this.categories=data;
    });
  }

  getBuyProperties() {
    this.proService.getBuyProperties().subscribe(
      (data) => {
        this.properties = data;
      },
      null,
      () => {
        this.isloading = false;
      }
    );
  }

  onFilter(event){
    console.log(event);

    this.filterParams={
      categoryId:this.filterParams.categoryId,
      highArea:this.filterParams.highArea,
      highPrice:this.filterParams.highPrice,
      lowArea:this.filterParams.lowArea,
      lowPrice:this.filterParams.lowPrice,
      name:this.filterParams.name,
      noOfRooms:this.filterParams.noOfRooms,
      secondSubCategoryId:this.filterParams.secondSubCategoryId,
      subCategoryId:this.filterParams.subCategoryId,
      buildingAgeHigh:this.filterParams.buildingAgeHigh,
      buildingAgeLow:this.filterParams.buildingAgeLow
    }
  }
}
