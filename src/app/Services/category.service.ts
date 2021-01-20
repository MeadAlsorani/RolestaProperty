import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ICategory,ISecondSubCategory,ISubCategory} from '../Interfaces/ICategory';
import * as myGlobals from '../../assets/global';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
categoryApiUrl:string=myGlobals.apiUrl+"categories/";
subCategoryApiUrl:string=myGlobals.apiUrl+"subCategories/";
secondSubCategoryApiUrl:string=myGlobals.apiUrl+"SecondSubCategories/";
constructor(
  private http:HttpClient
) { }

  getCategoris():Observable<ICategory[]>{
    return this.http.get<ICategory[]>(this.categoryApiUrl);
  }
  getSubCategories():Observable<ISubCategory[]>{
    return this.http.get<ISubCategory[]>(this.subCategoryApiUrl);
  }
  getSecondSubCategories():Observable<ISecondSubCategory[]>{
    return this.http.get<ISecondSubCategory[]>(this.secondSubCategoryApiUrl);
  }

  getCategoryById(id:number):Observable<ICategory>{
    return this.http.get<ICategory>(this.categoryApiUrl+id);
  }
  getSubCategoryById(id:number):Observable<ISubCategory>{
    return this.http.get<ISubCategory>(this.subCategoryApiUrl+id);
  }
  getSecondSubCategoryById(id:number):Observable<ISecondSubCategory>{
    return this.http.get<ISecondSubCategory>(this.secondSubCategoryApiUrl+id);
  }
}
