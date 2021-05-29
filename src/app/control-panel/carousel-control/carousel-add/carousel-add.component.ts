import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient, HttpEventType } from '@angular/common/http';
import {Router} from '@angular/router';
import {CarouselService} from '../../../Services/carousel.service';
import {AlertService} from '../../../Services/Alert.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-carousel-add',
  templateUrl: './carousel-add.component.html',
  styleUrls: ['./carousel-add.component.css']
})
export class CarouselAddComponent implements OnInit {
  Addcarousel:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CarouselAddComponent>,
    private formBuilder:FormBuilder,
    private cs:CarouselService,
    private alert:AlertService,
    private http:HttpClient,
    private router:Router
    ){}

  ngOnInit() {
    this.Addcarousel=this.formBuilder.group({
      title:new FormControl(null),
      description:new FormControl(null),
      picture:new FormControl(null)
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public progress: number;
  public message: string;
  public uploadData = new FormData();
  public response:string;
  selectedFiles: FileList;
  selectFiles(event) {
    this.selectFiles = event.target.files;
    for (let i = 0; i < this.selectFiles.length; i++) {
      this.uploadData.append('images', this.selectFiles[i], this.selectFiles[i].name);
      console.log(this.selectFiles[i].name);
    }
    this.onUpload();
  }
  onUpload() {
    this.http
      .post(environment.apiUrl+'carousels/image-upload', this.uploadData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'تم تحميل الصور بنجاح';
          this.response=event.body.toString();
        }
      });
  }

  onSubmit(event){
    if (this.response) {
      event.picture=this.response;
    }
    this.cs.addCarousel(event).subscribe(
      data=>{
        this.alert.success("تم اضافة الصورة بنجاح");
        this.cs.sendClickEvent();
        this.dialogRef.close();
      },
      error=>{
        console.log(error);
      }
    )
  }
}
