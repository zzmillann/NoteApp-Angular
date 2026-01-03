import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import INotes from '../../models/INotes';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-modalnota',
  imports: [MatDialogModule,     MatFormFieldModule,
    MatInputModule,
    MatButtonModule, ReactiveFormsModule],
  templateUrl: './modalnota.html',
  styleUrl: './modalnota.css',
})
export class Modalnota {


    constructor(private dialogRef: MatDialogRef<Modalnota>) {}


formulario: FormGroup = new FormGroup({
  title: new FormControl(''),
  content: new FormControl(''),

});


  guardar() {
    this.dialogRef.close(this.formulario.value);
  }
}
