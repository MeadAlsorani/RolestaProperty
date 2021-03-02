import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../Services/Housing.service';
import { IProperty } from '../../Interfaces/IProperty.interface';
import { ICarousel } from '../../Interfaces/ICarousel';
import { CarouselService } from '../../Services/carousel.service';
import * as myGlobals from '../../../assets/global';
import { CategoryService } from '../../Services/category.service';
import {
  ICategory,
  ISubCategory,
  ISecondSubCategory,
} from '../../Interfaces/ICategory';
import { FilterParameters, FilterPipe } from '../../Pipes/filter.pipe';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
  providers: [FilterPipe],
})
export class PropertyListComponent implements OnInit {
  properties: Array<IProperty>;
  imageUrl: string = myGlobals.baseUrl + 'Resources/carousel/';
  filterInfo: FilterParameters = {
    categoryId: 0,
    secondSubCategoryId: 0,
    subCategoryId: 0,
  };
  isloading: boolean = true;
  categories: Array<ICategory>;
  subCategories: Array<ISubCategory>;
  secondSubCategories: Array<ISecondSubCategory>;
  constructor(
    private housnigService: HousingService,
    private CarouselService: CarouselService,
    private categoryService: CategoryService
  ) {}
  carousels: Array<ICarousel>;
  ngOnInit() {
    this.CarouselService.getCaousels().subscribe((data) => {
      this.carousels = data;
    });
    this.getProperties();
    this.getCategories();
  }
  getProperties() {
    this.housnigService.getAllProperties().subscribe((data) => {
      this.properties = data;
      console.log(data);
    });
  }
  getCategories() {
    this.categoryService.getCategoris().subscribe(
      (cat) => {
        this.categories = cat;
      },
      null,
      () => {
        this.isloading = false;
      }
    );
  }
  getSubCategories(CategoryId) {
    if (CategoryId.value) {
      this.categoryService.getSubCategories().subscribe((data) => {
        this.subCategories = data.filter(
          (x) => x.categoryId == CategoryId.value
        );
      });
    }
  }
  getSecondSubCategory(CategoryId) {
    this.categoryService.getSecondSubCategories().subscribe((data) => {
      this.secondSubCategories = data.filter(
        (x) => x.subCategoryId == CategoryId.value
      );
    });
  }

  filterSubmit(event) {
    this.properties = this.properties.filter(function (item) {
      console.log(item);

      for (var key in event) {
        if (item[key] === undefined || item[key] != event[key]) {
          return false;
        }
        return true;
      }
    });
  }
  clearFilter() {
    this.filterInfo.categoryId = 0;
    this.filterInfo.subCategoryId = 0;
    this.filterInfo.secondSubCategoryId = 0;
    this.getProperties();
  }

  log() {
    console.log(this.properties);
    console.log(this.filterInfo);
    this.filterInfo = {
      categoryId: this.filterInfo.categoryId,
      secondSubCategoryId: this.filterInfo.secondSubCategoryId,
      subCategoryId: this.filterInfo.subCategoryId,
    };
  }
}
