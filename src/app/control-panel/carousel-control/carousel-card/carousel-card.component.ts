import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ICarousel } from '../../../Interfaces/ICarousel';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as myGlobals from '../../../../assets/global';
import { CarouselService } from '../../../Services/carousel.service';
import { AlertService } from '../../../Services/Alert.service';
import { MatDialog } from '@angular/material/dialog';
import {CarouselEditComponent} from '../carousel-edit/carousel-edit.component';
@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css'],
})
export class CarouselCardComponent implements OnInit {
  pictureUrl: string = myGlobals.baseUrl + 'Resources/carousel/';
  @Input() carousel: ICarousel;

  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private cs: CarouselService,
    private alert: AlertService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm(): void {
    this.cs.deleteCarousel(this.carousel.id).subscribe(
      (data) => {
        let imageData = new FormData();
        imageData.append('path', this.carousel.picture);
        this.cs.deleteImage(imageData).subscribe((dara) => {
          console.log(dara);
        });
        this.cs.sendClickEvent();
        this.alert.success('تم حذف الشريحة');
      },
      (error) => {
        console.log(error);
        this.alert.error('حدث خطأ اثناء حذف الشريحة');
      }
    );
    this.cs.sendClickEvent();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  openEditDialog():void{
    const dialogRef = this.dialog.open(CarouselEditComponent, {
      width: '250px',
      data:{id:this.carousel.id}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
