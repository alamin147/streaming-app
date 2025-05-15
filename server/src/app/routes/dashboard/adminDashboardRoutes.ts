import express from "express";
import { verifyAdminToken } from "../../utils/utils";
import { getAllVideos } from "../../controllers/dashboard/adminDashboard";

const adminDashboardRoutes = express.Router();

adminDashboardRoutes.get("/all-videos", verifyAdminToken, getAllVideos);

export default adminDashboardRoutes;
