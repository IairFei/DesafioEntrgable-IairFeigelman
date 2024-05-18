import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

//Retorna el carrito solicitado mediante id por parametro
const getById = async (id) => {
    const cart = await cartModel.findById(id)
    return cart;
}

//Recibe data que se va a almacenar en el carrito y retorna el carrito
const create = async (data) => {
    const cart = await cartModel.create(data)
    return cart;
}

const addProductToCart = async (cid, pid) => {
    const product = await productModel.findById(pid);
    //Si no encuentra en el producto, devuelve false
    if(!product) return {
        product: false
    }
    //Busca el carrito y hace un update & push de la lista products, agregando el product al carrito pasado por parametro
    await cartModel.findByIdAndUpdate(cid, { $push: { products: product } });

    const cart = await cartModel.findById(cid)

    //Si no encuentra en el carrito, devuelve false
    if(!cart) return {
        cart: false
    }
    
    return cart
}
export default{
    getById,
    create,
    addProductToCart
}