"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pipeline;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("../db");
function pipeline(expressApp) {
    //configurar el 1º modulo middleware cookie-parser para gestionar cookies en express, las cookies se van a almacenar en objeto req.cookies
    //console.log(`el valor de la variable cookieParser es: ${cookiesParser}`);
    expressApp.use((0, cookie_parser_1.default)());
    //configurar el 2º modulo middleware express.json() para gestionar peticiones http POST con cuerpo en formato json, se almacena en req.body
    //console.log(`el valor de la variable express.json es: ${express.json}`);
    expressApp.use(express_1.default.json());
    //configurar el 3º modulo middleware express.urlencoded() para gestionar peticiones http GET con variables en url, se almacena en req.query
    //console.log(`el valor de la variable express.urlencoded es: ${express.urlencoded}`);
    expressApp.use(express_1.default.urlencoded({ extended: false })); //{extended:true} para que admita objetos complejos en las variables de url
    //configurar el 4º modulo middleware cors() para gestionar politicas CORS en express
    //console.log(`el valor de la variable cors es: ${cors}`);
    expressApp.use((0, cors_1.default)());
    //conectar a la base de datos MongoDB
    (0, db_1.connectDB)();
    //configurar las rutas
    expressApp.use('/api/Notas', require('../configexpress/configRouter/notasRouter'));
}
//# sourceMappingURL=configPipeline.js.map