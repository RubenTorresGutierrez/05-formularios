import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ValidadoresService} from "../../services/validadores.service";
import {ModalComponent} from "../../components/shared/modal/modal.component";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  // Attributes
  forma!: FormGroup;
  modal = new ModalComponent();
  //Validadores rango de edad
  minDate: Date;
  maxDate: Date;

  constructor(private formBuilder: FormBuilder, private _validadoresService:ValidadoresService) {

    this.crearFormulario()
    this.cargarDatosFormulario()

    // Setear validador de fecha
    const currentYear = new Date().getFullYear();
    // Como máximo puede tener 120 años
    this.minDate = new Date(currentYear - 120, 0, 1);
    // Como mínimo puede tener 2 años
    this.maxDate = new Date(currentYear - 2, 0, 1);

  }

  ngOnInit(): void {
  }

  /**
   * Genera todos los campos del formulario con
   * sus respectivos validadores
   */
  crearFormulario() {

    this.forma = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(5)]],
      apellido:['',[Validators.required, Validators.minLength(5)]],
      email:['',[Validators.required, Validators.email]],
      usuario:['', , this._validadoresService.existeUsuario],
      passwords: this.formBuilder.group({
        pass1:['',Validators.required],
        pass2:['',Validators.required]
      }),
      direccion: this.formBuilder.group({
        distrito:['',Validators.required],
        ciudad:['',Validators.required]
      }),
      fechaNacimiento:['',Validators.required],
      experiencia:['', Validators.required],
      pasatiempos: this.formBuilder.array([])
    }, {
      validators:this._validadoresService.passwordsIguales('pass1', 'pass2')
    })

  }

  /**
   * Comprueba si todos los campos están rellenados
   * y válidos, si no lo están sale de la función e indica
   * los campos que están mal, si lo están limpia los
   * valores de todos los campos
   *
   * @param forma:FormGroup Formulario entero
   */
  guardar(forma: FormGroup){

    if (forma.invalid || forma.pending) {
      Object.values(forma.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control);
        control.markAsTouched();
      })
      return;
    }
    this.forma.reset();

  }

  /**
   * Carga datos por defecto en los campos indicados
   * del formulario
   */
  cargarDatosFormulario()  {

    this.forma.reset({
      nombre: "sin nombre"
    });
    ['comer', 'dormir'].forEach(valor => this.pasatiempos.push(this.formBuilder.control(valor)));

  }

  /**
   * Agrega un campo para introducir un nuevo
   * pasatiempo
   */
  agregarPasatiempo(){

    this.pasatiempos.push(this.formBuilder.control(' ', Validators.required));

  }

  /**
   * Elimina el pasatiempo elegido por el usuario
   *
   * @param index:number Índice del elemento que se elimina
   */
  borrarPasatiempo(index: number){

    this.pasatiempos.removeAt(index);

  }

  /**
   * Llama al método modal() de la clase ModalComponent
   */
  llamarModal(){

    this.modal.modal();

  }

  /**
   * Muestra/oculta el contenido de la contraseña
   */
  showHide(){

    const input = <HTMLInputElement>document.getElementById('showHide');
    const input2 = <HTMLInputElement>document.getElementById('showHide2');
    const i = <HTMLInputElement>document.getElementById("button");
    if (input.type === "password" && input2.type === "password"){
      input.type = "text";
      input2.type = "text";
      i.classList.replace("fa-eye","fa-eye-slash");
    }else{
      input.type = "password";
      input2.type = "password";
      i.classList.replace("fa-eye-slash","fa-eye");
    }

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
