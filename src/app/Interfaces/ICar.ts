export interface ICar {
  id:number,
  modelYear:number,
  modelName:string,
  modelNameEn:string,
  isAuto:boolean,
  lostAmount:number,
  isHeavy:boolean,
  description:string,
  descriptionTr:string,
  descriptionEn:string,
  isRent:boolean,
  price:number,
  pictures:string[],
  carCompanyId:number,
  carCompany:ICarCompany
}
export interface ICarCompany{
  id:number,
  companyName:string
}
