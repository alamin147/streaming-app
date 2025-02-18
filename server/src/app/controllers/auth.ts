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
    next(err);
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

    response(res, 200, true, "User logged in successfully", token, {
      user: restuser,
    });
  } catch (err: any) {
    next(err);
  }
};
