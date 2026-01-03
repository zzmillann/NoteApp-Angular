import { Component, inject, input } from '@angular/core';
import INotes from '../../models/INotes';
import { Noteservice } from '../../service/noteservice';
@Component({
  selector: 'app-tarjeta-note',
  imports: [],
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
}
