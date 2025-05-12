import express from "express";
import { verifyToken } from "../../utils/utils";
import { getMyVideos, updateMyVideos } from "../../controllers/dashboard/userDashboard";

const userDashboardRoutes = express.Router();

userDashboardRoutes.get("/my-videos", verifyToken, getMyVideos);
userDashboardRoutes.patch("/my-videos/:videoId", verifyToken, updateMyVideos);


export default userDashboardRoutes;
