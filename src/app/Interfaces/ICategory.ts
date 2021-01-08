export interface ICategory {
  id:number,
  category_Name:string
}

export interface ISubCategory{
  id:number,
  subCategoryName:string,
  categoryId:number
}

export interface ISecondSubCategory{
  id:number,
  subCategoryName:string,
  subCategoryId:number
}
