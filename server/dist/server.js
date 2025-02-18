"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./app/routes/user"));
const connectDB_1 = require("./app/connectDB");
const video_js_1 = __importDefault(require("./app/routes/video.js"));
const comment_js_1 = __importDefault(require("./app/routes/comment.js"));
const auth_js_1 = __importDefault(require("./app/routes/auth.js"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
//
app.use("/api/v1/users", user_1.default);
app.use("/api/v1/videos", video_js_1.default);
app.use("/api/v1/comments", comment_js_1.default);
app.use("/api/v1/auth", auth_js_1.default);
//
app.listen(5000, () => {
    (0, connectDB_1.connectDB)();
    console.log("server running on 5000");
});
