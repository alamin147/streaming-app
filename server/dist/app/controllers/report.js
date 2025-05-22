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
exports.getReportDetails = exports.updateReportStatus = exports.getAllReports = exports.reportVideo = void 0;
const Report_1 = __importDefault(require("../models/Report"));
const Video_1 = __importDefault(require("../models/Video"));
const utils_1 = require("../utils/utils");
const reportVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId, reason, description, type } = req.body;
        const video = yield Video_1.default.findById(videoId);
        if (!video) {
            return (0, utils_1.response)(res, 404, false, "Video not found");
        }
        const newReport = new Report_1.default({
            userId: req.user.id,
            videoId,
            reason,
            description,
            type
        });
        const savedReport = yield newReport.save();
        (0, utils_1.response)(res, 201, true, "Video reported successfully", {
            report: savedReport,
        });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.reportVideo = reportVideo;
const getAllReports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield Report_1.default.find()
            .sort({ createdAt: -1 })
            .populate({
            path: "userId",
            select: "name email img",
        })
            .populate({
            path: "videoId",
            select: "title imgUrl",
        });
        (0, utils_1.response)(res, 200, true, "Reports fetched successfully", { reports });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getAllReports = getAllReports;
const updateReportStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reportId } = req.params;
        const { status } = req.body;
        const validStatuses = ["Pending", "Reviewed", "Resolved", "Dismissed"];
        if (!validStatuses.includes(status)) {
            return (0, utils_1.response)(res, 400, false, "Invalid status value");
        }
        const report = yield Report_1.default.findById(reportId);
        if (!report) {
            return (0, utils_1.response)(res, 404, false, "Report not found");
        }
        report.status = status;
        yield report.save();
        (0, utils_1.response)(res, 200, true, "Report status updated successfully", { report });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.updateReportStatus = updateReportStatus;
const getReportDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reportId } = req.params;
        const report = yield Report_1.default.findById(reportId)
            .populate({
            path: "userId",
            select: "name email img",
        })
            .populate({
            path: "videoId",
            select: "title imgUrl videoUrl views",
        });
        if (!report) {
            return (0, utils_1.response)(res, 404, false, "Report not found");
        }
        (0, utils_1.response)(res, 200, true, "Report details fetched successfully", { report });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getReportDetails = getReportDetails;
