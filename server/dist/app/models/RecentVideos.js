"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RecentVideoSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    videoId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Video"
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("RecentVideo", RecentVideoSchema);
