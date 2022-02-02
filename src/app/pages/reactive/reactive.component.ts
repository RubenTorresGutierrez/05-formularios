import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {
  forma!:FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario()
  }

  ngOnInit(): void {
  }
  crearFormulario()
  {
    this.forma = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(5)]],
      apellido:['',[Validators.required, Validators.minLength(5)]],
      email:['',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]]
    })
  }

  guardar(){
    console.log(this.forma);
  }

  get nombreValido(){
    let nombre:any = this.forma.get('nombre');
    return !(nombre.invalid && nombre.touched);
  }



}
