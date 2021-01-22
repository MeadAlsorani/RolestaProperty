import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICar,ICarCompany } from '../Interfaces/ICar';
import * as myGlobals from '../../assets/global';
@Injectable({
  providedIn: 'root',
})
export class CarService {
  url: string = myGlobals.apiUrl + 'cars';
  carCompanyUrl:string=myGlobals.apiUrl+'carCompanies';
  constructor(private http: HttpClient) {}
//#region  car api callers
  getAllCars(): Observable<ICar[]> {
    return this.http.get<ICar[]>(this.url);
  }

  getCarById(id: number): Observable<ICar> {
    return this.http.get<ICar>(this.url + id);
  }

  addCar(data: ICar): Observable<ICar> {
    return this.http.post<ICar>(this.url, data);
  }

  deleteCar(id: number): Observable<ICar> {
    return this.http.delete<ICar>(this.url+ id);
  }

  deleteImage(path):Observable<string>{
    return this.http.post<string>(this.url+"file-delete",path);
  }

  editCar(id: number, property: ICar): Observable<ICar> {
    return this.http.put<ICar>(this.url + id, property);
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
