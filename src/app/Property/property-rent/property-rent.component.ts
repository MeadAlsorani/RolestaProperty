import { Component, HostListener, OnInit } from '@angular/core';
import { HousingService } from '../../Services/Housing.service';
import { IProperty } from '../../Interfaces/IProperty.interface';
import { FilterParameters, filterRoot } from '../../Interfaces/ResponseObject';
import { CategoryService } from 'src/app/Services/category.service';
import { ICategory } from 'src/app/Interfaces/ICategory';
import { FilterService } from 'src/app/Services/filter.service';
@Component({
  selector: 'app-property-rent',
  templateUrl: './property-rent.component.html',
  styleUrls: ['./property-rent.component.css'],
})
export class PropertyRentComponent implements OnInit {
  screenWidth: number;

  properties: IProperty[];
  isLoading = true;
  categories: ICategory[];
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
  isOpened = true;
  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.screenWidth = event.target.innerWidth;
    this.checkScreenWidth();
  }
  constructor(
    private proService: HousingService,
    private catService: CategoryService,
    private filterService: FilterService
  ) {
    this.screenWidth = window.innerWidth;
  }
  checkScreenWidth(): void {
    if (this.screenWidth > 992) {
      this.isOpened = true;
    } else {
      this.isOpened = false;
    }
  }
  ngOnInit(): void {
    this.checkScreenWidth();
    this.getProperties(this.filterService.defaultFilter);
    this.catService.getCategoris().subscribe((data) => {
      this.categories = data;
    });
  }

  getProperties(filterParameters: filterRoot): void {
    this.proService.getRentProperties(filterParameters).subscribe(
      (data) => {
        console.log(data);

        this.properties = data.records;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onFilter(event): void {
    console.log(event);

    try {
      this.filters.filters = this.filterService.propertiesFilter(event).filters;
      console.log(this.filters);
      this.getProperties(this.filters);
    } catch (error) {
      console.log(error);
    }
  }
}
