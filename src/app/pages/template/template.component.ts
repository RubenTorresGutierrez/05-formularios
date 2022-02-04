import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PaisService} from "../../services/pais.service";
import {ModalComponent} from "../../components/shared/modal/modal.component";

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
    fecha: "",
    pais:"",
    genero:"",
    experiencia:""
  }
  paises: any[] = [];
  paisesBuscados: any[] = [];
  modal = new ModalComponent();

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {

    // this.paises.unshift({
    //   name: 'Seleccione el país',
    //   alpha3Code: ''
    // });

    this.paisService.getPaises()
      .subscribe((paises:any) => {
        for ( let i=0; i<paises.length;i++) {
          // console.log(paises);
          this.paises.push(paises[i]);
          this.paisesBuscados.push(paises[i]);
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
    forma.reset();

  }

  actualizarSelect(palabra: string){

    this.paisesBuscados = [];
    for (const pais of this.paises)
      if(pais.name.toLowerCase().includes(palabra.toLowerCase()))
        this.paisesBuscados.push(pais);

  }

  llamarModal(){
    this.modal.modal();
  }

}
