import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }
  noApellido(control: FormControl): { [s: string]: boolean } | null {
    if (control.value?.toLowerCase() === "apellido") {
      return {
        noApellido: true
      }
    }
    return null;
  }

}
