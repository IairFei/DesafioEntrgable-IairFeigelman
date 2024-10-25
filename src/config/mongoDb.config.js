import mongoose from "mongoose";
import envs from "./env.config.js";
import { logger } from "../utils/logger.js";

export const connectMongoDB = async () => {
  try {
    mongoose.connect(envs.MONGO_URL);
    logger.info("Mongo DB Conectado");
  } catch (error) {
    console.log(error);
  }
};