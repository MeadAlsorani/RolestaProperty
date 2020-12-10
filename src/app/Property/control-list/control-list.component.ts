import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IProperty } from '../IProperty.interface';
import {HousingService} from '../../Services/Housing.service';
@Component({
  selector: 'app-control-list',
  templateUrl: './control-list.component.html',
  styleUrls: ['./control-list.component.css']
})
let properties:IProperty[]=[];
export class ControlListComponent implements OnInit {
  propertyList:Array<string>;
  displayedColumns: string[] = [ 'name', 'price', 'provience','city','street','noOfRooms','type','description'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource=[];
  constructor(private hs:HousingService) { }
  ngOnInit() {
    this.hs.getAllProperties().subscribe(
      data=>{
        this.propertyList=data;
        console.log(this.propertyList);
      }
    );
    this.dataSource=this.propertyList;
    // this.dataSource=this.propertyList;
  }

}
