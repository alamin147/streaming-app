"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRating = exports.getComments = exports.CreateComment = exports.fetchWatchLaterVideos = exports.isBookmarked = exports.uploadVideo = exports.search = exports.getByTag = exports.trendingVideos = exports.fetchVideos = exports.fetchRecentVideos = exports.recentVideos = exports.watchLater = exports.addView = exports.deleteVideo = exports.updateVideo = exports.getVideo = exports.createVideo = void 0;
const Video_1 = __importDefault(require("../models/Video"));
const utils_1 = require("../utils/utils");
const dotenv_1 = __importDefault(require("dotenv"));
const RecentVideos_1 = __importDefault(require("../models/RecentVideos"));
const WatchLater_1 = __importDefault(require("../models/WatchLater"));
const Comment_1 = __importDefault(require("../models/Comment"));
dotenv_1.default.config();
const createVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newVideo = new Video_1.default(Object.assign({ userId: req.user.id }, req.body));
    try {
        const savedVideo = yield newVideo.save();
        res.status(200).json(savedVideo);
        (0, utils_1.response)(res, 201, true, "Video Created successfully");
    }
    catch (err) {
        next(err);
    }
});
exports.createVideo = createVideo;
const getVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield Video_1.default.findById(req.params.id).populate({
            path: "userId",
            select: "name",
        }).lean();
        if (!video) {
            return (0, utils_1.response)(res, 404, false, "Video not found");
        }
        if (video.status !== "Published") {
            if (!req.user) {
                return (0, utils_1.response)(res, 403, false, "This video is not available");
            }
            if (video.userId.toString() !== req.user.id && req.user.role !== "admin") {
                return (0, utils_1.response)(res, 403, false, "This video is not available");
            }
        }
        (0, utils_1.response)(res, 200, true, "Video fetched successfully", { video });
    }
    catch (err) {
        next(err);
    }
});
exports.getVideo = getVideo;
const updateVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield Video_1.default.findById(req.params.id);
        if (!video)
            return (0, utils_1.response)(res, 404, false, "Video not found!");
        if (req.user.id === video.userId) {
            const updatedVideo = yield Video_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            (0, utils_1.response)(res, 200, true, "Video updated successfully", {
                updatedVideo,
            });
        }
        else {
            return (0, utils_1.response)(res, 403, false, "You can update only your video!");
        }
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.updateVideo = updateVideo;
const deleteVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield Video_1.default.findById(req.params.id);
        if (!video)
            return (0, utils_1.response)(res, 404, false, "Video not found!");
        if (req.user.id === video.userId) {
            yield Video_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json("The video has been deleted.");
        }
        else {
            return (0, utils_1.response)(res, 403, false, "You can delete only your video!");
        }
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.deleteVideo = deleteVideo;
const addView = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // The minimum watch time requirement is enforced on the client side
        yield Video_1.default.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        (0, utils_1.response)(res, 200, true, "View added successfully");
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.addView = addView;
const watchLater = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videoId = req.body.id;
        const existingRecord = yield WatchLater_1.default.findOne({
            userId: req.user.id,
            videoId: videoId,
        });
        if (existingRecord) {
            yield WatchLater_1.default.findByIdAndDelete(existingRecord._id);
            return (0, utils_1.response)(res, 200, true, "Video removed from watch later");
        }
        else {
            const Video = new WatchLater_1.default({ userId: req.user.id, videoId });
            yield Video.save();
            return (0, utils_1.response)(res, 201, true, "Video added to watch later");
        }
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.watchLater = watchLater;
const recentVideos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videoId = req.body.id;
        const existingRecord = yield RecentVideos_1.default.findOne({
            userId: req.user.id,
            videoId: videoId,
        });
        if (existingRecord) {
            yield RecentVideos_1.default.findByIdAndDelete(existingRecord._id);
            const newRecentVideo = new RecentVideos_1.default({
                userId: req.user.id,
                videoId,
            });
            const savedVideo = yield newRecentVideo.save();
            return (0, utils_1.response)(res, 200, true, "Video moved to top of recent list", {
                recentVideo: savedVideo,
            });
        }
        else {
            const recentVideo = new RecentVideos_1.default({
                userId: req.user.id,
                videoId,
            });
            const savedVideo = yield recentVideo.save();
            return (0, utils_1.response)(res, 201, true, "Recent video added successfully", {
                recentVideo: savedVideo,
            });
        }
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.recentVideos = recentVideos;
const fetchRecentVideos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield RecentVideos_1.default.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(20)
            .populate({
            path: "videoId",
            model: "Video",
            options: { lean: true },
        })
            .lean();
        (0, utils_1.response)(res, 200, true, "Recent Videos fetched successfully", {
            videos,
        });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.fetchRecentVideos = fetchRecentVideos;
const fetchVideos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield Video_1.default.aggregate([
            { $match: { status: "Published" } },
            { $sample: { size: 20 } }
        ]);
        (0, utils_1.response)(res, 200, true, "Videos fetched successfully", { videos });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.fetchVideos = fetchVideos;
const trendingVideos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield Video_1.default.find({ status: "Published" }).sort({ views: -1 });
        (0, utils_1.response)(res, 200, true, "Trending videos fetched successfully", {
            videos,
        });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.trendingVideos = trendingVideos;
const getByTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = req.query.tags.split(",");
        const videos = yield Video_1.default.find({
            tags: { $in: tags },
            status: "Published"
        }).limit(20);
        (0, utils_1.response)(res, 200, true, "Videos fetched successfully", { videos });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getByTag = getByTag;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        const videos = yield Video_1.default.find({
            title: { $regex: query, $options: "i" },
            status: "Published"
        }).limit(40);
        (0, utils_1.response)(res, 200, true, "Videos fetched successfully", { videos });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.search = search;
// export const uploadVideo: any = async (req: Request, res: Response) => {
//     let uploadedThumbnail: any;
//     let uploadedVideo: any;
//     let imgUrl: any;
//     let videoUrl: any;
//     if (
//         !req.files ||
//         !(req.files as any).video ||
//         !(req.files as any).thumbnail
//     ) {
//         return response(
//             res,
//             400,
//             false,
//             "Both video and thumbnail are required."
//         );
//     }
//     const videoFile = (req.files as any).video[0];
//     const thumbnailFile = (req.files as any).thumbnail[0];
//     const maxSize = 100 * 1024 * 1024;
//     if (videoFile.size > maxSize || thumbnailFile.size > maxSize) {
//         return response(
//             res,
//             400,
//             false,
//             "Video or thumbnail size exceeds 100MB."
//         );
//     }
//     const { title, desc, duration, category, tags } = req.body;
//     let parsedTags: string[] = [];
//     try {
//         if (tags) {
//             parsedTags = JSON.parse(tags);
//         }
//         if (thumbnailFile) {
//             const filename = `${title.replace(/ /g, "_")}_${new Date()
//                 .toISOString()
//                 .replace(/[:.]/g, "-")}`;
//             uploadedThumbnail = await uploadFile(
//                 thumbnailFile.path,
//                 filename,
//                 "img"
//             );
//             if (uploadedThumbnail?.secure_url) {
//                 imgUrl = uploadedThumbnail?.secure_url as string;
//             }
//         }
//         // Upload video
//         if (videoFile) {
//             const filename = `${title.replace(/ /g, "_")}_${new Date()
//                 .toISOString()
//                 .replace(/[:.]/g, "-")}`;
//             uploadedVideo = await uploadFile(videoFile.path, filename, "vid");
//             if (uploadedVideo?.eager?.[0]?.secure_url) {
//                 videoUrl = uploadedVideo.eager[0].secure_url;
//             }
//         }
//         const newVideo = new Video({
//             userId: req.user.id,
//             title,
//             des: desc,
//             videoUrl: videoUrl,
//             imgUrl: imgUrl,
//             duration,
//             category: category,
//             tags: parsedTags
//         });
//         const savedVideo = await newVideo.save();
//         response(res, 201, true, "Video uploaded successfully", savedVideo);
//     } catch (error: any) {
//         response(res, 500, false, error.message || "Internal Server Error");
//     }
// };
const uploadVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, desc, video, thumbnail, duration, category, tags } = req.body;
        if (!video || !thumbnail) {
            return (0, utils_1.response)(res, 400, false, "Video and thumbnail URLs are required.");
        }
        if (!title || !duration || !category) {
            return (0, utils_1.response)(res, 400, false, "Title, duration, and category are required.");
        }
        let parsedTags = [];
        try {
            parsedTags = tags ? JSON.parse(tags) : [];
        }
        catch (err) {
            return (0, utils_1.response)(res, 400, false, "Tags must be a valid JSON array.");
        }
        const newVideo = new Video_1.default({
            userId: req.user.id,
            title,
            des: desc,
            videoUrl: video,
            imgUrl: thumbnail,
            duration,
            category,
            tags: parsedTags
        });
        const savedVideo = yield newVideo.save();
        return (0, utils_1.response)(res, 201, true, "Video uploaded successfully", savedVideo);
    }
    catch (error) {
        return (0, utils_1.response)(res, 500, false, error.message || "Internal Server Error");
    }
});
exports.uploadVideo = uploadVideo;
const isBookmarked = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videoId = req.params.id;
        const existingRecord = yield WatchLater_1.default.findOne({
            userId: req.user.id,
            videoId,
        });
        if (existingRecord) {
            return (0, utils_1.response)(res, 200, true, "", {
                bookmarked: true,
            });
        }
        else {
            return (0, utils_1.response)(res, 200, true, "", {
                bookmarked: false,
            });
        }
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.isBookmarked = isBookmarked;
const fetchWatchLaterVideos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield WatchLater_1.default.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate({
            path: "videoId",
            model: "Video",
            options: { lean: true },
        })
            .lean();
        (0, utils_1.response)(res, 200, true, "Watch Later Videos fetched successfully", {
            videos,
        });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.fetchWatchLaterVideos = fetchWatchLaterVideos;
// comment
const CreateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId } = req.body;
        const { comment } = req.body;
        const Comments = new Comment_1.default({
            userId: req.user.id,
            videoId,
            des: comment,
        });
        yield Comments.save();
        return (0, utils_1.response)(res, 201, true, "Comment Added");
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.CreateComment = CreateComment;
const getComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId } = req.params;
        const comments = yield Comment_1.default.find({ videoId })
            .sort({ createdAt: -1 })
            .populate({
            path: "userId",
            select: "name img createdAt",
            options: { lean: true },
        })
            .lean();
        (0, utils_1.response)(res, 200, true, "Comments fetched successfully", {
            comments,
        });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getComments = getComments;
const createRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId } = req.params;
        const { rating } = req.body;
        const ratingValue = Number(rating);
        if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
            return (0, utils_1.response)(res, 400, false, "Rating must be a number between 1 and 5");
        }
        const video = yield Video_1.default.findById(videoId);
        if (!video) {
            return (0, utils_1.response)(res, 404, false, "Video not found");
        }
        const currentTotalRating = video.ratings * video.howManyRated;
        const newTotalRating = currentTotalRating + ratingValue;
        const newHowManyRated = video.howManyRated + 1;
        const newAverageRating = newTotalRating / newHowManyRated;
        const updatedVideo = yield Video_1.default.findByIdAndUpdate(videoId, {
            ratings: parseFloat(newAverageRating.toFixed(1)),
            howManyRated: newHowManyRated,
        }, { new: true });
        return (0, utils_1.response)(res, 200, true, "Rating added successfully", {
            updatedVideo,
        });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.createRating = createRating;
