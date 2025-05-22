"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./app/routes/user"));
const connectDB_1 = require("./app/connectDB");
const video_1 = __importDefault(require("./app/routes/video"));
const auth_1 = __importDefault(require("./app/routes/auth"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./app/utils/utils");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userDashboardRoutes_1 = __importDefault(require("./app/routes/dashboard/userDashboardRoutes"));
const adminDashboardRoutes_1 = __importDefault(require("./app/routes/dashboard/adminDashboardRoutes"));
const userManagementRoutes_1 = __importDefault(require("./app/routes/dashboard/userManagementRoutes"));
const report_1 = __importDefault(require("./app/routes/report"));
exports.app = (0, express_1.default)();
dotenv_1.default.config();
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use("/api/v1/users", user_1.default);
exports.app.use("/api/v1/dashboard/user", userDashboardRoutes_1.default);
exports.app.use("/api/v1/dashboard/admin", adminDashboardRoutes_1.default);
exports.app.use("/api/v1/dashboard/admin/users", userManagementRoutes_1.default);
exports.app.use("/api/v1/videos", video_1.default);
exports.app.use("/api/v1/auth", auth_1.default);
exports.app.use("/api/v1/reports", report_1.default);
exports.app.use((err, req, res, next) => {
    (0, utils_1.response)(res, 500, false, `${err.message}` || "Something went wrong");
});
exports.app.listen(5000, () => {
    (0, connectDB_1.connectDB)();
    console.log("server running on 5000");
});
