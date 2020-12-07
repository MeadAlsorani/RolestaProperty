import { Component, OnInit, ViewChild, ɵConsole, Output, EventEmitter } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import {NgForm,FormGroup,FormControl, Validators} from '@angular/forms';
import { IProperty } from '../IProperty.interface';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { HousingService } from '../../Services/Housing.service';
import * as alertifyjs from 'alertifyjs';
import {Router} from '@angular/router';
import { AlertService } from '../../Services/Alert.service';
@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.css']
})
export class PropertyAddComponent implements OnInit {
  // @ViewChild('AddForm') AddForm: NgForm;
  @ViewChild('FormTabs') FormTabs: TabsetComponent ;
  AddForm:FormGroup;
  public response: string;


  constructor(
    private hs:HousingService,
    private router:Router,
    private alert:AlertService,
    ) { }
    propertyPreview:IProperty={
      id:null,
      name:"",
      price:null,
      provience:"",
      city:"",
      street:"",
      noOfRooms:null,
      type:"",
      description:"",
      image:""
    }
  ngOnInit() {
    console.log(this.AddForm);

    this.AddForm=new FormGroup({
      name:new FormControl(null,[Validators.required,Validators.minLength(5)]),
      price:new FormControl(null,[Validators.required]),
      Provience:new FormControl(null,Validators.required),
      City:new FormControl(null,Validators.required),
      Street:new FormControl(null,Validators.required),
      noOfRooms:new FormControl(null,Validators.required),
      type:new FormControl(null,Validators.required),
      description:new FormControl(null,Validators.required),
      image:new FormControl()
    })
  }

  selectTab(tabId: number) {
    this.FormTabs.tabs[tabId].active = true;
  }

  uploadFinished(event){
    this.response=event.test;

    console.log('eee', event.test);

  }

  onSubmit(propertyPreview) : void{
    console.log(this.response);
    propertyPreview.image=this.response;
    console.log(propertyPreview);

    this.hs.addProperty(propertyPreview).subscribe(
      data=>{
        console.log(data);
        data.image=this.response;
        this.alert.success("Property has been added successfuly");
        this.router.navigate(['']);
      },
      error=>{
        console.log(error);
        this.alert.error("An error has happend!! please check entered data..")
      }
    );
  }
}
