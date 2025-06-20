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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const existingUser = yield User_1.default.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            if (existingUser.email === email) {
                return (0, utils_1.response)(res, 400, false, "Email is already registered.");
            }
            if (existingUser.username === username) {
                return (0, utils_1.response)(res, 400, false, "Username is already taken.");
            }
        }
        const hash = yield utils_1.utils.hashPassword(password);
        const newUser = new User_1.default(Object.assign(Object.assign({}, req.body), { password: hash }));
        yield newUser.save();
        return (0, utils_1.response)(res, 201, true, "User registered successfully. Now login to continue");
    }
    catch (err) {
        console.error("Signup error:", err);
        return (0, utils_1.response)(res, 500, false, (err === null || err === void 0 ? void 0 : err.message) || "Server Error");
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usernameOrEmail, password } = req.body;
        const user = yield User_1.default.findOne({
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
        })
            .select("+password")
            .lean();
        if (!user)
            return (0, utils_1.response)(res, 404, false, "User Not Found");
        const checkPass = yield bcryptjs_1.default.compare(password, user.password);
        if (!checkPass)
            return (0, utils_1.response)(res, 400, false, "Password is wrong");
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
        }, process.env.JWTSECRET);
        const { password: userPassword } = user, restuser = __rest(user, ["password"]);
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            sameSite: 'none',
            secure: true,
            path: '/',
        });
        (0, utils_1.response)(res, 200, true, "User logged in successfully", {
            user: restuser,
            token,
        });
    }
    catch (err) {
        (0, utils_1.response)(res, 500, true, (err === null || err === void 0 ? void 0 : err.message) || "Server Error");
    }
});
exports.signin = signin;
