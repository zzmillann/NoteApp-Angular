
import { Express } from 'express';
import cookiesParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { connectDB } from '../db';
export default function pipeline(expressApp: Express) {



    //configurar el 1º modulo middleware cookie-parser para gestionar cookies en express, las cookies se van a almacenar en objeto req.cookies
    //console.log(`el valor de la variable cookieParser es: ${cookiesParser}`);
    expressApp.use(cookiesParser()); 

    //configurar el 2º modulo middleware express.json() para gestionar peticiones http POST con cuerpo en formato json, se almacena en req.body
    //console.log(`el valor de la variable express.json es: ${express.json}`);
    expressApp.use(express.json());

    //configurar el 3º modulo middleware express.urlencoded() para gestionar peticiones http GET con variables en url, se almacena en req.query
    //console.log(`el valor de la variable express.urlencoded es: ${express.urlencoded}`);
    expressApp.use(express.urlencoded({extended:false})); //{extended:true} para que admita objetos complejos en las variables de url

    //configurar el 4º modulo middleware cors() para gestionar politicas CORS en express
    //console.log(`el valor de la variable cors es: ${cors}`);
    expressApp.use(cors());

    //conectar a la base de datos MongoDB
    connectDB();

    //configurar las rutas
    expressApp.use('/api/Notas', require('../configexpress/configRouter/notasRouter'));
}