import mongoose from "mongoose";

const cartCollection = "carts"

//Definimos el Schema de los carritos
const cartSchema = new mongoose.Schema({
    products: {
        
        //En esta linea, se relaciona la propiedad de product
     type: [{product: {type: mongoose.Schema.Types.ObjectId, ref: "products"}, quantity: Number}] 
    }
});
//Middleware
//Esto se utiliza para que al momento de hacer el find, nos mustre el producto y no unicamente el ObjectId
cartSchema.pre("find", function (){
    this.populate("products.product")
})

export const cartModel = mongoose.model(cartCollection, cartSchema);