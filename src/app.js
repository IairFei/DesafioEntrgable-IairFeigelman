//Inicializamos 
import express from 'express';
import productManager from './productManager.js';

const app = express();
// Middlewares: son operaciones que se ejecutan de manera intermedia entre la peticion del cliente
//y el servidor

// Middleware para parsear JSON en las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//El servidor pide mediante una query todos los productos, en caso de que pase un limite
//solo se mostrara la cantidad solicitada
app.get("/products", async (req, res) => {

    try {
        //Req es lo que recibe de la query del servidor y lo almacena en una constante llamada limit 
        const { limit } = req.query
        //Pasa el limite a productManager para que devuelva los productos pedidos con el metodo getProducts
        const products = await productManager.getProducts(limit)
        //Res devuelve al servidor el producto pedido
        res.status(200).json(products)

    //En caso de error, lo muestra por el servidor
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }

})

//El servidor pide mediante una query el producto nro = :pid
app.get("/products/:pid", async (req, res) => {

    try {
        
        //Req es lo que recibe de la query del servidor y lo almacena en una constante 
        //llamada pid (numero definido en el servidor) 
        const { pid } = req.params

        //pid es recibido como un string, entonces hay que paresar la variable para que sea int
        //y pueda pasarla por parametro
        const product = await productManager.getProductById(parseInt(pid))

        if (!product) {
            return res.status(404).json({ error: "El producto no existe"})
        }

        //Res devuelve al servidor el producto pedido
        res.status(200).json(product)

    //En caso de error, lo muestra por consola y por el servidor
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

})

//Inicia el servidor
app.listen(8080, () => {
    console.log("Escuchando el servidor en el puerto 8080")
});