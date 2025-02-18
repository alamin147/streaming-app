import express from "express";
import { signin, signup } from "../controllers/auth";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);
authRoutes.post("/google-signin");

export default authRoutes;
