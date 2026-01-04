import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
    title: string;
    content: string;
    date: Date;
}

const NoteSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true }
});

export default mongoose.model<INote>('Note', NoteSchema, 'notas');