import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  IProperty,
  IHeating,
  IType,
} from '../../Interfaces/IProperty.interface';
import { HousingService } from '../../Services/Housing.service';
import { Router } from '@angular/router';
import { AlertService } from '../../Services/Alert.service';
import { DatePipe } from '@angular/common';
import {
  ICategory,
  ISubCategory,
  ISecondSubCategory,
} from '../../Interfaces/ICategory';
import { CategoryService } from '../../Services/category.service';
@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.css'],
  providers: [DatePipe],
})
export class PropertyAddComponent implements OnInit {
  @ViewChild('FormTabs') FormTabs: TabsetComponent;
  AddForm: FormGroup;
  public response: string;
  myDate = Date.now();
  selectedValue: string;
  types: Array<IType>;
  heatings: Array<IHeating>;
  categories: Array<ICategory>;
  subCategories: Array<ISubCategory>;
  secondSubCategories: Array<ISecondSubCategory>;
  constructor(
    private hs: HousingService,
    private router: Router,
    private alert: AlertService,
    private categoryService: CategoryService,
    private datePipe:DatePipe
  ) {}
  propertyPreview: IProperty = {
    id: null,
    name: '',
    price: null,
    provience: '',
    city: '',
    street: '',
    noOfRooms: null,
    typeId: null,
    description: '',
    image: [''],
    area: null,
    buildingAge: null,
    floor: null,
    buildingFloors: null,
    heatingId: null,
    adOwner: '',
    date: new Date(2020, 10),
    isFurnished: true,
    inSite: true,
    heating: null,
    proceeds: null,
    type: null,
    categoryId: null,
    category: null,
    subCategoryId: null,
    subCategory: null,
    secondSubCategoryId: null,
    SecondSubCategory: null,
    phoneNumber:null,
    descriptionEn:null,
    descriptionTr:null
  };
  ngOnInit() {
    this.AddForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      provience: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      noOfRooms: new FormControl(null, Validators.required),
      typeId: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      image: new FormControl(),
      area: new FormControl(null, [Validators.required]),
      buildingAge: new FormControl(null, [Validators.required]),
      floor: new FormControl(null, [Validators.required]),
      buildingFloors: new FormControl(null, [Validators.required]),
      heatingId: new FormControl(null, [Validators.required]),
      adOwner: new FormControl(null, [Validators.required]),
      isFurnished: new FormControl(null, [Validators.required]),
      inSite: new FormControl(null, [Validators.required]),
      proceeds: new FormControl(null, [Validators.required]),
      CategoryId: new FormControl(null, Validators.required),
      subCategoryId: new FormControl(null, Validators.required),
      secondSubCategoryId: new FormControl(null),
      phoneNumber:new FormControl(null,Validators.required),
      descriptionTr: new FormControl(null),
      descriptionEn: new FormControl(null),
    });
    this.hs.getTypes().subscribe((data) => {
      this.types = data;
    });
    this.hs.getHeatings().subscribe((data) => {
      this.heatings = data;
    });
    this.categoryService.getCategoris().subscribe((data) => {
      this.categories = data;
    });
  }

  getSubCategories(CategoryId) {
    if (CategoryId.value) {
      this.categoryService.getSubCategories().subscribe((data) => {
        this.subCategories = data.filter(x=>x.categoryId==CategoryId.value);
      });
    }
  }
  getSecondSubCategory(CategoryId){
    this.categoryService.getSecondSubCategories().subscribe((data) => {
      this.secondSubCategories = data.filter(x=>x.subCategoryId==CategoryId.value);
    });
  }
  selectTab(tabId: number) {
    this.FormTabs.tabs[tabId].active = true;
  }
  log(event) {
    console.log(event);
  }
  uploadFinished(event) {
    this.response = event;
    console.log(this.response);
  }

  onSubmit(propertyPreview:IProperty): void {
    let newPhone=propertyPreview.phoneNumber.replace(/\n/gi,'<br>');
    propertyPreview.phoneNumber=newPhone;
    var newdesc=propertyPreview.description.replace(/\n/gi,"<br>");
    propertyPreview.description=newdesc;
    var newDescTr=propertyPreview.descriptionTr.replace(/\n/gi,"<br>");
    propertyPreview.descriptionTr=newDescTr;
    var newDescEn=propertyPreview.descriptionEn.replace(/\n/gi,"<br>");
    propertyPreview.descriptionEn=newDescEn;
    propertyPreview.image =Object.assign([],this.response) ;
    let dateTest=new Date();
    console.log(this.datePipe.transform(dateTest,'yyyy-MM-dd'));
    propertyPreview.date=new Date(this.datePipe.transform(dateTest,'yyyy-MM-dd'));
    this.hs.addProperty(propertyPreview).subscribe(
      (data) => {
        console.log(data);
        this.alert.success('Property has been added successfuly');
        this.router.navigate(['/control-list']);
      },
      (error) => {
        console.log(error);
        this.alert.error('An error has happend!! please check entered data..');
      }
    );
  }

  onReset() {
    if (this.response) {
      let frmData = new FormData();
      frmData.append('path', this.response);
      this.hs.deleteImage(frmData).subscribe(
        () => {
          this.selectTab(0);
          this.alert.notify('Form have been reseted');
        },
        (error) => {
          console.log(error);
          this.alert.error('Some error has happend...');
        }
      );
    } else {
      this.selectTab(0);
      this.alert.notify('Form have been reseted');
    }
  }

  //#region Getters
  get Name() {
    return this.AddForm.get('name');
  }
  get provience() {
    return this.AddForm.get('provience') as FormControl;
  }
  get price() {
    return this.AddForm.get('price') as FormControl;
  }
  get city() {
    return this.AddForm.get('city') as FormControl;
  }
  get street() {
    return this.AddForm.get('street') as FormControl;
  }
  get noOfRooms() {
    return this.AddForm.get('noOfRooms') as FormControl;
  }
  get description() {
    return this.AddForm.get('description') as FormControl;
  }
  get descriptionTr() {
    return this.AddForm.get('descriptionTr') as FormControl;
  }
  get descriptionEn() {
    return this.AddForm.get('descriptionEn') as FormControl;
  }
  get area() {
    return this.AddForm.get('area') as FormControl;
  }
  get buildingFloors() {
    return this.AddForm.get('buildingFloors') as FormControl;
  }
  get adOwner() {
    return this.AddForm.get('adOwner') as FormControl;
  }
  get proceeds() {
    return this.AddForm.get('proceeds') as FormControl;
  }
  get floor() {
    return this.AddForm.get('floor') as FormControl;
  }
  get buildingAge() {
    return this.AddForm.get('buildingAge') as FormControl;
  }
  get Category() {
    return this.AddForm.get('CategoryId') as FormControl;
  }
  get phoneNumber(){
    return this.AddForm.get('phoneNumber') as FormControl;
  }
  //#endregion
}
