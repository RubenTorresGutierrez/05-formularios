import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Attributes
  title = '05.1-FormularioTemplate';
  enviado: boolean;

  constructor() {

    this.enviado = false;

  }

  formularioEnviado(enviado: any){

    this.enviado = enviado;

  }

}
