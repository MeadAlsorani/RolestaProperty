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
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
})
export class CarEditComponent implements OnInit {
  EditCarForm: FormGroup;
  carCompanies: Array<ICarCompany>;
  carId: number;
  @ViewChild('FormTabs') FormTabs: TabsetComponent;
  response: string;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.carId = +this.route.snapshot.params['id'];
    this.initForm();
    this.getCarCompanies();
    this.setFormValues();
  }

  EditCar(event:ICar) {
    if (this.response) {
      event.pictures=Object.assign([],this.response);
    }
    event.id=this.carId;
    this.carService.editCar(this.carId,event).subscribe(
      ()=>{
        this.alert.success("تم تعديل البيانات بنجاح");
        this.router.navigate(["/car-control"]);
      },
      error=>{
        console.log(error);
        this.alert.error("حدث خطا اثناء التعديل");
      }
    )
  }

  getCarCompanies() {
    this.carService.getAllCarsCompany().subscribe((data) => {
      this.carCompanies = data;
    });
  }
  initForm() {
    this.EditCarForm = this.formBuilder.group({
      modelYear: new FormControl(null, Validators.required),
      modelName: new FormControl(null, Validators.required),
      modelNameEn:new FormControl(null,Validators.required),
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

  selectTab(tabId: number) {
    this.FormTabs.tabs[tabId].active = true;
  }

  uploadFinished(event) {
    this.response = event;
    console.log(this.response);
  }
  //#region  from getters
  get modelYear() {
    return this.EditCarForm.get('modelYear') as FormControl;
  }
  get modelName() {
    return this.EditCarForm.get('modelName') as FormControl;
  }
  get modelNameEn(){
    return this.EditCarForm.get('modelNameEn') as FormControl;
  }
  get price() {
    return this.EditCarForm.get('price') as FormControl;
  }
  get isAuto() {
    return this.EditCarForm.get('isAuto') as FormControl;
  }
  get isHeavy() {
    return this.EditCarForm.get('isHeavy') as FormControl;
  }
  get lostAmount() {
    return this.EditCarForm.get('lostAmount') as FormControl;
  }
  get description() {
    return this.EditCarForm.get('description') as FormControl;
  }
  get descriptionTr(){
    return this.EditCarForm.get('descriptionTr') as FormControl;
  }
  get descriptionEn(){
    return this.EditCarForm.get('descriptionEn') as FormControl;
  }
  get isRent() {
    return this.EditCarForm.get('isRent') as FormControl;
  }
  get pictures() {
    return this.EditCarForm.get('pictures') as FormControl;
  }
  get carCompanyId() {
    return this.EditCarForm.get('carCompanyId') as FormControl;
  }
  //#endregion

  setFormValues() {
    this.carService.getCarById(this.carId).subscribe((car) => {
      this.modelName.setValue(car.modelName);
      this.modelYear.setValue(car.modelYear);
      this.price.setValue(car.price);
      this.carCompanyId.setValue(car.carCompanyId);
      this.isAuto.setValue(car.isAuto);
      this.isHeavy.setValue(car.isHeavy);
      this.isRent.setValue(car.isRent);
      this.lostAmount.setValue(car.lostAmount);
      this.description.setValue(car.description);
      this.descriptionEn.setValue(car.descriptionEn);
      this.descriptionTr.setValue(car.descriptionTr);
      this.pictures.setValue(car.pictures);
    });
  }
}
