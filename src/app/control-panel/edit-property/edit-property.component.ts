import {
  Component,
  OnInit,
  ViewChild,
  ɵɵNgOnChangesFeature,
} from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { HousingService } from '../../Services/Housing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../Services/Alert.service';
import {
  IProperty,
  IType,
  IHeating,
} from '../../Interfaces/IProperty.interface';
import * as myGlobals from '../../../assets/global';
import {
  ICategory,
  ISubCategory,
  ISecondSubCategory,
} from '../../Interfaces/ICategory';
import { CategoryService } from '../../Services/category.service';
@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css'],
})
export class EditPropertyComponent implements OnInit {
  @ViewChild('FormTabs') FormTabs: TabsetComponent;
  EditForm: FormGroup;
  public response: string;
  propertyId: number;
  property: IProperty;
  imageUrl: string = 'Resources/Images/';
  types: Array<IType>;
  heatingValue: IHeating;
  heatings: Array<IHeating>;
  categories: Array<ICategory>;
  subCategories: Array<ISubCategory>;
  secondSubCategories: Array<ISecondSubCategory>;
  constructor(
    private route: ActivatedRoute,
    private hs: HousingService,
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    private categoryService: CategoryService
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
  };

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.hs.getTypes().subscribe((types) => {
      this.types = types;
    });
    this.hs.getHeatings().subscribe((heat) => {
      this.heatings = heat;
    });
    this.getCategories();

    this.editFormInit();
  }
  ngAfterViewInit() {
    this.GetPropertyInfo();
    this.categoryService.getSubCategories().subscribe((data) => {
      this.subCategories = data.filter(
        (x) => x.categoryId == this.propertyPreview.categoryId
      );
    });
    this.categoryService.getSecondSubCategories().subscribe((data) => {
      this.secondSubCategories = data.filter(
        (x) => x.subCategoryId == this.propertyPreview.subCategoryId
      );
    });
  }
  editFormInit() {
    this.EditForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
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
      type: new FormControl(),
      id: new FormControl(),
      categoryId: new FormControl(null, Validators.required),
      subCategoryId: new FormControl(null),
      secondSubCategoryId: new FormControl(null),
    });
  }
  getCategories() {
    this.categoryService.getCategoris().subscribe((data) => {
      this.categories = data;
    });
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
  GetPropertyInfo() {
    return this.hs.getPropertyById(this.propertyId).subscribe((data) => {
      this.propertyPreview = data;
      this.Name.setValue(this.propertyPreview.name);
      this.price.setValue(this.propertyPreview.price);
      this.provience.setValue(this.propertyPreview.provience);
      this.street.setValue(this.propertyPreview.street);
      this.city.setValue(this.propertyPreview.city);
      this.description.setValue(this.propertyPreview.description);
      this.noOfRooms.setValue(this.propertyPreview.noOfRooms);
      this.image.setValue(this.propertyPreview.image);
      this.floor.setValue(this.propertyPreview.floor);
      this.buildingAge.setValue(this.propertyPreview.buildingAge);
      this.buildingFloors.setValue(this.propertyPreview.buildingFloors);
      this.proceeds.setValue(this.propertyPreview.proceeds);
      this.area.setValue(this.propertyPreview.area);
      this.adOwner.setValue(this.propertyPreview.adOwner);
      this.isFurnished.setValue(this.propertyPreview.isFurnished);
      this.inSite.setValue(this.propertyPreview.inSite);
      this.heatingId.setValue(this.propertyPreview.heatingId);
      this.typeId.setValue(this.propertyPreview.typeId);
      this.categoryId.setValue(data.categoryId);
      this.subCategoryId.setValue(this.propertyPreview.subCategoryId);
      this.secondSubCategoryId.setValue(
        this.propertyPreview.secondSubCategoryId
      );
    });
  }
  selectTab(tabId: number) {
    this.FormTabs.tabs[tabId].active = true;
  }

  uploadFinished(event) {
    this.response = event;
    console.log(this.response);
  }

  onSubmit(propertyPreview): void {
    if (this.response) {
      propertyPreview.image = this.response;
    } else {
      propertyPreview.image = this.propertyPreview.image;
    }
    propertyPreview.id = this.propertyId;
    this.hs.editProperty(this.propertyId, propertyPreview).subscribe(
      (data) => {
        console.log(data);
        this.alert.success('Property has been edited successfuly');
        this.router.navigate(['/control-list']);
      },
      (error) => {
        console.log(error);
        this.alert.error('An error has happend!! please check entered data..');
      }
    );
  }
  log() {
    console.log(this.EditForm);
    console.log(this.propertyPreview);
  }

  //#region getters
  get Name() {
    return this.EditForm.get('name') as FormControl;
  }
  get provience() {
    return this.EditForm.get('provience') as FormControl;
  }
  get price() {
    return this.EditForm.get('price') as FormControl;
  }
  get city() {
    return this.EditForm.get('city') as FormControl;
  }
  get street() {
    return this.EditForm.get('street') as FormControl;
  }
  get noOfRooms() {
    return this.EditForm.get('noOfRooms') as FormControl;
  }
  get description() {
    return this.EditForm.get('description') as FormControl;
  }
  get area() {
    return this.EditForm.get('area') as FormControl;
  }
  get buildingFloors() {
    return this.EditForm.get('buildingFloors') as FormControl;
  }
  get adOwner() {
    return this.EditForm.get('adOwner') as FormControl;
  }
  get proceeds() {
    return this.EditForm.get('proceeds') as FormControl;
  }
  get floor() {
    return this.EditForm.get('floor');
  }
  get buildingAge() {
    return this.EditForm.get('buildingAge');
  }
  get image() {
    return this.EditForm.get('image');
  }
  get type() {
    return this.EditForm.get('type');
  }
  get isFurnished() {
    return this.EditForm.get('isFurnished');
  }
  get inSite() {
    return this.EditForm.get('inSite');
  }
  get heatingId() {
    return this.EditForm.get('heatingId');
  }
  get typeId() {
    return this.EditForm.get('typeId');
  }
  get categoryId() {
    return this.EditForm.get('categoryId');
  }
  get subCategoryId() {
    return this.EditForm.get('subCategoryId');
  }
  get secondSubCategoryId() {
    return this.EditForm.get('secondSubCategoryId');
  }
  //#endregion
}
