import express from "express";
import { verifyToken } from "../../utils/utils";
import { getMyVideos, updateMyVideos, deleteMyVideos, editProfile } from "../../controllers/dashboard/userDashboard";
import { getUserStats, getRecentUploads } from "../../controllers/dashboard/userStats";

const userDashboardRoutes = express.Router();


userDashboardRoutes.get("/my-videos", verifyToken, getMyVideos);
userDashboardRoutes.patch("/my-videos/:videoId", verifyToken, updateMyVideos);
userDashboardRoutes.delete("/my-videos/:videoId", verifyToken, deleteMyVideos);
userDashboardRoutes.patch("/edit-profile", verifyToken, editProfile);
userDashboardRoutes.get("/stats", verifyToken, getUserStats);
userDashboardRoutes.get("/recent-uploads", verifyToken, getRecentUploads);

export default userDashboardRoutes;
