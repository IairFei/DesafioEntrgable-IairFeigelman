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

    const cart = await cartModel.findById(cid)
    //Si no encuentra en el carrito, devuelve false
    if(!cart) return {
        cart: false
     }

    //Busca el carrito y hace un update & push de la lista products, agregando el product al carrito pasado por parametro
    //En este contexto utilizamos $inc para incrementar la cantidad del producto pasado por parametro en el carrito
    const productInCart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } })

    //Si el producto no se encuentra en el carrito, se agrega el producto y la quantity se incializa en 1
    if (!productInCart) {
        await cartModel.updateOne({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
    }

    const cartUpdate = await cartModel.findById(cid)

    return cartUpdate
}
//Elimina el producto del carrito con el id pasado por parametro
const deleteProductInCart = async (cid, pid) => {

    const product = await productModel.findById(pid);
    //Si no encuentra en el producto, devuelve false
    if(!product) return {
        product: false
    }
    
    //$inc en este contexto lo utilizamos para decrementar la cantidad de productos ${pid} del carrito
    const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": -1 } });

    if(!cart) return {
        cart: false
    }

    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate
}

//Este metodo hace un update de los productos pasados por parametro y 
//"resetea" el carrito con unicamente los datos recibidos
const update = async (cid, data) => {

  const cart = await cartModel.findById(cid);

  if (!cart) return { cart: false };

  await cartModel.findOneAndUpdate({ _id: cid }, { $set: { products: data.products } });
  
  const cartUpdated = await cartModel.findById(cid);

  return cartUpdated;
};

//Este metodo suma la cantidad de productos solicitados por parametro
const updateQuantityProductInCart = async (cid, pid, quantity) => {
    const product = await productModel.findById(pid);
    if (!product) return { product: false };
  
    //Esta linea busca el producto por id, le asigna el producto solicitado a sumar y le suma la cantidad pedida
    const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } });
    if (!cart) return { cart: false };
  
    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
};

//Este metodo busca por id el carrito y vacia los productos
const deleteAllProductsInCart = async (cid) => {
    const cart = await cartModel.findByIdAndUpdate(cid, { $set: { products: [] } });
    if (!cart) return { cart: false };

    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
 };
  

export default{
    getById, 
    create,
    addProductToCart,
    deleteProductInCart,
    update,
    updateQuantityProductInCart,
    deleteAllProductsInCart
}