import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import { logger } from '../utils/logger';


export const connectDB = () => {
    const mongoUrl = process.env.MONGO_URL;
    console.log(mongoUrl)
    if (!mongoUrl) {
        logger.error("MONGO_URL is not defined in environment variables");
        throw new Error("MONGO_URL is required to connect to MongoDB");
    }

    mongoose
        .connect(process.env.MONGO_URL!)
        .then(() => {
            logger.info("Connected to MongoDB");

        })
        .catch((err) => {
            logger.error("Failed to connect to MongoDB: %O", err);
            process.exit(1);
        });
};
