import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  alumnos: any[] = []; // Ajusta el tipo según la estructura real de tus datos
  
  constructor(private firebaseService: ServicioService) {}

  ngOnInit() {
    this.obtenerAlumnos();

  }

  obtenerAlumnos() {
    if (this.firebaseService.usuarioActual) {
      const usuarioUid = this.firebaseService.usuarioActual.uid;
  
      this.firebaseService.obtenerAlumnosPorUsuario(usuarioUid).subscribe(data => {
        this.alumnos = data;
      });
    }
  }

  filtrarAlumnosPorCarril(carril: string) {
    return this.alumnos.filter(alumno => alumno.carril === carril);
  }

  getColorBySeccion(seccion: string) {
    // Define tus propios colores según la sección
    switch (seccion) {
      case 'prescolar':
        return 'green';
      case 'primaria':
        return 'blue';
      case 'bachillerato':
        return 'orange';
      default:
        return 'black';
    }
  }

}
