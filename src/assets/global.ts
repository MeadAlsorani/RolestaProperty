export const apiUrl="property.rolestagroup.com/api/";
export const baseUrl="property.rolestagroup.com";
export const heatingApi="property.rolestagroup.com/api/heating/";
export const typeApi="property.rolestagroup.com/api/type/";
export declare var ifCon:boolean;
export function disableContainer(val?:boolean){
  if (val) {
    return ifCon=val;
  }
  else{
  return this.ifCon=true;
}
}
