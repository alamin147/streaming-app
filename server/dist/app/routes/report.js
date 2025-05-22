"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const report_1 = require("../controllers/report");
const reportRoutes = express_1.default.Router();
// User routes
reportRoutes.post("/", utils_1.verifyToken, report_1.reportVideo);
// Admin routes
reportRoutes.get("/all", utils_1.verifyAdminToken, report_1.getAllReports);
reportRoutes.get("/:reportId", utils_1.verifyAdminToken, report_1.getReportDetails);
reportRoutes.patch("/:reportId/status", utils_1.verifyAdminToken, report_1.updateReportStatus);
exports.default = reportRoutes;
