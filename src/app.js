//Inicializamos 
import express from 'express';
import router from "./routes/index.js"
import { connectMongoDB } from './config/mongoDb.config.js';
import session from "express-session";
import MongoStore from "connect-mongo"
import passport from "passport";
import initializePassport from './config/passport.config.js';
import cookieParser from "cookie-parser";


connectMongoDB();

const app = express();
// Middlewares: son operaciones que se ejecutan de manera intermedia entre la peticion del cliente
//y el servidor

// Middleware para parsear JSON en las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(session({
   store: MongoStore.create({
    mongoUrl: "mongodb+srv://admin:admin123@e-commerce.9grfoag.mongodb.net/ecommerce",
    ttl: 15
   }),
   secret: "CodigoSecreto",
   resave: true,
   saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
initializePassport()


//Todas las rutas que tengamos, tendran prefijo /api
app.use("/api", router)

//Inicia el servidor
app.listen(8080, () => {
    console.log("Escuchando el servidor en el puerto 8080")
});