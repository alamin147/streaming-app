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
exports.signup = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const utils_1 = require("../utils/utils");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const hash = yield utils_1.utils.hashPassword(data.password);
        const newUser = new User_js_1.default(Object.assign(Object.assign({}, req.body), { password: hash }));
        yield newUser.save();
        (0, utils_1.response)(res, 201, true, "User created successfully");
    }
    catch (error) {
        (0, utils_1.response)(res, 500, false, (error === null || error === void 0 ? void 0 : error.message) || "Server error");
    }
});
exports.signup = signup;
