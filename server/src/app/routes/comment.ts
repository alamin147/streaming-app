import express from "express";
import { verifyToken } from "../utils/utils";
import { addComment, deleteComment, getComments } from "../controllers/comment";

const commentRoutes = express.Router();

commentRoutes.post("/", verifyToken, addComment);
commentRoutes.delete("/:id", verifyToken, deleteComment);
commentRoutes.get("/:videoId", getComments);

export default commentRoutes;
