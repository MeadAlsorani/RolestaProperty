import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../../Services/carousel.service';
import { ICarousel } from '../../Interfaces/ICarousel';
import { MatDialog } from '@angular/material/dialog';
import { CarouselAddComponent } from './carousel-add/carousel-add.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-carousel-control',
  templateUrl: './carousel-control.component.html',
  styleUrls: ['./carousel-control.component.css'],
})
export class CarouselControlComponent implements OnInit {
  carousels: Array<ICarousel>;
  constructor(private cs: CarouselService, public dialog: MatDialog) {
    this.clickEventSubscription=this.cs.getClickEvent().subscribe(()=>{
      this.getCarousels();
    });
  }
  title: string;
  description: string;
  carousel: ICarousel;
  clickEventSubscription:Subscription;
  ngOnInit() {
    this.getCarousels();
  }
  getCarousels() {
    this.cs.getCaousels().subscribe((carousel) => {
      this.carousels = carousel;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CarouselAddComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
