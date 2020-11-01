import { Injectable } from '@angular/core';
import * as alertifyjs from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

constructor() { }

success(message:string){
  return alertifyjs.success(message);
}

error(message:string){
  return alertifyjs.error(message);
}

}
