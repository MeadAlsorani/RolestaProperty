import { ICategory, ISubCategory, ISecondSubCategory } from "./ICategory";

export interface IProperty {
  id:number,
  name:string,
  price:number,
  provience:string,
  city:string,
  street:string,
  noOfRooms:number,
  description:string,
  descriptionTr:string,
  descriptionEn:string,
  image:string[],
  area:number,
  buildingAge:number,
  floor:number,
  buildingFloors:number,
  adOwner:string,
  date:Date,
  isFurnished:boolean,
  inSite:boolean,
  phoneNumber:string,
  proceeds:number,
  typeId:number,
  type:IType,
  heatingId:number,
  heating:IHeating
  categoryId:number,
  category:ICategory,
  subCategoryId:number,
  subCategory:ISubCategory,
  secondSubCategoryId:number,
  SecondSubCategory:ISecondSubCategory
}

export interface IType{
  id:number,
  typeName:string
}

export interface IHeating{
  id:number,
  heatingName:string
}


export interface PropertyRoot{
  filteredRecords:number,
  totalRecords:number,
  records:IProperty[]
}
