import { Router } from "express";
import productManager from "../managers/productManager.js";

const router = Router();

//El servidor pide mediante una query todos los productos, en caso de que pase un limite
//solo se mostrara la cantidad solicitada
router.get("/", async (req, res) => {
  try {
    //Req es lo que recibe de la query del servidor y lo almacena en una constante llamada limit
    const { limit } = req.query;
    //Pasa el limite a productManager para que devuelva los productos pedidos con el metodo getProducts
    const products = await productManager.getProducts(limit);
    //Res devuelve al servidor el producto pedido
    res.status(200).json(products);

    //En caso de error, lo muestra por el servidor
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;

    const newProduct = await productManager.addProduct(product);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    //Req es lo que recibe de la query del servidor y lo almacena en una constante
    //llamada pid (numero definido en el servidor)
    const { pid } = req.params;
    const product = req.body;

    const updateProduct = await productManager.updateProduct(pid, product);

    res.status(201).json(updateProduct);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:pid", async (req, res) => {
    try {
      //Req es lo que recibe de la query del servidor y lo almacena en una constante
      //llamada pid (numero definido en el servidor)
      const { pid } = req.params;

      await productManager.deleteProduct(pid)
  
      res.status(201).json({ message: `El producto ${pid}, se elimino correctamente` });

    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

//El servidor pide mediante una query el producto nro = :pid
router.get("/:pid", async (req, res) => {
  try {
    //Req es lo que recibe de la query del servidor y lo almacena en una constante
    //llamada pid (numero definido en el servidor)
    const { pid } = req.params;

    //pid es recibido como un string, entonces hay que paresar la variable para que sea int
    //y pueda pasarla por parametro
    const product = await productManager.getProductById(parseInt(pid));

    if (!product) {
      return res.status(404).json({ error: "El producto no existe" });
    }

    //Res devuelve al servidor el producto pedido
    res.status(200).json(product);

    //En caso de error, lo muestra por consola y por el servidor
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
