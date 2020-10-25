import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import {NgForm,FormGroup,FormControl, Validators} from '@angular/forms';
import { IProperty } from '../IProperty';
import { HttpClient } from '@angular/common/http';
import { HousingService } from '../../Services/Housing.service';
import * as alertifyjs from 'alertifyjs';
import {Router} from '@angular/router';
@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.css']
})
export class PropertyAddComponent implements OnInit {
  // @ViewChild('AddForm') AddForm: NgForm;
  @ViewChild('FormTabs') FormTabs: TabsetComponent ;
  AddForm:FormGroup;

  propertyPreview:IProperty={
    id:null,
    name:"",
    price:null,
    provience:'',
    city:'',
    street:'',
    NoOfRooms:null,
    Type:'',
    Description:''
  }
  constructor(
    private hs:HousingService,
    private router:Router,
    ) { }

  ngOnInit() {
    console.log(this.AddForm);

    this.AddForm=new FormGroup({
      name:new FormControl(null,[Validators.required,Validators.minLength(5)]),
      price:new FormControl(null,[Validators.required]),
      Provience:new FormControl(null,Validators.required),
      City:new FormControl(null,Validators.required),
      Street:new FormControl(null,Validators.required),
      NoOfRooms:new FormControl(null,Validators.required),
      Type:new FormControl(null,Validators.required),
      Description:new FormControl(null,Validators.required)
    })
  }

  selectTab(tabId: number) {
    this.FormTabs.tabs[tabId].active = true;
  }
  onSubmit(propertyPreview){
    this.hs.addProperty(propertyPreview.getRawValue()).subscribe(
      data=>{
        console.log(data);
        alertifyjs.success("Property has been added successfuly");
        this.router.navigate(['property-list']);
      },
      error=>{
        console.log(error);
        alertifyjs.error("An error has happend!! please check entered data..")
      }
    );

  }
}
