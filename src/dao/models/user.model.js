import mongoose from "mongoose";

const userCollection = "user"

//Definimos el Schema de los user
const userSchema = new mongoose.Schema({
    first_name: String, 
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    age: Number
});

export const userModel = mongoose.model(userCollection, userSchema);