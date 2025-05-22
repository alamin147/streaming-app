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
exports.getRecentUploads = exports.getUserStats = void 0;
const utils_1 = require("../../utils/utils");
const Video_1 = __importDefault(require("../../models/Video"));
const Comment_1 = __importDefault(require("../../models/Comment"));
const getUserStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const videos = yield Video_1.default.find({ userId });
        const totalViews = videos.reduce((acc, video) => acc + (video.views || 0), 0);
        const totalSubscribers = 0;
        const contentCount = videos.length;
        const totalWatchTime = videos.reduce((acc, video) => acc + (typeof video.duration === 'string' ? parseInt(video.duration) : (video.duration || 0)), 0);
        const totalComments = yield Comment_1.default.countDocuments({
            videoId: { $in: videos.map(v => v._id) }
        });
        const avgViewsPerVideo = videos.length > 0 ? totalViews / videos.length : 0;
        const engagementRate = videos.length > 0 ?
            (totalComments / (videos.length * avgViewsPerVideo)) * 100 : 0;
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        const viewsProgress = 66;
        const engagementProgress = Math.min(Math.round(engagementRate), 100);
        const retentionProgress = 78;
        (0, utils_1.response)(res, 200, true, "Dashboard stats fetched successfully", {
            stats: {
                overview: {
                    totalViews,
                    totalSubscribers,
                    contentCount,
                    totalWatchTime: Math.round(totalWatchTime / 60),
                },
                performance: {
                    viewsProgress,
                    engagementProgress,
                    retentionProgress,
                }
            }
        });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getUserStats = getUserStats;
const getRecentUploads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const recentVideos = yield Video_1.default.find({ userId })
            .sort({ createdAt: -1 })
            .limit(3)
            .lean();
        (0, utils_1.response)(res, 200, true, "Recent uploads fetched successfully", {
            recentVideos
        });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getRecentUploads = getRecentUploads;
