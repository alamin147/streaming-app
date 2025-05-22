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
exports.rejectVideo = exports.approveVideo = exports.getPendingVideos = void 0;
const Video_1 = __importDefault(require("../models/Video"));
const utils_1 = require("../utils/utils");
const getPendingVideos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pendingVideos = yield Video_1.default.find({ status: "Pending" })
            .populate("userId", "name img")
            .sort({ createdAt: -1 });
        (0, utils_1.response)(res, 200, true, "Pending videos fetched successfully", { pendingVideos });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getPendingVideos = getPendingVideos;
const approveVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const video = yield Video_1.default.findById(id);
        if (!video) {
            return (0, utils_1.response)(res, 404, false, "Video not found");
        }
        video.status = "Published";
        yield video.save();
        (0, utils_1.response)(res, 200, true, "Video approved successfully");
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.approveVideo = approveVideo;
const rejectVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const video = yield Video_1.default.findById(id);
        if (!video) {
            return (0, utils_1.response)(res, 404, false, "Video not found");
        }
        video.status = "Rejected";
        yield video.save();
        (0, utils_1.response)(res, 200, true, "Video rejected successfully");
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.rejectVideo = rejectVideo;
