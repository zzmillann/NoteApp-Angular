"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notas';
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(mongoURI);
        console.log("Conectado a MongoDB");
    }
    catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map