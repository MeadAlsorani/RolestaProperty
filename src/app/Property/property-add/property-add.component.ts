import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import {NgForm} from '@angular/forms;'
import { IProperty } from '../IProperty';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.css']
})
export class PropertyAddComponent implements OnInit {
  @ViewChild('AddForm') AddForm: NgForm;
  @ViewChild('FormTabs') FormTabs: TabsetComponent ;

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
  }

  selectTab(tabId: number) {
    this.FormTabs.tabs[tabId].active = true;
  }
  onSubmit(){}
}
