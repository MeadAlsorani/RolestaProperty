export const apiUrl="http://localhost:5000/api/";
export const baseUrl="http://localhost:5000/"
export declare var ifCon:boolean;
export function disableContainer(val?:boolean){
  if (val) {
    return ifCon=val;
  }
  else{
  return this.ifCon=true;
}
}
