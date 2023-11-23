import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  usuarioActual: any; // Usuario actualmente autenticado

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { 
   
    this.afAuth.authState.subscribe((usuario) => {
      this.usuarioActual = usuario; // Almacena el usuario actual
    });
  }


  obtenerAlumnosPorUsuario(usuarioUid: string) {
    return this.firestore.collection('alumnos', ref => ref.where('usuarioUid', '==', usuarioUid))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const id = a.payload.doc.id;
          const data: any = a.payload.doc.data();
          return { id, ...data };
        }))
      );
  }


  
}
