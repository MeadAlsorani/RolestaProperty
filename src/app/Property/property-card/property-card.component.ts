import { Component, OnInit, Input } from '@angular/core';
import { IProperty } from '../IProperty.interface';
import {Router} from '@angular/router';
import * as myGlobals from '../../../assets/global';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

@Input() property:IProperty;
@Input() ifPreview:boolean;
imageUrl:string="Resources/Images/";

  constructor(private router:Router) { }

  ngOnInit() {
    console.log(myGlobals.apiUrl);

    if(this.property.image){
      this.property.image=myGlobals.apiUrl+this.imageUrl+this.property.image;
    }
  }

}
