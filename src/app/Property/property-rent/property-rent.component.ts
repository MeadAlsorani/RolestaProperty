import { Component, OnInit } from '@angular/core';
import {HousingService} from '../../Services/Housing.service';
import { IProperty } from '../../Interfaces/IProperty.interface';
import { FilterParameters } from 'src/app/Pipes/filter.pipe';
import { CategoryService } from 'src/app/Services/category.service';
import { ICategory } from 'src/app/Interfaces/ICategory';
@Component({
  selector: 'app-property-rent',
  templateUrl: './property-rent.component.html',
  styleUrls: ['./property-rent.component.css']
})
export class PropertyRentComponent implements OnInit {
  properties:IProperty[];
  isLoading:boolean=true;
  categories:ICategory[];
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
    private proService:HousingService,
    private catService:CategoryService
  ) { }

  ngOnInit() {
    this.getProperties();
    this.catService.getCategoris().subscribe(data=>{
      this.categories=data;
    });
  }

  getProperties(){
    this.proService.getRentProperties().subscribe(
      data=>{
        this.properties=data;
      },error=>{
        console.log(error);
      },
      ()=>{
        this.isLoading=false;
      }
    )
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
