import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import logger from "../logger/logger.js";

const connectDB = async () => {
     try {
          const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}=${DB_NAME}`)
          logger.info(`MongoDB connected ! DB host : ${connectionInstance.connection.host}`); 
     } catch (error) {
          console.error("Error connecting to the database:", error);
          process.exit(1);
     }
}

export default connectDB;