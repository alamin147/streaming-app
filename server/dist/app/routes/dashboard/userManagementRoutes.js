"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../../utils/utils");
const userManagement_1 = require("../../controllers/dashboard/userManagement");
const userManagementRoutes = express_1.default.Router();
userManagementRoutes.get("/all-users", utils_1.verifyAdminToken, userManagement_1.getAllUsers);
userManagementRoutes.patch("/update-user-status/:userId", utils_1.verifyAdminToken, userManagement_1.updateUserStatus);
userManagementRoutes.patch("/update-user-role/:userId", utils_1.verifyAdminToken, userManagement_1.updateUserRole);
userManagementRoutes.delete("/delete-user/:userId", utils_1.verifyAdminToken, userManagement_1.deleteUser);
exports.default = userManagementRoutes;
