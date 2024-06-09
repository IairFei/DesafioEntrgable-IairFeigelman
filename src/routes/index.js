import { Router } from "express";
import productsRouters from "../routes/products.routes.js";
import cartsRouters from "../routes/carts.routes.js";
import sessionRouters from "../routes/session.routes.js"
import { isLogin } from "../middleware/isLogin.middleware.js";

const router = Router();

router.use("/products", isLogin, productsRouters);
router.use("/carts", cartsRouters);
router.use("/session", sessionRouters);

export default router;
