import express from "express";
import { commentC } from "../controllers/comment.js";

const commentRoutes = express.Router();

commentRoutes.get("/",commentC);


export default commentRoutes;