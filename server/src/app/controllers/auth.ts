import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { response, utils } from "../utils/utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return response(res, 400, false, "Email is already registered.");
      }
      if (existingUser.username === username) {
        return response(res, 400, false, "Username is already taken.");
      }
    }

    const hash = await utils.hashPassword(password);

    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();

    return response(res, 201, true, "User registered successfully. Now login to continue");
  } catch (err: any) {
    console.error("Signup error:", err);
    return response(res, 500, false, err?.message || "Server Error");
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    })
      .select("+password")
      .lean();

    if (!user) return response(res, 404, false, "User Not Found");
    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass) return response(res, 400, false, "Password is wrong");

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.JWTSECRET as string
    );

    const { password: userPassword, ...restuser } = user;
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      sameSite: 'none',
      secure: true,
      path: '/',
    });
    response(res, 200, true, "User logged in successfully", {
      user: restuser,
      token,
    });
  } catch (err: any) {
    response(res, 500, true, err?.message || "Server Error");
  }
};
