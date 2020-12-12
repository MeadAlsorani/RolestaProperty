import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable } from 'rxjs';
import { IProperty } from '../Property/IProperty.interface';
import * as myGlobals from '../../assets/global';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
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

  deleteImage(path:FormData):Observable<any>{
    return this.http.post<any>(this.url+"file-delete",path);
  }
}
