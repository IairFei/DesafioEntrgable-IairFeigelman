import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js";

const router = Router()

router.post("/", async (req, res) => {

    try {

        const cart = await cartDao.create()
        
        //Muestra el carrito creado
        res.status(201).json({status: 'success', payload: cart})

    } catch (error) {
        //Muestra el error
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);   
    }

})

router.post("/:cid/product/:pid", async (req, res) => {

    try {
        const {cid, pid} = req.params

        const cart = await cartDao.addProductToCart(cid, pid)
        //Si el producto pasado por paramentro devuelve false al momento de buscarlo, mustra el error
        if (cart.product == false){
            return res.status(404).json({status: 'Error', msg: `No se encontro el producto con el id: ${pid}`})
        }
        
        //Si el carrito pasado por paramentro devuelve false al momento de buscarlo, mustra el error
        if(cart.cart == false){
            return res.status(404).json({status: 'Error', msg: `No se encontro el carrito con el id: ${cid}`})
        }

        res.status(201).json({status: 'success', payload: cart})

    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }

})

router.get("/", async (req, res) => {

    try {

        const carts = await cartManager.getCarts();

        res.status(200).json(carts);

    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);  
    }

})

router.get("/:cid", async (req, res) => {

    try {
        const {cid} = req.params
        const cart = await cartDao.getById(cid)
        // console.log(cart)
        if(!cart){
            return res.status(404).json({status: 'Error', msg: `No se encontro el carrito con el id: ${cid}`})
        }

        res.status(200).json({status: 'success', payload: cart})
        
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }

})

router.put("/:cid", async (req, res) => {
    try {
      const { cid } = req.params
      const data = req.body;
      console.log(data)
      const cart = await cartDao.update(cid, data);
      if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
      
      res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
    
  })


router.delete("/:cid/product/:pid", async (req, res) => {

    try {
        const {cid, pid} = req.params
        const cart = await cartDao.deleteProductInCart(cid, pid)
 
        //Si el producto pasado por paramentro devuelve false al momento de buscarlo, mustra el error
        if (cart.product == false){
            return res.status(404).json({status: 'Error', msg: `No se encontro el producto con el id: ${pid}`})
        }
        
        //Si el carrito pasado por paramentro devuelve false al momento de buscarlo, mustra el error
        if(cart.cart == false){
            return res.status(404).json({status: 'Error', msg: `No se encontro el carrito con el id: ${cid}`})
        }

        res.status(201).json({status: 'success', payload: cart})

    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }

})

router.put("/:cid/product/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      
      const cart = await cartDao.updateQuantityProductInCart(cid, pid, quantity);
      if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
      if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
  
      res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
});

//Elimina todos los productos del carrito
router.delete("/:cid", async (req, res) => {

    try {
        const {cid} = req.params
        const cart = await cartDao.deleteAllProductsInCart(cid)

        //Si el carrito pasado por paramentro devuelve false al momento de buscarlo, mustra el error
        if(cart.cart == false){
            return res.status(404).json({status: 'Error', msg: `No se encontro el carrito con el id: ${cid}`})
        }

        res.status(201).json({status: 'success', payload: cart})

    } catch (error) {
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        console.log(error.message);
    }

})

export default router