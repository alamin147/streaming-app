import express from "express";
import { signup } from "../controllers/auth.js";

const authRoutes = express.Router();

authRoutes.post("/signup",signup);
authRoutes.post("/signin",);
authRoutes.post("/google-signin",);


export default authRoutes;