import express from "express";
import { verifyToken } from "../utils/utils";
import { createVideo, getVideo } from "../controllers/video";

const videoRoutes = express.Router();

videoRoutes.post("/", verifyToken, createVideo);
videoRoutes.get("/find/:id", getVideo);

export default videoRoutes;
