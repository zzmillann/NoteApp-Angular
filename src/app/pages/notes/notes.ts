import { Component, inject, WritableSignal } from '@angular/core';
import { Noteservice } from '../../service/noteservice';
import INotes from '../../models/INotes';
import { CommonModule } from '@angular/common';
import { TarjetaNote } from '../../components/tarjeta-note/tarjeta-note';
import { RouterLink } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { Modalnota } from '../../components/modalnota/modalnota';
@Component({
  selector: 'app-notes',
  imports: [CommonModule, TarjetaNote, RouterLink],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes implements OnInit {
  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getNotas();
  }

  private servnote = inject(Noteservice);

  notas: WritableSignal<INotes[]> = this.servnote.notes;

  getNotas() {
    this.servnote.getNotes().subscribe((data) => {
      this.servnote.notes.set(data);
    })
  };


  dateActual(): Date {
    return new Date();
  }

  abrirModal() {
    const dialogRef = this.dialog.open(Modalnota, {
      width: '380px',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: 'none',
      panelClass: 'note-dialog',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.servnote.crearnota({ title: result.title, content: result.content, date: this.dateActual() }).subscribe((nuevaNota) => {
          const notasActuales = this.servnote.notes();
          this.servnote.notes.update(() => [...notasActuales, nuevaNota]);
        });
      }
    });

  }

  borrarTodas() {
    if (confirm('¿Estás seguro de que quieres borrar todas las notas?')) {
      this.servnote.eliminarTodasNotas().subscribe(() => {
        this.servnote.notes.set([]);
      });
    }
  }

}

