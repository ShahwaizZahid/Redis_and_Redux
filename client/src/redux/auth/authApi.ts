import type { SignupData, verifyData } from "@/types/Auth";
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/v1/user",
});

// Signup API
export const signupAPI = (data: SignupData) => {
    return API.post("/signup", data);
};

// Verify OTP API
export const verifyOTPAPI = (data: verifyData) => {
    return API.post("/verify-otp", data);
};