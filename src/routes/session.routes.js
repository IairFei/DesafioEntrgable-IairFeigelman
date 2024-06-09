import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";

const router = Router();

//Registramos el usuario
router.post("/register", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userDao.create(userData);

    if (!newUser) {
      return res.status(400).json({ status: "Error", msg: "No se pudo crear el usuario" });
    }

    res.status(201).json({ status: "success", payload: newUser });
  } catch (error) {
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    console.log(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica que el usuario sea admin
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      req.session.user = {email,role: "admin"};
      return res.status(200).json({ status: "success", payload: req.session.user });
    }

    // Si no es admin
    const user = await userDao.getByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ status: "Error", msg: "Email o password no validos" });
    }

    //Devuelve el rol del user
    req.session.user = {email,role: "user"};

    res.status(200).json({ status: "success", payload: req.session.user });
  } catch (error) {
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    console.log(error.message);
  }
});

//Cerramos la session
router.get("/logout", async (req, res) => {
    try {

        req.session.destroy();

        res.status(200).json({ status: "success", msg: "Se cerro la sesion exitosamente" });
    } catch (error) {
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
      console.log(error.message);
    }
  });

export default router;
