import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ValidadoresService} from "../../services/validadores.service";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  @Output() evento = new EventEmitter<boolean>();
  // Atributtes
  forma!: FormGroup;

  constructor(private formBuilder: FormBuilder, private _validadoresService:ValidadoresService) {

    this.crearFormulario()
    this.cargarDatosFormulario()

  }

  ngOnInit(): void {
  }

  get f() { return this.forma.controls }

  crearFormulario() {

    this.forma = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(5)]],
      apellido:['',[Validators.required, Validators.minLength(5)]],
      email:['',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      usuario:['', , this._validadoresService.existeUsuario],
      passwords: this.formBuilder.group({
        pass1:['',Validators.required],
        pass2:['',Validators.required]
      }),
      direccion: this.formBuilder.group({
        distrito:['',Validators.required],
        ciudad:['',Validators.required]
      }),
      pasatiempos: this.formBuilder.array([])
    }, {
      validators:this._validadoresService.passwordsIguales('pass1', 'pass2')
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
    this.evento.emit(true);

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
    if (campo1 == 'apellido' && this._validadoresService.noApellido(campo)){
      return false;
    }
    return !(campo.invalid && campo.touched);
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get pass2Valido() {
    let pass1 = this.forma.get('passwords.pass1')?.value;
    let pass2 = this.forma.get('passwords.pass2')?.value;
    return (pass1 === pass2) ? true : false;
  }


}
