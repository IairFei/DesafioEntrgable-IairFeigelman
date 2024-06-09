import { request, response } from "express";


//Este middleware verifica si hay un usuario loggeado
export const isLogin = async (req = request, res = response, next) => {

    if (req.session.user){
        next()
    }else{
        res.status(401).json({status: "Error", msg: "Ususrio no logueado"})
    }
}