import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, Subscription } from 'rxjs';
import { IProperty } from '../Property/IProperty.interface';
import * as myGlobals from '../../assets/global';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  DeleteEmitter=new EventEmitter();
  subVar:Subscription;
  url: string = myGlobals.apiUrl+"Property/";
  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<IProperty[]> {
    return this.http.get<IProperty[]>(this.url);
  }

  getPropertyById(id: number): Observable<IProperty> {
    return this.http.get<IProperty>(this.url+id);
  }

  addProperty(data: IProperty): Observable<IProperty> {
    return this.http.post<IProperty>(this.url + 'add-property', data);
  }

  deleteProperty(id: number): Observable<IProperty> {
    return this.http.delete<IProperty>(this.url + 'deleteProperty/' + id);
  }

  deleteImage(path):Observable<string>{
    return this.http.post<string>(this.url+"file-delete",path);
  }

  editProperty(id:number,property:IProperty):Observable<IProperty>{
    return this.http.put<IProperty>(this.url+id,property);
  }
}
