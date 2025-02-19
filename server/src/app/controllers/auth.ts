import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { response, utils } from "../utils/utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const hash = await utils.hashPassword(data.password);

    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();

    response(res, 201, true, "User created successfully");
  } catch (err: any) {
    response(res, 500, true, err?.message || "Server Error");
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ username: req.body.username }).lean();

    if (!user) return response(res, 404, false, "User Not Found");

    const checkPass = await bcrypt.compare(req.body.password, user.password);

    if (!checkPass) return response(res, 400, false, "Invalid password");

    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET as string);

    const { password, ...restuser } = user;
    res.cookie("token", token, {
      httpOnly: true,
    });
    response(res, 200, true, "User logged in successfully", {
      user: restuser,
    });
  } catch (err: any) {
    response(res, 500, true, err?.message || "Server Error");
  }
};

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean();
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWTSECRET as string);

      res.cookie("token", token, {
        httpOnly: true,
      });
      response(res, 200, true, "User logged in successfully", {
        user,
      });
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign(
        { id: savedUser._id },
        process.env.JWTSECRET as string
      );

      res.cookie("token", token, {
        httpOnly: true,
      });
      response(res, 200, true, "User logged in successfully", {
        user: savedUser,
      });
    }
  } catch (err: any) {
    response(res, 500, true, err?.message || "Server Error");
  }
};
