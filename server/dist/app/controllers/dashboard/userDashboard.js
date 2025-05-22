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
exports.editProfile = exports.deleteMyVideos = exports.updateMyVideos = exports.getMyVideos = void 0;
const utils_1 = require("../../utils/utils");
const Video_1 = __importDefault(require("../../models/Video"));
const Comment_1 = __importDefault(require("../../models/Comment"));
const RecentVideos_1 = __importDefault(require("../../models/RecentVideos"));
const WatchLater_1 = __importDefault(require("../../models/WatchLater"));
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getMyVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const myVideos = yield Video_1.default.find({ userId });
        (0, utils_1.response)(res, 200, true, "My Video fetched successfully", { myVideos });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getMyVideos = getMyVideos;
const updateMyVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const videoId = req.params.videoId;
        const { title, des, category, tags } = req.body;
        let updateData = { title, des };
        if (category) {
            updateData.category = category;
        }
        if (tags) {
            updateData.tags = JSON.parse(tags);
        }
        const video = yield Video_1.default.findOneAndUpdate({ _id: videoId, userId }, updateData, { new: true });
        if (!video) {
            return (0, utils_1.response)(res, 404, false, "Video not found or unauthorized");
        }
        (0, utils_1.response)(res, 200, true, "Video updated successfully", { video });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.updateMyVideos = updateMyVideos;
const deleteMyVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const videoId = req.params.videoId;
        const video = yield Video_1.default.findOne({ _id: videoId, userId });
        if (!video) {
            return (0, utils_1.response)(res, 404, false, "Video not found");
        }
        yield Promise.all([
            Video_1.default.findByIdAndDelete(videoId),
            Comment_1.default.deleteMany({ videoId }),
            RecentVideos_1.default.deleteMany({ videoId }),
            WatchLater_1.default.deleteMany({ videoId })
        ]);
        (0, utils_1.response)(res, 200, true, "Video and all related data deleted successfully", { video });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.deleteMyVideos = deleteMyVideos;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { name, bio } = req.body;
        const user = yield User_1.default.findByIdAndUpdate(userId, { name, bio }, { new: true });
        if (!user) {
            return (0, utils_1.response)(res, 404, false, "User not found");
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
        }, process.env.JWTSECRET);
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
        (0, utils_1.response)(res, 200, true, "Profile updated successfully", { token });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.editProfile = editProfile;
