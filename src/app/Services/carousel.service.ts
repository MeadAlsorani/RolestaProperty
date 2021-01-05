import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ICarousel } from '../Interfaces/ICarousel';
import * as myGlobals from '../../assets/global';
@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  carouselUrl = myGlobals.apiUrl + 'carousels/';
  constructor(private hs: HttpClient) {}

  getCaousels(): Observable<ICarousel[]> {
    return this.hs.get<ICarousel[]>(this.carouselUrl);
  }

  getCarouselById(id: number): Observable<ICarousel> {
    return this.hs.get<ICarousel>(this.carouselUrl + id);
  }

  addCarousel(event): Observable<ICarousel> {
    return this.hs.post<ICarousel>(this.carouselUrl, event);
  }

  deleteCarousel(id: number): Observable<ICarousel> {
    return this.hs.delete<ICarousel>(this.carouselUrl + id);
  }

  editCarousel(id: number, event): Observable<ICarousel> {
    return this.hs.put<ICarousel>(this.carouselUrl + id, event);
  }

  deleteImage(path): Observable<string> {
    return this.hs.post<string>(`${this.carouselUrl}file-delete`, path);
  }

  private subject= new Subject<any>();

  sendClickEvent(){
    this.subject.next();
  }

  getClickEvent():Observable<any>{
    return this.subject.asObservable();
  }
}
