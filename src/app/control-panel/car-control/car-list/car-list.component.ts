import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  AfterViewInit,
} from '@angular/core';
import { ICar, ICarCompany } from '../../../Interfaces/ICar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CarService } from '../../../Services/car.service';
import { AlertService } from '../../../Services/Alert.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FilterService } from 'src/app/Services/filter.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit, AfterViewInit {
  carList: Array<ICar>;
  carCompanies: Array<ICarCompany>;
  carId: number;

  displayedColumns: string[] = [
    'modelYear',
    'modelName',
    'isAuto',
    'isRent',
    'price',
    'companyId',
    'id',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource: MatTableDataSource<ICar> = new MatTableDataSource([]);
  constructor(
    private carService: CarService,
    private alert: AlertService,
    private modalService: BsModalService,
    private filterService: FilterService
  ) {}
  modalRef: BsModalRef;
  eventBool: any;
  defaultFilters = this.filterService.defaultFilter;
  ngOnInit(): void {
    this.getCarCompanies();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getCars();
  }
  getCars(): void {
    this.carService.getAllCars(this.defaultFilters).subscribe((data) => {
      for (const car of data) {
        car.carCompany = this.carCompanies.find(
          (x) => x.id === car.carCompanyId
        );
      }
      this.dataSource.data = data;
      console.log(data);
    });
  }
  getCarCompanies(): void {
    this.carService.getAllCarsCompany().subscribe((data) => {
      this.carCompanies = data;
    });
  }
  isRent(value): string {
    if (value) {
      return 'ايجار';
    } else {
      return 'مبيع';
    }
  }
  isAuto(value): string {
    if (value) {
      return 'اوتوماتيك';
    } else {
      return 'عادي';
    }
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  RowDelete(event): Subscription {
    return this.carService.getCarById(event).subscribe((getData) => {
      this.carService.deleteCar(getData.id).subscribe(
        (propData) => {
          if (propData.pictures) {
            const imagesNames: string = getData.pictures as undefined;
            const frmData = new FormData();
            frmData.append('path', imagesNames);

            this.carService.deleteImage(frmData).subscribe((dara) => {});
          }
          this.getCars();
          this.alert.success('property have been deleted successfuly');
        },
        () => {
          this.alert.error('some error has happend!!');
        }
      );
    });
  }

  openModal(template: TemplateRef<any>, id): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.carId = id;
  }

  confirm(): void {
    this.RowDelete(this.carId);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
