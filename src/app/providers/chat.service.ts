import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};
  public usuarios: any[] = [];
  public usersOnline: any[] = [];

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {

              this.afAuth.authState.subscribe( user => {
                console.log('estado del usuario', user);
                if (!user) {
                  return;
                }

                this.usuario.nombre = user.displayName;
                this.usuario.uid = user.uid;

                console.log(this.usuario);
              });
  }

  login(proveedor: string) {
    if (proveedor === 'google') {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chat',
    ref => ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges()
               .pipe(map( (mensajes: Mensaje[]) => {
                this.chats = mensajes;
                this.chats = this.chats.reverse();
                this.eliminaDuplicados();

                console.log(this.chats);
               }));
  }

  agregarMensaje(texto: string) {
    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add( mensaje );
  }

  eliminaDuplicados() {
     const users = new Set(
                  this.chats.map( user => {
                    return user.uid;
                  })
                );

    const array = Array.from(users);
    const chats = this.chats;
    const userOnline = [];

    for ( let i = 0; i < array.length; i++) {
      for ( let a = 0; a < chats.length; a++) {
          if (array[i] === chats[a].uid ) {
            userOnline.push(chats[a].nombre);
          }
      }
    }

    const usuariosConectados = new Set(userOnline);
    this.usersOnline = Array.from(usuariosConectados);
  }

}
