export interface IProperty {
  id:number,
  name:string,
  price:number,
  provience:string,
  city:string,
  street:string,
  noOfRooms:number,
  description:string,
  image:string[],
  area:number,
  buildingAge:number,
  floor:number,
  buildingFloors:number,
  adOwner:string,
  date:Date,
  isFurnished:boolean,
  inSite:boolean,
  proceeds:number,
  typeId:number,
  type:IType,
  heatingId:number,
  heating:IHeating
}

export interface IType{
  id:number,
  typeName:string
}

export interface IHeating{
  id:number,
  heatingName:string
}
