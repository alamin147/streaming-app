"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../../utils/utils");
const adminDashboard_1 = require("../../controllers/dashboard/adminDashboard");
const adminVideo_1 = require("../../controllers/adminVideo");
const adminDashboardRoutes = express_1.default.Router();
adminDashboardRoutes.get("/stats", utils_1.verifyAdminToken, adminDashboard_1.getDashboardStats);
adminDashboardRoutes.get("/all-videos", utils_1.verifyAdminToken, adminDashboard_1.getAllVideos);
adminDashboardRoutes.get("/content-distribution", utils_1.verifyAdminToken, adminDashboard_1.getContentDistribution);
adminDashboardRoutes.patch("/change-video-status/:videoId", utils_1.verifyAdminToken, adminDashboard_1.changeVideoStatus);
adminDashboardRoutes.delete("/delete-video/:videoId", utils_1.verifyAdminToken, adminDashboard_1.deleteVideo);
adminDashboardRoutes.get("/pending-videos", utils_1.verifyAdminToken, adminVideo_1.getPendingVideos);
adminDashboardRoutes.patch("/approve-video/:id", utils_1.verifyAdminToken, adminVideo_1.approveVideo);
adminDashboardRoutes.patch("/reject-video/:id", utils_1.verifyAdminToken, adminVideo_1.rejectVideo);
exports.default = adminDashboardRoutes;
