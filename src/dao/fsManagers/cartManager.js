import fs from "fs";
import productsManager from "../fsManagers/productsManager.js";


let carts = [];
const pathFile = "./src/data/carts.json"

const getCarts = async () => {
  //Lee el archivo Json
  const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
  //Muestra todo lo que hay en el archivo Json
if (cartsJson.startsWith("[")) {
  carts = JSON.parse(cartsJson)
}else {
  fs.promises.writeFile(pathFile, JSON.stringify(carts))
}

  return carts;
};

const createCart = async () => {
  await getCarts();
  
  const newCart = {
    id: carts.length + 1,
    products: []
  };

  //Se agrega un nuevo carrito al array
  carts.push(newCart);

  await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  return newCart;
};


//Metodo utilizado para devolver un carrito mediante un id pasado por parametro
const getCartById = async (cid) => {
  await getCarts();

  //Busca el carrito por su ID en el array, si lo encuentra, lo devuelve
  //Si no lo encuentra, muestra el error
  const cart = carts.find(c => c.id === cid);

  if (!cart) return `No se encontro el carrito con el id ${cid}`;

  return cart.products;
};

//Metodo utilizado para agregar un producto al carrito, se tiene que pasar por parametro
//el ID del producto y del carrito
const addProductToCart = async (cid, pid) => {

  await productsManager.getProducts();
  await getCarts()
  

  //Busca el carrito por su ID en el array, si lo encuentra, lo devuelve
  //Si no lo encuentra, muestra el error
  const cartFound = await getCartById(cid);
  if (cartFound === -1) return `No se encontro el carrito con el id ${cid}`
  const cartIndex = carts.findIndex(cart => cart.id === cartFound.id);


  //Busca el producto por su ID en el array, si lo encuentra, lo devuelve
  //Si no lo encuentra, muestra el error
    const productFound = await productsManager.getProductById(pid)
    if (productFound === -1) return `No se encontro el producto con el id ${cid}`

    //Se busca si el producto ya existe en el carrito
    const productIndex = cartFound.products.findIndex(product => product.id === productFound.id);

    //Agrega el producto al carrito encontrado anteriormente
    //Si ya se encuentra en el carrito, se suma 1 a la cantidad
    if (productIndex !== -1) {
      carts[cartIndex].products[productIndex].stock++
    }
    else {
      // Si no está en el carrito, se añade el producto
      carts[cartIndex].products.push(productFound);
  }

    await fs.promises.writeFile(pathFile, JSON.stringify(carts))
    //Devuelve el carrito
    return cartFound
}


export default {
  getCarts,
  getCartById,
  createCart,
  addProductToCart
};
