import { Component, OnInit } from '@angular/core';
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
  constructor(private proService: HousingService) {}

  ngOnInit() {
    this.getBuyProperties();
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
}
