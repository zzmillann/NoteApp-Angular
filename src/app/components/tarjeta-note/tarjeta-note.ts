import { Component, inject, input, signal } from '@angular/core';
import INotes from '../../models/INotes';
import { Noteservice } from '../../service/noteservice';
import { DatePipe, UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-tarjeta-note',
  imports: [UpperCasePipe, DatePipe],
  templateUrl: './tarjeta-note.html',
  styleUrl: './tarjeta-note.css',
})
export class TarjetaNote {

  private noteservice = inject(Noteservice);
  //hacer una señal input
  nota = input<INotes>();


  cambiarTituloNota(nuevoTitulo: string, id: string) {
    this.noteservice.actuaizarTituloNota(id, nuevoTitulo);
  }

  cambiarContenidoNota(nuevoContenido: string, id: string) {
    this.noteservice.actualizarContenidoNota(id, nuevoContenido);
  }

  eliminarNota(id: string) {
    this.noteservice.eliminarNota(id).subscribe(() => {
      // Actualizar la señal para reflejar el cambio en la interfaz de usuario
      const notasActuales = this.noteservice.notes();
      this.noteservice.notes.set(notasActuales.filter(nota => nota.id !== id));
    });
  }
}

