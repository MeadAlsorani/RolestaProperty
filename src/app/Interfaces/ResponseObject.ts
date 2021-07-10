export interface ResponseObject<T> {
totalRecords:number,
filteredRecords:number,
records:Array<T>
}
export interface paginationObject{
  pageSize:number,
  pageNumber:number
}

export interface sortObject{
  sortBy:string,
  isAsec:boolean
}

export interface filterObject{
  singleValue?:string,
  valueFrom?:string,
  valueTo?:string
}

export interface filterRoot{
  sort:sortObject,
  pagination:paginationObject,
  filters?:{[colName:string]:filterObject}
}
export interface FilterParameters {
  name: string;
  categoryId: number;
  subCategoryId: number;
  secondSubCategoryId: number;
  lowPrice:number;
  highPrice:number;
  lowArea:number;
  highArea:number;
  noOfRooms:number;
  buildingAgeLow:number;
  buildingAgeHigh:number
}
