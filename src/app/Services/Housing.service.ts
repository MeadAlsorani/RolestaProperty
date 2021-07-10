import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import {
  IProperty,
  IHeating,
  IType,
  PropertyRoot,
} from '../Interfaces/IProperty.interface';
import { environment } from 'src/environments/environment';
import { filterRoot } from '../Interfaces/ResponseObject';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  DeleteEmitter = new EventEmitter();
  subVar: Subscription;
  url: string = environment.apiUrl + 'Property/';
  constructor(private http: HttpClient) {}
  //#region property methods
  getAllProperties(filterObject: filterRoot): Observable<PropertyRoot> {
    return this.http.post<PropertyRoot>(this.url, filterObject);
  }

  getPropertyById(id: number): Observable<IProperty> {
    return this.http.get<IProperty>(this.url + id);
  }

  addProperty(data: IProperty): Observable<IProperty> {
    return this.http.post<IProperty>(this.url + 'add-property', data);
  }

  deleteProperty(id: number): Observable<IProperty> {
    return this.http.delete<IProperty>(this.url + 'deleteProperty/' + id);
  }

  deleteImage(path): Observable<string> {
    return this.http.post<string>(this.url + 'file-delete', path);
  }

  editProperty(id: number, property: IProperty): Observable<IProperty> {
    return this.http.put<IProperty>(this.url + id, property);
  }

  getRentProperties(filterObject: filterRoot): Observable<PropertyRoot> {
    return this.http.post<PropertyRoot>(this.url + 'rent', filterObject);
  }
  getBuyProperties(filterObject: filterRoot): Observable<PropertyRoot> {
    return this.http.post<PropertyRoot>(this.url + 'buy', filterObject);
  }

  getSimilerProperties(id): Observable<IProperty[]> {
    return this.http.get<IProperty[]>(this.url + 'similer/' + id);
  }
  getLastProperties(lastAmount: number): Observable<IProperty[]> {
    return this.http.get<IProperty[]>(this.url + 'last/' + lastAmount);
  }
  //#endregion

  getHeatings(): Observable<IHeating[]> {
    return this.http.get<IHeating[]>(environment.heatingApi);
  }
  getHeatingById(id: number): Observable<IHeating> {
    return this.http.get<IHeating>(environment.heatingApi + id);
  }

  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(environment.typeApi);
  }
  getTypesById(id: number): Observable<IType> {
    return this.http.get<IType>(environment.typeApi + id);
  }

  // getPriceByUsd(): Observable<any> {
  //   const header = new HttpHeaders();
  //   header.append('apikey', 'd8e79180-c3e6-11eb-82c2-37c8ffce83df');
  //   return this.http.get<any>(
  //     'https://freecurrencyapi.net/api/v1/rates?base_currency=USD',
  //     { headers: header }
  //   );
  // }
}
