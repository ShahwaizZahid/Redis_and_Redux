import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const { combine, timestamp, errors, splat, json, colorize, simple } = winston.format;

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    timestamp(),
    errors({ stack: true }),
    splat(),
    json()
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        simple()
      ),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
