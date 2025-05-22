"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../../utils/utils");
const userDashboard_1 = require("../../controllers/dashboard/userDashboard");
const userStats_1 = require("../../controllers/dashboard/userStats");
const userDashboardRoutes = express_1.default.Router();
userDashboardRoutes.get("/my-videos", utils_1.verifyToken, userDashboard_1.getMyVideos);
userDashboardRoutes.patch("/my-videos/:videoId", utils_1.verifyToken, userDashboard_1.updateMyVideos);
userDashboardRoutes.delete("/my-videos/:videoId", utils_1.verifyToken, userDashboard_1.deleteMyVideos);
userDashboardRoutes.patch("/edit-profile", utils_1.verifyToken, userDashboard_1.editProfile);
userDashboardRoutes.get("/stats", utils_1.verifyToken, userStats_1.getUserStats);
userDashboardRoutes.get("/recent-uploads", utils_1.verifyToken, userStats_1.getRecentUploads);
exports.default = userDashboardRoutes;
