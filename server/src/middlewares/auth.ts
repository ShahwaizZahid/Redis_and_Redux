// import dotenv from 'dotenv';
// dotenv.config();
// import jwt from "jsonwebtoken";
// import { logger } from "../utils/logger.js";
// import { Request, Response, NextFunction } from "express";
// import User from '../models/user.model.js';

// export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       logger.error("Unauthorized: No token provided");
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);

//     if (!decoded.userId) {
//       logger.error("Unauthorized: UserId not found in token");
//       return res.status(401).json({ error: "Unauthorized: UserId not found" });
//     }

//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       logger.error("Unauthorized: User does not exist");
//       return res
//         .status(401)
//         .json({ error: "Unauthorized: User does not exist" });
//     }

//     req.user = {
//       id: user._id,
//       email: user.email,
//       role: decoded.role || user.role,
//     };

//     next();
//   } catch (err) {
//     logger.error("Unauthorized: Invalid or expired token", err.message);
//     return res
//       .status(401)
//       .json({ error: "Unauthorized: Invalid or expired token" });
//   }
// };
