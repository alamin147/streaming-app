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
exports.deleteVideo = exports.changeVideoStatus = exports.getAllVideos = exports.getContentDistribution = exports.getDashboardStats = void 0;
const utils_1 = require("../../utils/utils");
const Video_1 = __importDefault(require("../../models/Video"));
const Comment_1 = __importDefault(require("../../models/Comment"));
const RecentVideos_1 = __importDefault(require("../../models/RecentVideos"));
const WatchLater_1 = __importDefault(require("../../models/WatchLater"));
const User_1 = __importDefault(require("../../models/User"));
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalUsers = yield User_1.default.countDocuments();
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        const usersLastMonth = yield User_1.default.countDocuments({
            createdAt: { $lt: lastMonthDate }
        });
        const userGrowthPercent = usersLastMonth > 0
            ? parseFloat((((totalUsers - usersLastMonth) / usersLastMonth) * 100).toFixed(1))
            : 2.5;
        const totalVideos = yield Video_1.default.countDocuments();
        const videosLastMonth = yield Video_1.default.countDocuments({
            createdAt: { $lt: lastMonthDate }
        });
        const videosGrowthPercent = videosLastMonth > 0
            ? parseFloat((((totalVideos - videosLastMonth) / videosLastMonth) * 100).toFixed(1))
            : 12.7;
        const twoOldDate = new Date();
        twoOldDate.setHours(twoOldDate.getHours() - 48);
        const pendingVideos = yield Video_1.default.countDocuments({ status: "Pending" });
        const urgentPendingVideos = yield Video_1.default.countDocuments({
            status: "Pending",
            createdAt: { $lt: twoOldDate }
        });
        const reportedContent = 23;
        const highPriorityReports = 5;
        (0, utils_1.response)(res, 200, true, "Dashboard stats fetched successfully", {
            stats: {
                users: {
                    total: totalUsers,
                    growthPercent: userGrowthPercent
                },
                videos: {
                    total: totalVideos,
                    growthPercent: videosGrowthPercent
                },
                pending: {
                    total: pendingVideos,
                    urgent: urgentPendingVideos
                },
                reported: {
                    total: reportedContent,
                    highPriority: highPriorityReports
                }
            }
        });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getDashboardStats = getDashboardStats;
const getContentDistribution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const distribution = yield Video_1.default.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: {
                        $cond: [
                            { $eq: ["$_id", "movies"] },
                            "Movies",
                            { $cond: [
                                    { $eq: ["$_id", "tv shows"] },
                                    "TV Shows",
                                    "Documentaries"
                                ] }
                        ]
                    },
                    value: "$count"
                }
            }
        ]);
        const categories = ["Movies", "TV Shows", "Documentaries"];
        const distributionMap = new Map(distribution.map(item => [item.name, item.value]));
        const finalDistribution = categories.map(category => ({
            name: category,
            value: distributionMap.get(category) || 0
        }));
        (0, utils_1.response)(res, 200, true, "Content distribution fetched successfully", { distribution: finalDistribution });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getContentDistribution = getContentDistribution;
const getAllVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield Video_1.default.find().populate({
            path: "userId",
            select: "name email img",
        });
        (0, utils_1.response)(res, 200, true, "Videos fetched successfully", { videos });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getAllVideos = getAllVideos;
const changeVideoStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId } = req.params;
        const { status } = req.body;
        const validStatuses = ["Pending", "Under Review", "Published", "Rejected"];
        if (!validStatuses.includes(status)) {
            return (0, utils_1.response)(res, 400, false, "Invalid status value");
        }
        const video = yield Video_1.default.findById(videoId);
        if (!video) {
            return (0, utils_1.response)(res, 404, false, "Video not found");
        }
        video.status = status;
        yield video.save();
        (0, utils_1.response)(res, 200, true, "Video status updated successfully", { video });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.changeVideoStatus = changeVideoStatus;
const deleteVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId } = req.params;
        const video = yield Video_1.default.findById(videoId);
        if (!video) {
            return (0, utils_1.response)(res, 404, false, "Video not found");
        }
        yield Promise.all([
            Video_1.default.findByIdAndDelete(videoId),
            Comment_1.default.deleteMany({ videoId }),
            RecentVideos_1.default.deleteMany({ videoId }),
            WatchLater_1.default.deleteMany({ videoId })
        ]);
        (0, utils_1.response)(res, 200, true, "Video deleted successfully");
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.deleteVideo = deleteVideo;
