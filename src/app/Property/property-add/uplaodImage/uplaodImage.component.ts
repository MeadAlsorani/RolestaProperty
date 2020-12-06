import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
@Component({
  selector: 'app-uplaodImage',
  templateUrl: './uplaodImage.component.html',
  styleUrls: ['./uplaodImage.component.css']
})
export class UplaodImageComponent implements OnInit {

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  onUpload(files){
    let file=<File>files[0];


    const uploadData=new FormData();
    uploadData.append('image',file,file.name);

    console.log('aaaaa', );

    this.http.post("http://localhost:5000/api/Property",uploadData,{reportProgress:true,observe:'events'}).subscribe(
      event=>{
        console.log('111');

        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log('2222');

        }
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
        console.log('3333');

          this.onUploadFinished.emit(event.body);
        }
      }
    );

  }
}
