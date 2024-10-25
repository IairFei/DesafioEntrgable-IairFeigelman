import { cartModel } from "../models/carts.model.js";

const getById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

const addProductToCart = async (cid, pid) => {
  const productInCart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": 1 } },
    { new: true }
  );

  if (!productInCart) {
    return await cartModel.findOneAndUpdate({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } }, { new: true });
  }

  return productInCart;
};

const deleteProductInCart = async (cid, pid) => {
  const cart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": -1 } },
    { new: true }
  );

  return cart;
};

const updateQuantityProductInCart = async (cid, pid, quantity) => {
  const cart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $set: { "products.$.quantity": quantity } },
    { new: true }
  );

  return cart;
};

const deleteAllProductsInCart = async (cid) => {
  const cart = await cartModel.findByIdAndUpdate(cid, { $set: { products: [] } }, { new: true });

  return cart;
};

const updateCart = async (cid, products) => {
  const cart = await cartModel.findByIdAndUpdate(cid, { $set: { products } }, { new: true });
  return cart;
};

export default {
  getById,
  create,
  addProductToCart,
  deleteProductInCart,
  updateQuantityProductInCart,
  deleteAllProductsInCart,
  updateCart
};