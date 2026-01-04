const express = require('express');
const routerNotas = express.Router();
import Notes from "../../modelosMongo/Notes";

routerNotas.get('/', async (req: any, res: any) => {
  try {
    const response = await fetch(
      'https://caacbae3604adc4705cd.free.beeceptor.com/api/notes/'
    );

    const notas = await response.json();

    if (!notas) {
      return res.status(404).json({ message: 'Notas no encontradas' });
    }

    res.json(notas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener notas' });
  }
});


routerNotas.post('/', async (req: any, res: any) => {
    try {
        const { title, content, date } = req.body;
        const newNote = new Notes({ title, content, date });
        await newNote.save();
    

        const response = await fetch('https://caacbae3604adc4705cd.free.beeceptor.com/api/notes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, date })
        });
        const nuevaNota = await response.json();
        res.status(201).json(nuevaNota);
    } catch (error) {
        console.error('Error al crear la nota:', error);
        res.status(500).json({ message: 'Error al crear la nota' });
    }
});

module.exports = routerNotas;
