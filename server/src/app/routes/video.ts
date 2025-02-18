import express from "express";
import { verifyToken } from "../utils/utils";
import {
  createVideo,
  deleteVideo,
  getVideo,
  updateVideo,
} from "../controllers/video";

const videoRoutes = express.Router();

videoRoutes.post("/", verifyToken, createVideo);
videoRoutes.get("/find/:id", getVideo);
videoRoutes.put("/:id", verifyToken, updateVideo);
videoRoutes.delete("/:id", verifyToken, deleteVideo);
export default videoRoutes;
