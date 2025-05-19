import express from "express";
import { verifyAdminToken } from "../../utils/utils";
import { getAllVideos, changeVideoStatus, deleteVideo, getDashboardStats, getContentDistribution } from "../../controllers/dashboard/adminDashboard";
import { getPendingVideos, approveVideo, rejectVideo } from "../../controllers/adminVideo";

const adminDashboardRoutes = express.Router();

adminDashboardRoutes.get("/stats", verifyAdminToken, getDashboardStats);
adminDashboardRoutes.get("/all-videos", verifyAdminToken, getAllVideos);
adminDashboardRoutes.get("/content-distribution", verifyAdminToken, getContentDistribution);
adminDashboardRoutes.patch("/change-video-status/:videoId", verifyAdminToken, changeVideoStatus);

adminDashboardRoutes.delete("/delete-video/:videoId", verifyAdminToken, deleteVideo);
adminDashboardRoutes.get("/pending-videos", verifyAdminToken, getPendingVideos);
adminDashboardRoutes.patch("/approve-video/:id", verifyAdminToken, approveVideo);
adminDashboardRoutes.patch("/reject-video/:id", verifyAdminToken, rejectVideo);

export default adminDashboardRoutes;
