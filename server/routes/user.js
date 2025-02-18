import express from "express";
import { userC } from "../controllers/user.js";

const userRoutes = express.Router();

userRoutes.get("/",userC);


export default userRoutes;