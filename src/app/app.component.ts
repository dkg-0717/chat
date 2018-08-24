import { Component } from '@angular/core';
import { ChatService } from './providers/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public hide: boolean = false;
  array: any[] = [];
  found: any;
  test: any[] = [];

  constructor(public cs: ChatService) {

  }

  ocultar() {
    if (this.hide) {
      const person = prompt('Ingresa tu contraseña');
      if (person !== 'Angel') {

      }
    }
    this.hide = !this.hide;
  }
}
