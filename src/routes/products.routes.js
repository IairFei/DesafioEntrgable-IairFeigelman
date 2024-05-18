import { Router } from "express";
import productDao from "../../dao/mongoDao/product.dao.js";

const router = Router();

//El servidor pide mediante una query todos los productos, en caso de que pase un limite
//solo se mostrara la cantidad solicitada
router.get("/", async (req, res) => {
  try {
    //Req es lo que recibe de la query del servidor y lo almacena en una constante llamada limit
    // const { limit } = req.query;
    //Pasa el limite a productManager para que devuelva los productos pedidos con el metodo getProducts
    const products = await productDao.getAll()
    //Res devuelve al servidor el producto pedido
    res.status(200).json({status: "success", payload: products});

    //En caso de error, lo muestra por el servidor
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;

    const newProduct = await productDao.create(product);
    // console.log("OK");
    res.status(201).json({status: "success", payload: newProduct});
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    //Req es lo que recibe de la query del servidor y lo almacena en una constante
    //llamada pid (numero definido en el servidor)
    const { pid } = req.params;
    const productData = req.body;

    const updateProduct = await productDao.update(pid, productData);

    if (!updateProduct) {
      return res.status(404).json({ status: "Error", msg: `El producto con el id: ${pid} no se encontro` });
    }

    res.status(201).json({status: "success", payload: updateProduct});
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:pid", async (req, res) => {
    try {
      //Req es lo que recibe de la query del servidor y lo almacena en una constante
      //llamada pid (numero definido en el servidor)
      const { pid } = req.params;

      const product = await productDao.deleteOne(pid)

      if (!product) {
        return res.status(404).json({ status: "Error", msg: `El producto con el id: ${pid} no se encontro` });
      }

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
    console.log(pid, typeof pid);
    // console.log(pid);
    //pid es recibido como un string, entonces hay que paresar la variable para que sea int
    //y pueda pasarla por parametro
    const product = await productDao.getById(pid);

    if (!product) {
      return res.status(404).json({ status: "Error", msg: `El producto con el id: ${pid} no se encontro` });
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
