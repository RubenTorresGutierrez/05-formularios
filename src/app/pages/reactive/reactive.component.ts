import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  // Atributtes
  forma!:FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.crearFormulario()
    this.cargarDatosFormulario()

  }

  ngOnInit(): void {
  }

  crearFormulario() {

    this.forma = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(5)]],
      apellido:['',[Validators.required, Validators.minLength(5)]],
      email:['',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      direccion: this.formBuilder.group({
        distrito:['',Validators.required],
        ciudad:['',Validators.required]
      })
    })

  }

  guardar(forma: FormGroup){

    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control);
        control.markAsTouched();
      })
      return;
    }

  }

  cargarDatosFormulario()  {

    this.forma.setValue({
      nombre: "kjhlk",
      apellido: "lkjlkj",
      email: "ñlkñl",
      direccion: {
        distrito: "ñlkñl",
        ciudad: "ñlkñkl"
      }
    })

  }


  // GETTERS

  validar(campo1: string){
    let campo: any = this.forma.get(campo1);
    return !(campo.invalid && campo.touched);
  }



}
