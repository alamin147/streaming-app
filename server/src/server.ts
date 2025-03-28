import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./app/routes/user";
import { connectDB } from "./app/connectDB";
import videoRoutes from "./app/routes/video";
import commentRoutes from "./app/routes/comment";
import authRoutes from "./app/routes/auth";
import cors from "cors";
import { response } from "./app/utils/utils";
import cookieParser from "cookie-parser";

export const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/videos", videoRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/auth", authRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  response(res, 500, false, `${err.message}` || "Something went wrong");
});
//
app.listen(5000, () => {
  connectDB();
  console.log("server running on 5000");
});
