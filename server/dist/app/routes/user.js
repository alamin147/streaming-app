"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils/utils");
const user_1 = require("../controllers/user");
const userRoutes = express_1.default.Router();
userRoutes.put("/:id", utils_1.verifyToken, user_1.updateUser);
userRoutes.delete("/:id", utils_1.verifyToken, user_1.deleteUser);
userRoutes.get("/find/:id", user_1.getUser);
exports.default = userRoutes;
