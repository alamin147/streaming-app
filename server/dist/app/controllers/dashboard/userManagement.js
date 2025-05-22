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
exports.deleteUser = exports.updateUserRole = exports.updateUserStatus = exports.getAllUsers = void 0;
const utils_1 = require("../../utils/utils");
const User_1 = __importDefault(require("../../models/User"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalUsers = yield User_1.default.countDocuments();
        const searchTerm = req.query.search;
        let query = {};
        if (searchTerm) {
            query = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { email: { $regex: searchTerm, $options: 'i' } },
                    { username: { $regex: searchTerm, $options: 'i' } }
                ]
            };
        }
        const users = yield User_1.default.find(query)
            .select("name username email img role createdAt status")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        (0, utils_1.response)(res, 200, true, "Users fetched successfully", {
            users,
            pagination: {
                total: totalUsers,
                page,
                limit,
                pages: Math.ceil(totalUsers / limit)
            }
        });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getAllUsers = getAllUsers;
const updateUserStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { status } = req.body;
        if (!["active", "inactive"].includes(status)) {
            return (0, utils_1.response)(res, 400, false, "Invalid status value");
        }
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return (0, utils_1.response)(res, 404, false, "User not found");
        }
        user.status = status;
        yield user.save();
        (0, utils_1.response)(res, 200, true, "User status updated successfully", { user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                img: user.img,
                role: user.role,
                status: user.status,
                createdAt: user.createdAt
            } });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.updateUserStatus = updateUserStatus;
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { role } = req.body;
        if (!["user", "admin", "premium"].includes(role)) {
            return (0, utils_1.response)(res, 400, false, "Invalid role value");
        }
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return (0, utils_1.response)(res, 404, false, "User not found");
        }
        user.role = role;
        yield user.save();
        (0, utils_1.response)(res, 200, true, "User role updated successfully", { user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                img: user.img,
                role: user.role,
                status: user.status,
                createdAt: user.createdAt
            } });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.updateUserRole = updateUserRole;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return (0, utils_1.response)(res, 404, false, "User not found");
        }
        yield User_1.default.findByIdAndDelete(userId);
        (0, utils_1.response)(res, 200, true, "User deleted successfully");
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.deleteUser = deleteUser;
