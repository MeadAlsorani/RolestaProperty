import { Component, OnInit, Input } from '@angular/core';
import { IProperty,IHeating,IType } from '../../Interfaces/IProperty.interface';
import {Router} from '@angular/router';
import * as myGlobals from '../../../assets/global';
import {HousingService} from '../../Services/Housing.service';
@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

@Input() property:IProperty;
@Input() ifPreview:boolean;
imageUrl:string="Resources/Images/";
baseUrl=myGlobals.baseUrl;
  constructor(private router:Router,private hs:HousingService) { }

  ngOnInit() {
    this.hs.getHeatingById(this.property.heatingId).subscribe(
      data=>{
        this.property.heating=data;
      }
    );
    this.hs.getTypesById(this.property.typeId).subscribe(
      data=>{
        this.property.type=data;
      }
    )
    console.log(this.property);


  }

}
