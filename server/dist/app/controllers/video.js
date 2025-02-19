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
exports.search = exports.getByTag = exports.trendingVideos = exports.fetchVideos = exports.addView = exports.deleteVideo = exports.updateVideo = exports.getVideo = exports.createVideo = void 0;
const Video_1 = __importDefault(require("../models/Video"));
const utils_1 = require("../utils/utils");
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
        const video = yield Video_1.default.findById(req.params.id).lean();
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
            (0, utils_1.response)(res, 200, true, "Video updated successfully", { updatedVideo });
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
const fetchVideos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield Video_1.default.aggregate([{ $sample: { size: 20 } }]);
        (0, utils_1.response)(res, 200, true, "Videos fetched successfully", { videos });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.fetchVideos = fetchVideos;
const trendingVideos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield Video_1.default.find().sort({ views: -1 });
        (0, utils_1.response)(res, 200, true, "Trending videos fetched successfully", {
            videos,
        });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.trendingVideos = trendingVideos;
const getByTag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = req.query.tags.split(",");
        const videos = yield Video_1.default.find({ tags: { $in: tags } }).limit(20);
        (0, utils_1.response)(res, 200, true, "Videos fetched successfully", { videos });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getByTag = getByTag;
const search = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        const videos = yield Video_1.default.find({
            title: { $regex: query, $options: "i" },
        }).limit(40);
        (0, utils_1.response)(res, 200, true, "Videos fetched successfully", { videos });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.search = search;
