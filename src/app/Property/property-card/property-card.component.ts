import { Component, OnInit, Input } from '@angular/core';
import { IProperty,IHeating,IType } from '../../Interfaces/IProperty.interface';
import {Router} from '@angular/router';
import * as myGlobals from '../../../assets/global';
import {HousingService} from '../../Services/Housing.service';
import { ISubCategory } from '../../Interfaces/ICategory';
import {CategoryService} from '../../Services/category.service';
@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

@Input() property:IProperty;
@Input() ifPreview:boolean;
subCategory:ISubCategory={
  id:null,
  subCategoryName:"",
  categoryId:null
};
type:IType={
  id:null,
  typeName:""
};
imageUrl:string="Resources/Images/";
baseUrl=myGlobals.baseUrl;
viewProperty:IProperty;
  constructor(
    private hs:HousingService,
    private categoryService:CategoryService
    ) { }

  ngOnInit() {
    this.viewProperty=this.property;
  }
  ngAfterViewInit(){
    this.hs.getTypesById(this.property.typeId).subscribe(type=>{
      this.type=type;
    });
    this.hs.getHeatingById(this.property.heatingId).subscribe(heat=>{
      this.viewProperty.heating=heat;
    });
    this.categoryService.getSubCategoryById(this.property.subCategoryId).subscribe(data=>{
      this.subCategory=data;
    })
  }
}
