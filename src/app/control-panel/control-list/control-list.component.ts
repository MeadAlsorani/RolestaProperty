import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IProperty } from '../../Property/IProperty.interface';
import {HousingService} from '../../Services/Housing.service';
import {AlertService} from '../../Services/Alert.service';
import {MatTable} from '@angular/material/table';
@Component({
  selector: 'app-control-list',
  templateUrl: './control-list.component.html',
  styleUrls: ['./control-list.component.css']
})

export class ControlListComponent implements OnInit {
  propertyList:Array<IProperty>;
  displayedColumns: string[] = [ 'name', 'price', 'provience','city','street','noOfRooms','type','description','id'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource:MatTableDataSource<IProperty> = new MatTableDataSource([]);
  constructor(
    private hs:HousingService,
    private alert:AlertService
    ) { }
  ngOnInit() {
    this.hs.getAllProperties().subscribe(
      data=>{
        this.dataSource.data=data;
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  RowDelete(event){
    return this.hs.deleteProperty(event).subscribe(
      ()=>{
        this.table.renderRows();
        this.alert.success("Property have been deleted");
      },
      ()=>{
        this.alert.error("Error deleting the property...")
      }
    );
  }
  RowEdit(event){
    console.log(event);
  }
}
