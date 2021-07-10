import { Component, OnInit } from '@angular/core';
import {
  filterObject,
  FilterParameters,
  filterRoot,
} from '../../Interfaces/ResponseObject';
import { CategoryService } from 'src/app/Services/category.service';
import { IProperty } from '../../Interfaces/IProperty.interface';
import { HousingService } from '../../Services/Housing.service';
import { FilterService } from '../../Services/filter.service';
@Component({
  selector: 'app-propert-buy',
  templateUrl: './propert-buy.component.html',
  styleUrls: ['./propert-buy.component.css'],
})
export class PropertBuyComponent implements OnInit {
  properties: IProperty[];
  isloading = true;
  categories;
  filters: filterRoot = {
    pagination: {
      pageNumber: 1,
      pageSize: 20,
    },
    sort: {
      isAsec: true,
      sortBy: 'date',
    },
    filters: {},
  };
  filterParams: FilterParameters = {
    categoryId: null,
    highArea: null,
    highPrice: null,
    lowArea: null,
    lowPrice: null,
    name: null,
    noOfRooms: null,
    secondSubCategoryId: null,
    subCategoryId: null,
    buildingAgeLow: null,
    buildingAgeHigh: null,
  };
  constructor(
    private proService: HousingService,
    private catService: CategoryService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.getBuyProperties(this.filterService.defaultFilter);
    this.catService.getCategoris().subscribe((data) => {
      this.categories = data;
    });
  }

  getBuyProperties(filterParams: filterRoot): void {
    this.proService.getBuyProperties(filterParams).subscribe((data) => {
      this.properties = data.records;
      this.isloading = false;
    });
  }

  onFilter(event): void {
    try {
      this.filters.filters = this.filterService.propertiesFilter(event).filters;
      console.log(this.filters);
      this.getBuyProperties(this.filters);
    } catch (error) {
      console.log(error);
    }
  }
}
