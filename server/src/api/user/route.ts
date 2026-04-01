import express from "express";
import { signup } from "./controller";

const userRoute = express.Router();



userRoute.post("/signup", signup);



export default userRoute;