"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const comment_1 = require("../controllers/comment");
const commentRoutes = express_1.default.Router();
commentRoutes.post("/", utils_1.verifyToken, comment_1.addComment);
commentRoutes.delete("/:id", utils_1.verifyToken, comment_1.deleteComment);
commentRoutes.get("/:videoId", comment_1.getComments);
exports.default = commentRoutes;
