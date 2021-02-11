import { Component, OnInit } from '@angular/core';
import {HousingService} from '../../Services/Housing.service';
import { IProperty } from '../../Interfaces/IProperty.interface';
@Component({
  selector: 'app-property-rent',
  templateUrl: './property-rent.component.html',
  styleUrls: ['./property-rent.component.css']
})
export class PropertyRentComponent implements OnInit {
  properties:IProperty[];
  constructor(
    private proService:HousingService
  ) { }

  ngOnInit() {
    this.getProperties();
  }

  getProperties(){
    this.proService.getRentProperties().subscribe(
      data=>{
        this.properties=data;
      }
    )
  }

}
