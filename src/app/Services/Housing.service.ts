import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, Subscription } from 'rxjs';
import { IProperty, IHeating, IType } from '../Interfaces/IProperty.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  DeleteEmitter=new EventEmitter();
  subVar:Subscription;
  url: string = environment.apiUrl+"Property/";
  constructor(private http: HttpClient) {}
  //#region property methods
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

  getRentProperties():Observable<IProperty[]>{
    return this.http.get<IProperty[]>(this.url+"rent");
  }
  getBuyProperties():Observable<IProperty[]>{
    return this.http.get<IProperty[]>(this.url+"buy");
  }

  getSimilerProperties(id):Observable<IProperty[]>{
    return this.http.get<IProperty[]>(this.url+"similer/"+id);
  }
  getLastProperties(lastAmount:number):Observable<IProperty[]>{
    return this.http.get<IProperty[]>(this.url+"last/"+lastAmount);
  }
  //#endregion

  getHeatings():Observable<IHeating[]>{
    return this.http.get<IHeating[]>(environment.heatingApi);
  }
  getHeatingById(id:number):Observable<IHeating>{
    return this.http.get<IHeating>(environment.heatingApi+id);
  }

  getTypes():Observable<IType[]>{
   return this.http.get<IType[]>(environment.typeApi);
  }
  getTypesById(id:number):Observable<IType>{
    return this.http.get<IType>(environment.typeApi+id);
  }
}
