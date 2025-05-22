"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VALID_TAGS = ["action", "horror", "comedy", "drama", "thriller", "romance", "adventure", "sci-fi", "fantasy", "animation", "documentary", "crime", "mystery", "family"];
const VALID_CATEGORIES = ["movies", "documentaries", "tv shows", "web series", "short films", "educational", "music videos", "sports"];
const VideoSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    des: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        default: [],
        validate: {
            validator: function (v) {
                return v.length <= 5 && v.every(tag => VALID_TAGS.includes(tag));
            },
            message: "Invalid tags or too many tags. Maximum 5 tags allowed."
        }
    },
    category: {
        type: String,
        enum: VALID_CATEGORIES,
        default: "movies"
    },
    duration: {
        type: String,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    howManyRated: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["Pending", "Under Review", "Published", "Rejected"],
        default: "Pending"
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Video", VideoSchema);
