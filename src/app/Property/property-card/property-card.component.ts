import { Component, OnInit, Input } from '@angular/core';
import { IProperty,IHeating,IType } from '../../Interfaces/IProperty.interface';
import {HousingService} from '../../Services/Housing.service';
import { ISubCategory } from '../../Interfaces/ICategory';
import {CategoryService} from '../../Services/category.service';
import { environment } from 'src/environments/environment';
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
baseUrl=environment.baseUrl;
viewProperty:IProperty;
  constructor(
    private hs:HousingService,
    private categoryService:CategoryService
    ) { }

  ngOnInit() {
    this.viewProperty=this.property;
  }
}
