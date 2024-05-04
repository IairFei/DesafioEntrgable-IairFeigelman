import { Router } from "express";
import productsRouters from "../routes/products.routes.js";
import cartsRouters from "../routes/carts.routes.js";
const router = Router();

router.use("/products", productsRouters);
router.use("/carts", cartsRouters);

export default router;
