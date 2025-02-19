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
exports.getComments = exports.deleteComment = exports.addComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const Video_1 = __importDefault(require("../models/Video"));
const utils_1 = require("../utils/utils");
// import { createError } from "../utils/error";
const addComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newComment = new Comment_1.default(Object.assign(Object.assign({}, req.body), { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }));
        const savedComment = yield newComment.save();
        (0, utils_1.response)(res, 201, true, "Comment added successfully", {
            commnet: savedComment,
        });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.addComment = addComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const comment = yield Comment_1.default.findById(req.params.id);
        if (!comment) {
            return (0, utils_1.response)(res, 404, false, "Comment not found");
        }
        const video = yield Video_1.default.findById(comment.videoId);
        if (!video) {
            return (0, utils_1.response)(res, 404, false, "Video not found");
        }
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) === ((_b = comment.userId) === null || _b === void 0 ? void 0 : _b.toString()) ||
            ((_c = req.user) === null || _c === void 0 ? void 0 : _c.id) === ((_d = video.userId) === null || _d === void 0 ? void 0 : _d.toString())) {
            yield Comment_1.default.findByIdAndDelete(req.params.id);
            return (0, utils_1.response)(res, 200, true, "The comment has been deleted.");
        }
        else {
            return (0, utils_1.response)(res, 403, false, "You can delete only your comment!");
        }
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.deleteComment = deleteComment;
const getComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comment_1.default.find({ videoId: req.params.videoId });
        (0, utils_1.response)(res, 200, true, "Comments fetched successfully", { comments });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getComments = getComments;
