import mongoose from "mongoose";

//Path para conectarse a la base de datos
const urlDb = "mongodb+srv://admin:admin123@e-commerce.9grfoag.mongodb.net/ecommerce";

export const connectMongoDB = async () => {
  try {
    // Conexión con la base de datos
    mongoose.connect(urlDb);
    console.log("Mongo DB Conectado");
  } catch (error) {
    console.log(error);
  }
};
