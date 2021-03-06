import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICar, ICarCompany } from '../Interfaces/ICar';
import { environment } from 'src/environments/environment';
import { filterObject, filterRoot } from '../Interfaces/ResponseObject';
@Injectable({
  providedIn: 'root',
})
export class CarService {
  url: string = environment.apiUrl + 'cars/';
  carCompanyUrl: string = environment.apiUrl + 'carCompanies/';
  constructor(private http: HttpClient) {}
  //#region  car api callers
  getAllCars(filter: filterRoot): Observable<ICar[]> {
    return this.http.post<ICar[]>(`${this.url}getAllCars`, filter);
  }

  getRentCars(filter: filterRoot): Observable<ICar[]> {
    return this.http.post<ICar[]>(`${this.url}carsForRent`, filter);
  }
  getBuyCars(filter: filterRoot): Observable<ICar[]> {
    return this.http.post<ICar[]>(this.url + 'carsForSale', filter);
  }
  getCarById(id: number): Observable<ICar> {
    return this.http.get<ICar>(this.url + id);
  }

  addCar(data: ICar): Observable<ICar> {
    return this.http.post<ICar>(this.url, data);
  }

  deleteCar(id: number): Observable<ICar> {
    return this.http.delete<ICar>(this.url + id);
  }

  deleteImage(path): Observable<string> {
    return this.http.post<string>(this.url + 'file-delete', path);
  }

  editCar(id: number, property: ICar): Observable<ICar> {
    return this.http.put<ICar>(this.url + id, property);
  }

  getLastCars(lastAmount: number): Observable<ICar[]> {
    return this.http.get<ICar[]>(this.url + 'last/' + lastAmount);
  }
  //#endregion

  //#region carCompany api callers
  getAllCarsCompany(): Observable<ICarCompany[]> {
    return this.http.get<ICarCompany[]>(this.carCompanyUrl);
  }

  getCarCompanyById(id: number): Observable<ICarCompany> {
    return this.http.get<ICarCompany>(this.carCompanyUrl + id);
  }
  //#endregion
}
