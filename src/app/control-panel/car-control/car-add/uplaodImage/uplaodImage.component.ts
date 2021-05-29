import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-uplaodCarImage',
  templateUrl: './uplaodImage.component.html',
  styleUrls: ['./uplaodImage.component.css'],
})
export class UplaodCarImageComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  public uploadData = new FormData();
  constructor(private http: HttpClient) {}

  ngOnInit() {}
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
      .post(environment.apiUrl+'cars/fileUpload', this.uploadData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }
}
