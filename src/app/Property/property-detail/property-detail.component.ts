import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProperty } from '../../Interfaces/IProperty.interface';
import { HousingService } from '../../Services/Housing.service';
import * as myGlobals from '../../../assets/global';
@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  propertyId:number;
  imageUrl:string="Resources/Images/";
  baseUrl=myGlobals.baseUrl;
  property:IProperty={
    SecondSubCategory:null,
    adOwner:null,
    area:null,
    buildingAge:null,
    buildingFloors:null,
    category:null,
    categoryId:null,
    city:null,
    date:null,
    description:null,
    floor:null,
    heating:null,
    heatingId:null,
    id:null,
    image:null,
    inSite:null,
    isFurnished:null,
    name:null,
    noOfRooms:null,
    price:null,
    proceeds:null,
    provience:null,
    secondSubCategoryId:null,
    street:null,
    subCategory:null,
    subCategoryId:null,
    type:null,
    typeId:null
  };
  constructor(
    private route:ActivatedRoute
    ,private router:Router
    ,private hs:HousingService) { }
  ngOnInit(): void {
    this.propertyId=+this.route.snapshot.params['id'];
    this.hs.getPropertyById(this.propertyId).subscribe(
      data=>{
        this.property=data;
      }
    )
  }

  onNext(){
    this.propertyId +=1;
    this.router.navigate(['property-detail',this.propertyId]);
  }

}
