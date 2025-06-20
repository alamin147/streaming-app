"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const video_1 = require("../controllers/video");
const videoRoutes = express_1.default.Router();
// import { upload } from "../middlewares/multer";
// videoRoutes.post(
//   "/upload",
//   verifyToken,
//   upload.fields([
//     { name: "video", maxCount: 1 },
//     { name: "thumbnail", maxCount: 1 },
//   ]),
//   uploadVideo
// );
videoRoutes.post("/upload", utils_1.verifyToken, video_1.uploadVideo);
videoRoutes.post("/", utils_1.verifyToken, video_1.createVideo);
videoRoutes.put("/:id", utils_1.verifyToken, video_1.updateVideo);
videoRoutes.patch("/ratings/addRating/:videoId", utils_1.verifyToken, video_1.createRating);
videoRoutes.get("/comments/:videoId", utils_1.verifyToken, video_1.getComments);
videoRoutes.post("/comments", utils_1.verifyToken, video_1.CreateComment);
videoRoutes.get("/watchlater", utils_1.verifyToken, video_1.fetchWatchLaterVideos);
videoRoutes.get("/bookmarked/:id", utils_1.verifyToken, video_1.isBookmarked);
videoRoutes.post("/watchlater/:id", utils_1.verifyToken, video_1.watchLater);
videoRoutes.post("/recentVideos", utils_1.verifyToken, video_1.recentVideos);
videoRoutes.get("/recentVideos", utils_1.verifyToken, video_1.fetchRecentVideos);
videoRoutes.get("/find/:id", video_1.getVideo);
videoRoutes.delete("/delete/:id", utils_1.verifyToken, video_1.deleteVideo);
videoRoutes.put("/view/:id", video_1.addView);
videoRoutes.get("/trend", video_1.trendingVideos);
videoRoutes.get("/random", video_1.fetchVideos);
videoRoutes.get("/tags", video_1.getByTag);
videoRoutes.get("/search", video_1.search);
exports.default = videoRoutes;
