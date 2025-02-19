"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./app/routes/user"));
const connectDB_1 = require("./app/connectDB");
const video_1 = __importDefault(require("./app/routes/video"));
const comment_1 = __importDefault(require("./app/routes/comment"));
const auth_1 = __importDefault(require("./app/routes/auth"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./app/utils/utils");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
// origin: 'http://localhost:5173/',
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/users", user_1.default);
app.use("/api/v1/videos", video_1.default);
app.use("/api/v1/comments", comment_1.default);
app.use("/api/v1/auth", auth_1.default);
app.use((err, req, res, next) => {
    (0, utils_1.response)(res, 500, false, `${err.message}` || "Something went wrong");
});
//
app.listen(5000, () => {
    (0, connectDB_1.connectDB)();
    console.log("server running on 5000");
});
