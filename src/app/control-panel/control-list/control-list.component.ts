import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  IProperty,
  IType,
  IHeating,
} from '../../Interfaces/IProperty.interface';
import { HousingService } from '../../Services/Housing.service';
import { AlertService } from '../../Services/Alert.service';
import { MatTable } from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FilterService } from 'src/app/Services/filter.service';
@Component({
  selector: 'app-control-list',
  templateUrl: './control-list.component.html',
  styleUrls: ['./control-list.component.css'],
})
export class ControlListComponent implements OnInit {
  propertyList: Array<IProperty>;
  displayedColumns: string[] = [
    'name',
    'price',
    'Adress',
    'noOfRooms',
    'type',
    'description',
    'id',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource: MatTableDataSource<IProperty> = new MatTableDataSource([]);
  propertyId: number;
  typesArray: Array<IType>;
  heatingArray: Array<IHeating>;
  constructor(
    private hs: HousingService,
    private alert: AlertService,
    private modalService: BsModalService,
    private filterService:FilterService
  ) {}
  ngOnInit() {

    this.hs.getAllProperties(this.filterService.defaultFilter).subscribe(data=>{
      this.propertyList=data.records;
      this.dataSource.data=data.records
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  eventBool: any;

  RowDelete(event) {
    return this.hs.getPropertyById(event).subscribe((getData) => {
      this.hs.deleteProperty(getData.id).subscribe(
        (propData) => {
          if (propData.image) {
            let imagesNames: string = getData.image as undefined;
            let frmData = new FormData();
            frmData.append('path', imagesNames);

            this.hs.deleteImage(frmData).subscribe((dara) => {});
          }

          this.hs.getAllProperties(this.filterService.defaultFilter).subscribe((AllProperties) => {
            this.dataSource.data = AllProperties.records;
          });
          this.alert.success('property have been deleted successfuly');
        },
        () => {
          this.alert.error('some error has happend!!');
        }
      );
    });
  }

  RowEdit(event) {
    console.log(event);
  }

  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.propertyId = id;
  }

  confirm(): void {
    this.RowDelete(this.propertyId);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
