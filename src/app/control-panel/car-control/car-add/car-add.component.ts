import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { CarService } from '../../../Services/car.service';
import { ICarCompany, ICar } from '../../../Interfaces/ICar';
import { AlertService } from '../../../Services/Alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  AddCar: FormGroup;
  @ViewChild('FormTabs') FormTabs: TabsetComponent;
  response: string;
  carCompanies: ICarCompany[];
  _car: ICar = {
    carCompanyId: 0,
    carCompany: null,
    description: '',
    descriptionEn: '',
    descriptionTr: '',
    id: 0,
    isAuto: false,
    isHeavy: false,
    isRent: false,
    lostAmount: 0,
    modelName: '',
    modelNameEn: '',
    modelYear: 0,
    price: 0,
    pictures: null,
  };
  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.getCarCompanies();

  }

  getCarCompanies() {
    this.carService.getAllCarsCompany().subscribe((data) => {
      this.carCompanies = data;
    });
  }
  initForm() {
    this.AddCar = this.formBuilder.group({
      modelYear: new FormControl(null, Validators.required),
      modelName: new FormControl(null, Validators.required),
      modelNameEn: new FormControl(null, Validators.required),
      isAuto: new FormControl(null, Validators.required),
      lostAmount: new FormControl(null),
      isHeavy: new FormControl(null),
      description: new FormControl(null, Validators.required),
      descriptionTr: new FormControl(null, Validators.required),
      descriptionEn: new FormControl(null, Validators.required),
      isRent: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      pictures: new FormControl(null, Validators.required),
      carCompanyId: new FormControl(null, Validators.required),
    });
  }
  //#region  from getters
  get modelYear() {
    return this.AddCar.get('modelYear') as FormControl;
  }
  get modelName() {
    return this.AddCar.get('modelName') as FormControl;
  }
  get modelNameEn() {
    return this.AddCar.get('modelNameEn') as FormControl;
  }
  get price() {
    return this.AddCar.get('price') as FormControl;
  }
  get isAuto() {
    return this.AddCar.get('isAuto') as FormControl;
  }
  get isHeavy() {
    return this.AddCar.get('isHeavy') as FormControl;
  }
  get lostAmount() {
    return this.AddCar.get('lostAmount') as FormControl;
  }
  get description() {
    return this.AddCar.get('description') as FormControl;
  }
  get descriptionTr() {
    return this.AddCar.get('descriptionTr') as FormControl;
  }
  get descriptionEn() {
    return this.AddCar.get('descriptionEn') as FormControl;
  }
  get isRent() {
    return this.AddCar.get('isRent') as FormControl;
  }
  get pictures() {
    return this.AddCar.get('pictures') as FormControl;
  }
  get carCompanyId() {
    return this.AddCar.get('carCompanyId') as FormControl;
  }
  //#endregion

  selectTab(tabId: number) {
    this.FormTabs.tabs[tabId].active = true;
  }

  uploadFinished(event) {
    this.response = event;
    console.log(this.response);
  }

  AddNewCar(car: ICar) {
    if(car.isHeavy==null) car.isHeavy=false;
    if(car.lostAmount==null) car.lostAmount=0;
    var newdesc=car.description.replace(/\n/gi,"<br>");
    car.description=newdesc;
    var newDescTr=car.descriptionTr.replace(/\n/gi,"<br>");
    car.descriptionTr=newDescTr;
    var newDescEn=car.descriptionEn.replace(/\n/gi,"<br>");
    car.descriptionEn=newDescEn;

    car.pictures = Object.assign([], this.response);
    this.carService.addCar(car).subscribe(
      () => {
        this.alert.success('تم اضافة السيارة بنجاح');
        this.router.navigate(['/car-control']);
      },
      (error) => {
        console.log(error);
        this.alert.error('حدث خطأ اثناء اضافة السيارة!!');
      }
    );
  }
  onReset() {
    if (this.response) {
      let frmData = new FormData();
      frmData.append('path', this.response);
      this.carService.deleteImage(frmData).subscribe(
        () => {
          this.selectTab(0);
          this.alert.notify('تم الغاء الاضافة');
        },
        (error) => {
          console.log(error);
          this.alert.error('حدث خطأ اثناء الاغاء...');
        }
      );
    } else {
      this.selectTab(0);
      this.alert.notify('تم الغاء الاضافة');
    }
  }
}
