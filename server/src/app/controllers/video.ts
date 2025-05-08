import { NextFunction, Request, Response } from "express";
import Video from "../models/Video";
import { response } from "../utils/utils";
import dotenv from "dotenv";
import { uploadFile } from "../middlewares/uploads";
import RecentVideos from "../models/RecentVideos";
import WatchLater from "../models/WatchLater";
import Comment from "../models/Comment";
dotenv.config();

export const createVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
        response(res, 201, true, "Video Created successfully");
    } catch (err) {
        next(err);
    }
};

export const getVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const video = await Video.findById(req.params.id).lean();

        response(res, 200, true, "Video fetched successfully", { video });
    } catch (err) {
        next(err);
    }
};

export const updateVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return response(res, 404, false, "Video not found!");

        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            response(res, 200, true, "Video updated successfully", {
                updatedVideo,
            });
        } else {
            return response(res, 403, false, "You can update only your video!");
        }
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};

export const deleteVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return response(res, 404, false, "Video not found!");
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("The video has been deleted.");
        } else {
            return response(res, 403, false, "You can delete only your video!");
        }
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};

export const addView = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        response(res, 200, true, "View added successfully");
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};

export const watchLater = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const videoId = req.body.id;

        const existingRecord = await WatchLater.findOne({
            userId: req.user.id,
            videoId: videoId,
        });

        if (existingRecord) {
            await WatchLater.findByIdAndDelete(existingRecord._id);
            return response(res, 200, true, "Video removed from watch later");
        } else {
            const Video = new WatchLater({ userId: req.user.id, videoId });
            await Video.save();

            return response(res, 201, true, "Video added to watch later");
        }
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};
export const recentVideos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const videoId = req.body.id;

        const existingRecord = await RecentVideos.findOne({
            userId: req.user.id,
            videoId: videoId,
        });

        if (existingRecord) {
            await RecentVideos.findByIdAndDelete(existingRecord._id);

            const newRecentVideo = new RecentVideos({
                userId: req.user.id,
                videoId,
            });
            const savedVideo = await newRecentVideo.save();

            return response(
                res,
                200,
                true,
                "Video moved to top of recent list",
                {
                    recentVideo: savedVideo,
                }
            );
        } else {
            const recentVideo = new RecentVideos({
                userId: req.user.id,
                videoId,
            });
            const savedVideo = await recentVideo.save();

            return response(res, 201, true, "Recent video added successfully", {
                recentVideo: savedVideo,
            });
        }
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};

export const fetchRecentVideos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const videos = await RecentVideos.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(20)
            .populate({
                path: "videoId",
                model: "Video",
                options: { lean: true },
            })
            .lean();

        response(res, 200, true, "Recent Videos fetched successfully", {
            videos,
        });
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};

export const fetchVideos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 20 } }]);
        response(res, 200, true, "Videos fetched successfully", { videos });
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};

export const trendingVideos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        response(res, 200, true, "Trending videos fetched successfully", {
            videos,
        });
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};

export const getByTag = async (req: Request, res: Response) => {
    try {
        const tags = (req.query.tags as string).split(",");
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        response(res, 200, true, "Videos fetched successfully", { videos });
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};

export const search = async (req: Request, res: Response) => {
    try {
        const query = req.query.q as string;
        const videos = await Video.find({
            title: { $regex: query, $options: "i" },
        }).limit(40);
        response(res, 200, true, "Videos fetched successfully", { videos });
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};

export const uploadVideo: any = async (req: Request, res: Response) => {
    let uploadedThumbnail: any;
    let uploadedVideo: any;
    let imgUrl: any;
    let videoUrl: any;
    if (
        !req.files ||
        !(req.files as any).video ||
        !(req.files as any).thumbnail
    ) {
        return response(
            res,
            400,
            false,
            "Both video and thumbnail are required."
        );
    }

    // console.log("files", req.files);
    const videoFile = (req.files as any).video[0];
    const thumbnailFile = (req.files as any).thumbnail[0];

    const maxSize = 100 * 1024 * 1024;
    if (videoFile.size > maxSize || thumbnailFile.size > maxSize) {
        return response(
            res,
            400,
            false,
            "Video or thumbnail size exceeds 100MB."
        );
    }

    console.log(videoFile, thumbnailFile, req.body);

    const { title, desc } = req.body;
    try {
        if (thumbnailFile) {
            const filename = `${title.replace(/ /g, "_")}_${new Date()
                .toISOString()
                .replace(/[:.]/g, "-")}`;

            uploadedThumbnail = await uploadFile(
                thumbnailFile.path,
                filename,
                "img"
            );

            if (uploadedThumbnail?.secure_url) {
                imgUrl = uploadedThumbnail?.secure_url as string;
            }
        }
        if (videoFile) {
            const filename = `${title.replace(/ /g, "_")}_${new Date()
                .toISOString()
                .replace(/[:.]/g, "-")}`;

            uploadedVideo = await uploadFile(videoFile.path, filename, "vid");

            if (uploadedVideo?.eager?.[0]?.secure_url) {
                videoUrl = uploadedVideo.eager[0].secure_url;
            }
        }

        const newVideo = new Video({
            userId: req.user.id,
            title,
            des: desc,
            videoUrl: videoUrl,
            imgUrl: imgUrl,
        });

        const savedVideo = await newVideo.save();

        response(res, 201, true, "Video uploaded successfully", savedVideo);
    } catch (error: any) {
        console.log(error);
        response(res, 500, false, error.message || "Internal Server Error");
    }
};

export const isBookmarked = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const videoId = req.params.id;
        const existingRecord = await WatchLater.findOne({
            userId: req.user.id,
            videoId,
        });

        if (existingRecord) {
            return response(res, 200, true, "", {
                bookmarked: true,
            });
        } else {
            return response(res, 200, true, "", {
                bookmarked: false,
            });
        }
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};

export const fetchWatchLaterVideos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const videos = await WatchLater.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate({
                path: "videoId",
                model: "Video",
                options: { lean: true },
            })
            .lean();

        response(res, 200, true, "Watch Later Videos fetched successfully", {
            videos,
        });
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};

// comment

export const CreateComment = async (req: Request, res: Response) => {
    try {
        const {videoId} = req.body;
        const {comment} = req.body;

        const Comments = new Comment({
            userId: req.user.id,
            videoId,
            des: comment,
        });
        await Comments.save();

        return response(res, 201, true, "Comment Added");
    } catch (err: any) {
        console.log(err)
        response(res, 500, false, err.message || "Internal Server Error");
    }
};
