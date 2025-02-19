"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const video_1 = require("../controllers/video");
const videoRoutes = express_1.default.Router();
videoRoutes.post("/", utils_1.verifyToken, video_1.createVideo);
videoRoutes.get("/find/:id", video_1.getVideo);
videoRoutes.put("/:id", utils_1.verifyToken, video_1.updateVideo);
videoRoutes.delete("/:id", utils_1.verifyToken, video_1.deleteVideo);
videoRoutes.put("/view/:id", video_1.addView);
videoRoutes.get("/trend", video_1.trendingVideos);
videoRoutes.get("/random", video_1.fetchVideos);
videoRoutes.get("/tags", video_1.getByTag);
videoRoutes.get("/search", video_1.search);
exports.default = videoRoutes;
