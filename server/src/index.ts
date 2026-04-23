import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
import apiRoutes from "./api/server";
import { ApiError } from "./utils/ApiError.js";
import { connectDB } from "./configurations/db.js";
import { connectRedis } from "./configurations/redis";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()
connectRedis();
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", apiRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Global Error Handler
app.use(errorHandler);

// Database connection and server start




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
