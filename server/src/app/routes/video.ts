import express from "express";
import { verifyToken } from "../utils/utils";
import {
  addView,
  CreateComment,
  createVideo,
  deleteVideo,
  fetchRecentVideos,
  fetchVideos,
  fetchWatchLaterVideos,
  getByTag,
  getComments,
  getVideo,
  isBookmarked,
  recentVideos,
  search,
  trendingVideos,
  updateVideo,
  uploadVideo,
  watchLater,
  createRating,
} from "../controllers/video";

const videoRoutes = express.Router();

videoRoutes.post("/upload", verifyToken, uploadVideo);
videoRoutes.post("/", verifyToken, createVideo);
videoRoutes.put("/:id", verifyToken, updateVideo);
videoRoutes.patch("/ratings/addRating/:videoId", verifyToken, createRating);
videoRoutes.get("/comments/:videoId", verifyToken, getComments);
videoRoutes.post("/comments", verifyToken, CreateComment);
videoRoutes.get("/watchlater", verifyToken, fetchWatchLaterVideos);
videoRoutes.get("/bookmarked/:id", verifyToken, isBookmarked);
videoRoutes.post("/watchlater/:id", verifyToken, watchLater);
videoRoutes.post("/recentVideos", verifyToken, recentVideos);
videoRoutes.get("/recentVideos", verifyToken, fetchRecentVideos);
videoRoutes.get("/find/:id", getVideo);
videoRoutes.delete("/delete/:id", verifyToken, deleteVideo);
videoRoutes.put("/view/:id", addView);
videoRoutes.get("/trend", trendingVideos);
videoRoutes.get("/random", fetchVideos);
videoRoutes.get("/tags", getByTag);
videoRoutes.get("/search", search);

export default videoRoutes;

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
