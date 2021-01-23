import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ICar, ICarCompany } from '../../../Interfaces/ICar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { CarService } from '../../../Services/car.service';
import {AlertService} from '../../../Services/Alert.service';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  carList:Array<ICar>;
  carCompanies:Array<ICarCompany>;
  carId:number;
  displayedColumns: string[] = [ 'modelYear', 'modelName', 'isAuto','isRent','price','companyId','id'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource:MatTableDataSource<ICar> = new MatTableDataSource([]);
  constructor(
    private carService:CarService,
    private alert:AlertService,
    private modalService: BsModalService
    ) { }
  ngOnInit() {
    this.getCarCompanies();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getCars();
  }
  getCars(){
    this.carService.getAllCars().subscribe(
      data=>{
        for (let car = 0; car < data.length; car++) {
          data[car].carCompany=this.carCompanies.find(x=>x.id===data[car].carCompanyId);
        }

        this.dataSource.data=data;
      }
    );
  }
  getCarCompanies(){
    this.carService.getAllCarsCompany().subscribe(
      data=>{
        this.carCompanies=data;
      }
    )
  }
  getAuto(auto){
    this.carService.isAuto(auto);
  }
  getRent(rent){
    this.carService.isRent(rent);
    console.log(this.carService.isRent(rent));

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  eventBool:any;

  RowDelete(event){
    return this.carService.getCarById(event).subscribe(
      getData=>{
        this.carService.deleteCar(getData.id).subscribe(
          propData=>{

            if(propData.pictures){
              let imagesNames:string=getData.pictures as undefined;
              let frmData=new FormData();
              frmData.append('path',imagesNames);

              this.carService.deleteImage(frmData).subscribe(
                dara=>{
                }
              );
            }
            this.getCars();
              this.alert.success("property have been deleted successfuly");
          },
          ()=>{
            this.alert.error("some error has happend!!")
          }
        )
      }
    )
  }

  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>,id) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.carId=id;
  }

  confirm(): void {
    this.RowDelete(this.carId);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
