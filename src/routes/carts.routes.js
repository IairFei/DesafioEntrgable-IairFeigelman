import { Router } from "express";
import cartManager from "../managers/cartManager.js";

const router = Router()

router.post("/", async (req, res) => {

    try {

        const cart = await cartManager.createCart()
        
        //Muestra el carrito creado
        res.status(201).json(cart)

    } catch (error) {
        //Muestra el error
        res.status(500).json({ error: "Error interno del servidor" });

    }

})

router.post("/:cid/product/:pid", async (req, res) => {

    try {
        const {cid, pid} = req.params
        
        const cart = await cartManager.addProductToCart(+cid, +pid)
   
        res.status(201).json(cart)

    } catch (error) {

        res.status(500).json({ error: "Error interno del servidor : " + error.message });

    }

})

router.get("/", async (req, res) => {

    try {

        const carts = await cartManager.getCarts();

        res.status(200).json(carts);

    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }

})

router.get("/:cid", async (req, res) => {

    try {
        const {cid} = req.params
        const cart = await cartManager.getCartById(+cid)
   
        res.status(200).json(cart)
        
    } catch (error) {

        res.status(500).json({ error: "Error interno del servidor" });

    }

})

export default router