import express from "express";
import { verifyToken, verifyAdminToken } from "../utils/utils";
import { getPendingVideos, approveVideo, rejectVideo } from "../controllers/adminVideo";

const adminVideoRoutes = express.Router();

adminVideoRoutes.get("/pending-videos", verifyToken, verifyAdminToken, getPendingVideos);
adminVideoRoutes.patch("/approve-video/:id", verifyToken, verifyAdminToken, approveVideo);
adminVideoRoutes.patch("/reject-video/:id", verifyToken, verifyAdminToken, rejectVideo);

export default adminVideoRoutes;
