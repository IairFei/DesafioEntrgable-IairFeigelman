import mongoose from "mongoose";

const productCollection = "products"


//Definimos el Schema de los productos
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: Array,
        default: [],
    },
    code: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

export const productModel = mongoose.model(productCollection, productSchema);