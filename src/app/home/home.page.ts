import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  alumnos: any; // Ajusta el tipo según la estructura real de tus datos
  recogidas: any; // Ajusta el tipo según la estructura real de tus datos

  constructor(private firebaseService: ServicioService) {}

  ngOnInit() {
    this.obtenerInformacion();
  }

  obtenerInformacion() {
    if (this.firebaseService.usuarioActual) {
      const usuarioUid = this.firebaseService.usuarioActual.alumnoId;

      // Obtener alumnos del usuario
      this.firebaseService.obtenerAlumnosPorUsuario(usuarioUid).subscribe((data) => {
        this.alumnos = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as {}),
          };
        });
      });

      // Obtener recogidas
      this.firebaseService.obtenerRecogidas().subscribe((data) => {
        this.recogidas = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as {}),
          };
        });
      });
    }
  }

  filtrarAlumnosPorCarril(carril: string) {
    return this.recogidas
      .filter(recogida => recogida.carril === carril)
      .map(recogida => this.alumnos.find(alumno => alumno.id === recogida.alumnoId));
  }

  getColorBySeccion(seccion: string) {
    // Define tus propios colores según la sección
    switch (seccion) {
      case 'prescolar':
        return 'yellow';
      case 'primaria':
        return 'red';
      case 'bachillerato':
        return 'green';
      default:
        return 'black';
    }
  }
}
