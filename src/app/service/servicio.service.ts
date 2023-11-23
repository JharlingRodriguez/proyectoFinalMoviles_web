import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  usuarioActual: any; // Usuario actualmente autenticado

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { 
    // Suscribirse al cambio de estado de autenticación
    this.afAuth.authState.subscribe((recogidas) => {
      this.usuarioActual = recogidas; // Almacena el usuario actual
    });
  }


   // Método para obtener alumnos por usuario
   obtenerAlumnosPorUsuario(usuarioUid: string) {
    return this.firestore.collection('alumnos', ref => ref.where('usuarioUid', '==', usuarioUid)).snapshotChanges();
  }

  obtenerRecogidas() {
    return this.firestore.collection('recogidas').snapshotChanges();
  }
}
