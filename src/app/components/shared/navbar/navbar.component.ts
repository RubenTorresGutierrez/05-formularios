import { Component, OnInit } from '@angular/core';
import { TemplateComponent } from "../../../pages/template/template.component";
import { ReactiveComponent } from "../../../pages/reactive/reactive.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
