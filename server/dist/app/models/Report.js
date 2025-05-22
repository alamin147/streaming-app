"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReportSchema = new mongoose_1.default.Schema({
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
    reason: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["Pending", "Reviewed", "Resolved", "Dismissed"],
        default: "Pending"
    },
    type: {
        type: String,
        enum: ["Content", "Copyright", "Harassment", "Spam", "Other"],
        required: true
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Report", ReportSchema);
