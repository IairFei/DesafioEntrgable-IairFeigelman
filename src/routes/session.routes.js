import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import { isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import { createToken, verifyToken } from "../utils/jwt.js";

const router = Router();

//Registramos el usuario
router.post("/register", passport.authenticate("register"), async (req, res) => {
  try {

    res.status(201).json({ status: "success", msg: "User creado"});

  } catch (error) {

    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });

    console.log(error.message);
 
  }
});

//Login de forma local
router.post("/login",passport.authenticate("login"),   async (req, res) => {
  try {

    res.status(200).json({ status: "success", payload: req.user })

  } catch (error) {
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    console.log(error.message);
  }
});


router.post("/jwt", async (req, res) => {
  try {
    
    const {email, password} = req.body

    const user = await userDao.getByEmail(email)

    if(!user || !isValidPassword(user, password)){
      return res.status(401).json({ status: "Error", msg: "Usiuario o contraseña invalidos" });
    }

    const token = createToken(user)

    res.cookie("token", token, {httpOnly: true})

    return res.status(200).json({ status: "success", payload: user, token })

  } catch (error) {
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    console.log(error.message);
  }
});

router.get("/current", (req, res) =>{
  try {
    const token = req.cookies.token

    const checkToken = verifyToken(token)

    if(!checkToken) {
      return res.status(403).json({ status: "Error", msg: "Token invalido"})
    }
    
    return res.status(200).json({ status: "success", payload: checkToken })


  } catch (error) {
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    console.log(error.message);
  }
}) 

//Login con cuentas de Google
router.get("/google",passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
  session:false
}),   async (req, res) => {
  try {

    res.status(200).json({ status: "success", payload: req.user })

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
