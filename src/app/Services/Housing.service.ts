import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { IProperty } from '../Property/IProperty';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
url:string="http://localhost:5000/api/Property";
constructor(private http:HttpClient) { }

getAllProperties() : Observable<string[]>{
  return this.http.get<string[]>(this.url);
}

getPropertyById(id:number): Observable<IProperty>{
  return this.http.get<IProperty>(this.url+"/"+id);
}

addProperty(Property:IProperty) :Observable<IProperty>{
  let json=JSON.stringify(Property);
  return this.http.post<IProperty>(this.url+"/add-property",json,{
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
  })
}

  deleteProperty(id:number) : Observable<IProperty>{
    return this.http.delete<IProperty>(this.url+"/property-delete/"+id);
  }



}
