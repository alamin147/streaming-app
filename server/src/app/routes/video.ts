import express from "express";
import { verifyToken } from "../utils/utils";
import {
  addView,
  createVideo,
  deleteVideo,
  fetchVideos,
  getVideo,
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
export default videoRoutes;
