import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { IProperty } from '../Property/IProperty';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

constructor(private http:HttpClient) { }

getAllProperties() : Observable<IProperty[]>{
  return this.http.get('Data/properties.json').pipe(
    map(data=>{
      const propertyArray: Array<IProperty>=[];
      for(const id in data){
        if(data.hasOwnProperty(id)){
        propertyArray.push(data[id]);
        }
      }
      return propertyArray;

    })
  );
}

}
