import mongoose from "mongoose";
import logger from "./logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("MongoDB Connected Successfull");
  } catch (error) {
    logger.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
