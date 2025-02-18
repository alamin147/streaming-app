"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const authRoutes = express_1.default.Router();
authRoutes.post("/signup", auth_1.signup);
authRoutes.post("/signin");
authRoutes.post("/google-signin");
exports.default = authRoutes;
