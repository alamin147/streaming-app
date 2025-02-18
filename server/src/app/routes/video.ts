import express from "express";
import { verifyToken } from "../utils/utils";
import {
  addView,
  createVideo,
  deleteVideo,
  fetchVideos,
  getByTag,
  getVideo,
  search,
  trendingVideos,
  updateVideo,
} from "../controllers/video";

const videoRoutes = express.Router();

videoRoutes.post("/", verifyToken, createVideo);
videoRoutes.get("/find/:id", getVideo);
videoRoutes.put("/:id", verifyToken, updateVideo);
videoRoutes.delete("/:id", verifyToken, deleteVideo);
videoRoutes.put("/view/:id", addView);
videoRoutes.get("/trend", trendingVideos);
videoRoutes.get("/random", fetchVideos);
videoRoutes.get("/tags", getByTag);
videoRoutes.get("/search", search);

export default videoRoutes;
