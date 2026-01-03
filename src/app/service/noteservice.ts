import { Injectable, signal, WritableSignal } from '@angular/core';
import INotes from '../models/INotes';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Noteservice {
  private http = inject(HttpClient);

notes: WritableSignal<INotes[]> = signal<INotes[]>([]);


getNotes(): Observable<INotes[]> {
  return this.http.get<INotes[]>('https://caacbae3604adc4705cd.free.beeceptor.com/api/notes/');
}



actuaizarTituloNota(id: string, nuevoTitulo: string): void {
    const notasActuales = this.notes();
    const indice = notasActuales.find((nota) => nota.id === id);
 
    if (indice) {
      indice.title = nuevoTitulo;
      this.notes.set([...notasActuales]);
    }
  }

  actualizarContenidoNota(id: string, nuevoContenido: string): void {
    const notasActuales = this.notes();
    const indice = notasActuales.find((nota) => nota.id === id);  
    if (indice) {
      indice.content = nuevoContenido;
      this.notes.set([...notasActuales]);
    }
  }
crearnota({title, content}: {title: string; content: string}): Observable<INotes> {
  return this.http.post<INotes>('https://caacbae3604adc4705cd.free.beeceptor.com/api/notes/', {title, content})

  
}
}

