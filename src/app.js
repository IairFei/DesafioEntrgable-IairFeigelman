//Inicializamos 
import express from 'express';
import router from "./routes/index.js"

const app = express();
// Middlewares: son operaciones que se ejecutan de manera intermedia entre la peticion del cliente
//y el servidor

// Middleware para parsear JSON en las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Todas las rutas que tengamos, tendran prefijo /api
app.use("/api", router)

//Inicia el servidor
app.listen(8080, () => {
    console.log("Escuchando el servidor en el puerto 8080")
});