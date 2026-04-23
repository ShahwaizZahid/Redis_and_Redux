import * as express from 'express';
import { signupUser, verifySignupOTP, loginUser } from "./controller";

const userRoute = express.Router();



userRoute.post("/signup", signupUser);

userRoute.post("/verify-otp", verifySignupOTP);

userRoute.post("/login", loginUser);

export default userRoute;