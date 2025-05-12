import express from "express";
import { verifyToken } from "../../utils/utils";
import { getMyVideos } from "../../controllers/dashboard/userDashboard";

const userDashboardRoutes = express.Router();

userDashboardRoutes.get("/my-videos", verifyToken, getMyVideos);


export default userDashboardRoutes;
