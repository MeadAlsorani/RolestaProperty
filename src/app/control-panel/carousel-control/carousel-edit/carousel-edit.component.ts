import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import {CarouselService} from '../../../Services/carousel.service';
import {AlertService} from '../../../Services/Alert.service';
import { ICarousel } from '../../../Interfaces/ICarousel';
@Component({
  selector: 'app-carousel-edit',
  templateUrl: './carousel-edit.component.html',
  styleUrls: ['./carousel-edit.component.css'],
})
export class CarouselEditComponent implements OnInit {
  Editcarousel: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CarouselEditComponent>,
    private caroService:CarouselService,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.Editcarousel = this.formBuilder.group({
      title: new FormControl(null),
      description: new FormControl(null),
      picture: new FormControl(null),
    });
    this.mapValues();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(data:ICarousel){
    data.id=this.data.id;
    this.caroService.editCarousel(this.data.id,data).subscribe(()=>{
      this.alert.success("تم تعديل الشريحة بنجاح");
      this.caroService.sendClickEvent();
      this.dialogRef.close();
    },
    error=>{
      this.alert.error("حصل خطأ اثناء تعديل الشريحة");
      console.log(error);

    }
    )

  }

  mapValues(){
    this.caroService.getCarouselById(this.data.id).subscribe(caro=>{
      this.title.setValue(caro.title);
      this.description.setValue(caro.description);
      this.picture.setValue(caro.picture);
    })
  }

  get title(){
    return this.Editcarousel.get('title');
  }
  get description(){
    return this.Editcarousel.get('description');
  }

  get picture(){
    return this.Editcarousel.get('picture');
  }
}
