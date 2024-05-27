import { Router } from "express";
import productDao from "../../dao/mongoDao/product.dao.js";

const router = Router();

//El servidor pide mediante una query todos los productos, en caso de que pase un limite
//solo se mostrara la cantidad solicitada
router.get("/", async (req, res) => {
  try {
    //Req es lo que recibe de la query del servidor y lo almacena en una constante llamada limit
    const { limit, page, sort, category, status } = req.query;

    //Establecemos las opciones para paginate
    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      lean: true,
    }
    //Si nos pide buscar por status, devuelve el status de los productos con el estado pedido
    if (status){
      const products = await productDao.getAll({ status: status }, options);
      return res.status(200).json({ products })
    }

    //Si nos pide buscar por categoria, devuelve los productos con la categoria pedido
    if (status){
      const products = await productDao.getAll({ category: category }, options);
      return res.status(200).json({ products })
    }

    //Si no recibe un pedido de filtro, devuelve todos los productos
    const products = await productDao.getAll({}, options);
    //Res devuelve al servidor el producto pedido
    res.status(200).json({status: "success", payload: products});

    //En caso de error, lo muestra por el servidor
  } catch (error) {
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    console.log(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;

    const newProduct = await productDao.create(product);
    // console.log("OK");
    res.status(201).json({status: "success", payload: newProduct});
  } catch (error) {
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    console.log(error.message);
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
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    console.log(error.message);
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
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
      console.log(error.message); 
    }
  });

//El servidor pide mediante una query el producto nro = :pid
router.get("/:pid", async (req, res) => {
  try {
    //Req es lo que recibe de la query del servidor y lo almacena en una constante
    //llamada pid (numero definido en el servidor)
    const { pid } = req.params;
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
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    console.log(error.message);
  }
});

export default router;
