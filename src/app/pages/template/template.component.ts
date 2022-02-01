import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PaisService} from "../../services/pais.service";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {

  // Atributtes
  usuario = {
    nombre: {
      value: "",
      length: 3
    },
    apellido: {
      value: "",
      length: 5
    },
    correo: ""
  }

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {

    this.paisService.getPaises()
      .subscribe(paises => {
        console.log(paises);
      })

  }

  guardar(forma: NgForm){

    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }

    console.log(forma.value)

  }

}
