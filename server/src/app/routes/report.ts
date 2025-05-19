import express from "express";
import { verifyToken, verifyAdminToken } from "../utils/utils";
import {
  reportVideo,
  getAllReports,
  updateReportStatus,
  getReportDetails
} from "../controllers/report";

const reportRoutes = express.Router();

// User routes
reportRoutes.post("/", verifyToken, reportVideo);

// Admin routes
reportRoutes.get("/all", verifyAdminToken, getAllReports);
reportRoutes.get("/:reportId", verifyAdminToken, getReportDetails);
reportRoutes.patch("/:reportId/status", verifyAdminToken, updateReportStatus);

export default reportRoutes;
