"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const routerNotas = express.Router();
const Notes_1 = __importDefault(require("../../modelosMongo/Notes"));
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
        const { title, content, date } = req.body;
        const newNote = new Notes_1.default({ title, content, date });
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
    }
    catch (error) {
        console.error('Error al crear la nota:', error);
        res.status(500).json({ message: 'Error al crear la nota' });
    }
});
const mongoose = require('mongoose');
routerNotas.delete('/all', async (req, res) => {
    try {
        await Notes_1.default.deleteMany({});
        try {
            const response = await fetch('https://caacbae3604adc4705cd.free.beeceptor.com/api/notes/');
            const notes = await response.json();
            if (Array.isArray(notes)) {
                const deletePromises = notes.map((note) => fetch(`https://caacbae3604adc4705cd.free.beeceptor.com/api/notes/${note.id}`, {
                    method: 'DELETE'
                }));
                await Promise.all(deletePromises);
            }
        }
        catch (fetchError) {
            console.error('Error al sincronizar eliminación masiva con API externa:', fetchError);
        }
        res.status(200).json({ message: 'Todas las notas han sido eliminadas' });
    }
    catch (error) {
        console.error('Error al eliminar todas las notas:', error);
        res.status(500).json({ message: 'Error al eliminar todas las notas' });
    }
});
routerNotas.delete('/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        if (mongoose.Types.ObjectId.isValid(noteId)) {
            await Notes_1.default.findByIdAndDelete(noteId);
        }
        try {
            await fetch(`https://caacbae3604adc4705cd.free.beeceptor.com/api/notes/${noteId}`, {
                method: 'DELETE'
            });
        }
        catch (fetchError) {
            console.error('Error al sincronizar eliminación con API externa:', fetchError);
        }
        res.status(200).json({ message: 'Nota eliminada correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar la nota:', error);
        res.status(500).json({ message: 'Error al eliminar la nota' });
    }
});
module.exports = routerNotas;
//# sourceMappingURL=notasRouter.js.map