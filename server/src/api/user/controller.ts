import bcrypt from "bcrypt";
import { Request, Response } from "express";
import redisClient from "../../configurations/redis";
import User from "../../models/user.model";
import jwt from "jsonwebtoken";


export const signupUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store data in Redis
    const userData = {
      name,
      email,
      password,
      otp,
    };

    // Store for 5 minutes
    await redisClient.set(
      `signup:${email}`,
      JSON.stringify(userData),
      {
        EX: 300, // expires in 5 min
      }
    );

    // TODO: Send OTP Email here

    res.status(200).json({
      message: "OTP sent to email",
      otp: otp
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Signup failed",
    });
  }
};




export const verifySignupOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // Get data from Redis
    const userData = await redisClient.get(`signup:${email}`);

    if (!userData) {
      return res.status(400).json({
        message: "OTP expired or not found",
      });
    }

    const parsedData = JSON.parse(userData);

    // Check OTP
    if (parsedData.otp != otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Save to MongoDB
    const newUser = new User({
      name: parsedData.name,
      email: parsedData.email,
      password: parsedData.password,
    });

    await newUser.save();

    // Delete Redis Data
    await redisClient.del(`signup:${email}`);

    res.status(201).json({
      message: "User verified and created",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Verification failed",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login failed",
    });
  }
};