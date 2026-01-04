import mongoose from "mongoose";
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notas';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};

