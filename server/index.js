import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import { connectDB } from "./connectDB.js";
import videoRoutes from "./routes/video.js";
import commentRoutes from "./routes/comment.js";
import authRoutes from "./routes/auth.js";

const app = express();
dotenv.config();
app.use(express.json());
//

app.use("/api/v1/users",userRoutes);
app.use("/api/v1/videos",videoRoutes);
app.use("/api/v1/comments",commentRoutes);
app.use("/api/v1/auth",authRoutes);


//
app.listen(5000, () => {
  connectDB();
  console.log("server running on 5000");
});
