import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private cs: ChatService) { }

  ngOnInit() {
  }

  ingresar( proveedor: string) {
    this.cs.login(proveedor);
  }
}
