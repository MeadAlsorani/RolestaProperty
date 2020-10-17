import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import {NgForm,FormGroup,FormControl, Validators} from '@angular/forms';
import { IProperty } from '../IProperty';

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
    Name:"",
    Price:null,
    provience:'',
    city:'',
    street:'',
    NoOfRooms:null,
    Type:'',
    Description:''
  }
  constructor() { }

  ngOnInit() {
    console.log(this.AddForm);

    this.AddForm=new FormGroup({
      Name:new FormControl(null,[Validators.required,Validators.minLength(5)]),
      Price:new FormControl(null,[Validators.required]),
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
  onSubmit(){
    console.log(this.AddForm);
  }
}
