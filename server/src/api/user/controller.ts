import { Request, Response, NextFunction } from "express";
import User from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { logger } from "../../utils/logger.js";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  logger.info("Signup request received for emails: %s", req.body.email);
  try {
    const { email, password, role } = req.body;

    logger.info("Checking for existing user...");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn("User already exists: %s", email);
      throw new ApiError("User already exists", 400);
    }

    logger.info("Creating new user...");
    const user = await User.create({
      email,
      password,
      role,
    });
    logger.info("User created successfully: %s", user._id);

    const { password: _, ...userResponse } = user.toObject();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userResponse,
    });
  } catch (error) {
    next(error);
  }
};
