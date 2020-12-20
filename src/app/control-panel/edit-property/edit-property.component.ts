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
import { IProperty } from '../../Interfaces/IProperty.interface';
import * as myGlobals from '../../../assets/global';
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
  constructor(
    private route: ActivatedRoute,
    private hs: HousingService,
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder
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
    area:null,
    buildingAge:null,
    floor:null,
    buildingFloors:null,
    heatingId:null,
    adOwner:'',
    date:new Date(2020,10),
    isFurnished:true,
    inSite:true,
    heating:null,
    proceeds:null,
    type:null
  };

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.GetPropertyInfo();
    this.EditForm = this.fb.group({
      name: new FormControl(this.propertyPreview.name, [
        Validators.required,
        Validators.minLength(5),
      ]),
      price: new FormControl(null, [Validators.required]),
      provience: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      noOfRooms: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      image: new FormControl(),
    });
  }

  GetPropertyInfo() {
    return this.hs.getPropertyById(this.propertyId).subscribe((data) => {
      this.propertyPreview = data;
      console.log(this.propertyPreview);
      this.Name.setValue(this.propertyPreview.name);
      this.price.setValue(this.propertyPreview.price);
      this.type.setValue(this.propertyPreview.type);
      this.provience.setValue(this.propertyPreview.provience);
      this.street.setValue(this.propertyPreview.street);
      this.city.setValue(this.propertyPreview.city);
      this.description.setValue(this.propertyPreview.description);
      this.noOfRooms.setValue(this.propertyPreview.noOfRooms);
      this.image.setValue(this.propertyPreview.image);
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
    }
    else{
      propertyPreview.image= this.propertyPreview.image;
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

  onReset() {
    // if (this.response) {
    //   let frmData = new FormData();
    //   frmData.append('path', this.response);
    //   this.hs.deleteImage(frmData).subscribe(
    //     () => {
    //       this.selectTab(0);
    //       this.alert.notify('Form have been reseted');
    //     },
    //     (error) => {
    //       console.log(error);
    //       this.alert.error("Some error has happend...");
    //     }
    //   );
    // }
    // else{
    //   this.selectTab(0);
    //   this.alert.notify('Form have been reseted');
    // }
  }

  //#region getters
  get Name() {
    return this.EditForm.get('name');
  }
  get price() {
    return this.EditForm.get('price');
  }
  get provience() {
    return this.EditForm.get('provience');
  }
  get city() {
    return this.EditForm.get('city');
  }
  get street() {
    return this.EditForm.get('street');
  }
  get noOfRooms() {
    return this.EditForm.get('noOfRooms');
  }
  get type() {
    return this.EditForm.get('type');
  }
  get description() {
    return this.EditForm.get('description');
  }
  get image() {
    return this.EditForm.get('image');
  }
  //#endregion
}
