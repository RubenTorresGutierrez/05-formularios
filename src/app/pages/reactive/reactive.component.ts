import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

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
      }),
      pasatiempos: this.formBuilder.array([])
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
    this.forma.reset();
  }

  cargarDatosFormulario()  {
    this.forma.reset({
      nombre: "sin nombre"
    });
      ['comer', 'dormir'].forEach(valor => this.pasatiempos.push(this.formBuilder.control(valor)));
  }
  agregarPasatiempo()
  {
    this.pasatiempos.push(this.formBuilder.control(' ', Validators.required));
  }

  borrarPasatiempo(index: number)
  {
    this.pasatiempos.removeAt(index);
  }



  // GETTERS

  validar(campo1: string){
    let campo: any = this.forma.get(campo1);
    return !(campo.invalid && campo.touched);
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }



}
