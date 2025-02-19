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
exports.getUser = exports.deleteUser = exports.updateUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils/utils");
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            (0, utils_1.response)(res, 200, true, "User Updated successfully", {
                user: updatedUser,
            });
        }
        catch (err) {
            (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
        }
    }
    else {
        return (0, utils_1.response)(res, 403, false, "You can update only your account!");
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id === req.user.id) {
        try {
            yield User_1.default.findByIdAndDelete(req.params.id);
            (0, utils_1.response)(res, 200, true, "User deleted successfully");
        }
        catch (err) {
            (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
        }
    }
    else {
        return (0, utils_1.response)(res, 403, false, "You can delete only your account!");
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        res.status(200).json(user);
        (0, utils_1.response)(res, 200, true, "User Retrieved successfully", { user });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, false, err.message || "Internal Server Error");
    }
});
exports.getUser = getUser;
