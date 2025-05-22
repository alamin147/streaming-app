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
exports.uploadFile = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const uploadFile = (path, fileName, type) => __awaiter(void 0, void 0, void 0, function* () {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
    });
    try {
        if (type == "vid") {
            const uploadResult = yield cloudinary_1.v2.uploader.upload(path, {
                public_id: fileName,
                folder: process.env.CLOUDINARY_FOLDER,
                resource_type: "video",
                eager: [{ format: "m3u8", streaming_profile: "hd" }],
            });
            return uploadResult;
        }
        else {
            const uploadResult = yield cloudinary_1.v2.uploader.upload(path, {
                folder: process.env.CLOUDINARY_FOLDER,
                public_id: fileName,
            });
            return uploadResult;
        }
    }
    catch (error) {
        console.error("Upload Error:", error);
    }
    finally {
        fs_1.default.unlink(path, (err) => {
            if (err) {
                console.error(`Failed to delete local file: ${path}`, err);
            }
            else {
                console.log(`Successfully deleted local file: ${path}`);
            }
        });
    }
    return null;
});
exports.uploadFile = uploadFile;
