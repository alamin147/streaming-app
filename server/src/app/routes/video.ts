import express from "express";
import { verifyToken } from "../utils/utils";
import {
  addView,
  createVideo,
  deleteVideo,
  fetchRecentVideos,
  fetchVideos,
  getByTag,
  getVideo,
  isBookmarked,
  recentVideos,
  search,
  trendingVideos,
  updateVideo,
  uploadVideo,
  watchLater,
} from "../controllers/video";

const videoRoutes = express.Router();

import { upload } from "../middlewares/multer";
videoRoutes.post(
  "/upload",
  verifyToken,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadVideo
);

videoRoutes.get("/bookmarked/:id", verifyToken, isBookmarked);
videoRoutes.post("/watchlater/:id", verifyToken, watchLater);
videoRoutes.post("/recentVideos", verifyToken, recentVideos);
videoRoutes.get("/recentVideos", verifyToken, fetchRecentVideos);
videoRoutes.post("/", verifyToken, createVideo);
videoRoutes.get("/find/:id", getVideo);
videoRoutes.put("/:id", verifyToken, updateVideo);
videoRoutes.delete("/delete/:id", verifyToken, deleteVideo);
videoRoutes.put("/view/:id", addView);
videoRoutes.get("/trend", trendingVideos);
videoRoutes.get("/random", fetchVideos);
videoRoutes.get("/tags", getByTag);
videoRoutes.get("/search", search);

export default videoRoutes;
