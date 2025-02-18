import express from "express";

const userRoutes = express.Router();

userRoutes.put("/:id",updateUser);
userRoutes.delete("/:id",deleteUser);
userRoutes.get("/find/:id",getUser);



export default userRoutes;