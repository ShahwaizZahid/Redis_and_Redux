import type { SignupData, verifyData, LoginData } from "@/types/Auth";
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3002/api/v1/user",
});

// Signup API
export const signupAPI = (data: SignupData) => {
    return API.post("/signup", data);
};

// Verify OTP API
export const verifyOTPAPI = (data: verifyData) => {
    return API.post("/verify-otp", data);
};

// Login API
export const loginAPI = (data: LoginData) => {
    return API.post("/login", data);
};