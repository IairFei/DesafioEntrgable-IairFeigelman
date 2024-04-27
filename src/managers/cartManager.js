import fs from "fs";

const carts = [];
const pathFile = "./src/data/carts.json";

const getCarts = async (params) => {
  const cartsJson = await fs.promises.readFile(pathFile);

  carts = JSON.parse(cartsJson) || [];

  return carts;
};

const createCart = async () => {
  await getCarts();

  const newCart = {
    id: time.now().toString() * 2,
    products: [],
  };

  carts.push(newCart);

  await fs.promises.writeFile(pathFile, JSON.stringify(newCart));

  return newCart;
};

const getCartById = async (cid) => {
  await getCarts();

  const cart = carts.find((c) => c.id === cid);

  if (!cart) return `No se encontro el producto con el id ${cid}`;

  return cart.products;
};


const addProductToCart = async (cid, pid) => {
    await getProducts();

    const index = carts.findIndex(c => c.id === cid)

    if (index === -1) return `No se encontro el carrito con el id ${cid}`

    carts[index].products.push({
        product: pid,
        quantity: 1,
    });


    return carts[index]
}


export default {
  getCarts,
  createCart,
  getCartById,
  addProductToCart,
};
