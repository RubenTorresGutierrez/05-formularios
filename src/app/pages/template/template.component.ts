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
    correo: "",
    pais:""
  }
  paises:any[] = [];


  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paises.unshift({
      name: 'Seleccione el país',
      alpha3Code: ''
    });
    this.paisService.getPaises()
      .subscribe((paises:any) => {
        console.log(paises);
        for ( let i=0; i<paises.length;i++) {
          this.paises.push(paises[i]);
        }
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
