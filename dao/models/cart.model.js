import mongoose from "mongoose";

const cartCollection = "carts"

//Definimos el Schema de los carritos
const cartSchema = new mongoose.Schema({
    products: {
        type: Array,
        default: [],
    }
});

export const cartModel = mongoose.model(cartCollection, cartSchema);