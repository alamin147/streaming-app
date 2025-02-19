import express from "express";
import { verifyToken } from "../utils/utils";
import { deleteUser, getUser, updateUser } from "../controllers/user";

const userRoutes = express.Router();

userRoutes.put("/:id", verifyToken, updateUser);

userRoutes.delete("/:id", verifyToken, deleteUser);

userRoutes.get("/find/:id", getUser);

export default userRoutes;
