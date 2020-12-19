import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../Services/Housing.service';
import { IProperty } from '../../Interfaces/IProperty.interface';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  properties :Array<IProperty>;
  constructor(private housnigService:HousingService) { }

  ngOnInit() {
    this.housnigService.getAllProperties().subscribe(
      data=>{
        this.properties=data;
        console.log(data);
      }
    )
  }
}
