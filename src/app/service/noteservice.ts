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
    return this.http.get<INotes[]>('http://localhost:3000/api/Notas');
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


  crearnota({ title, content, date }: { title: string; content: string; date: Date }): Observable<INotes> {
    return this.http.post<INotes>('http://localhost:3000/api/Notas', { title, content, date });

  }

  eliminarNota(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/api/Notas/${id}`);
  }

  eliminarTodasNotas(): Observable<void> {
    return this.http.delete<void>('http://localhost:3000/api/Notas/all');
  }
}

