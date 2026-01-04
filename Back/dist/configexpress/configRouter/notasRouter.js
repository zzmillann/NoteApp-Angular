"use strict";
const express = require('express');
const routerNotas = express.Router();
routerNotas.get('/', async (req, res) => {
    try {
        const response = await fetch('https://caacbae3604adc4705cd.free.beeceptor.com/api/notes/');
        const notas = await response.json();
        if (!notas) {
            return res.status(404).json({ message: 'Notas no encontradas' });
        }
        res.json(notas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener notas' });
    }
});
routerNotas.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const response = await fetch('https://caacbae3604adc4705cd.free.beeceptor.com/api/notes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });
        const nuevaNota = await response.json();
        res.status(201).json(nuevaNota);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la nota' });
    }
});
module.exports = routerNotas;
//# sourceMappingURL=notasRouter.js.map