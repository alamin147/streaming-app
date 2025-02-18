import express from "express";
import { videoC } from "../controllers/video.js";

const videoRoutes = express.Router();

videoRoutes.get("/",videoC);


export default videoRoutes;