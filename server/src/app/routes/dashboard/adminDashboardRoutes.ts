import express from "express";
import { verifyAdminToken } from "../../utils/utils";
import { getAllVideos, changeVideoStatus } from "../../controllers/dashboard/adminDashboard";

const adminDashboardRoutes = express.Router();

adminDashboardRoutes.get("/all-videos", verifyAdminToken, getAllVideos);
adminDashboardRoutes.patch("/change-video-status/:videoId", verifyAdminToken, changeVideoStatus);

export default adminDashboardRoutes;
