import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;

  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = "Internal Server Error";
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  if (process.env.NODE_ENV === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
