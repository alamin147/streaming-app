import { Request, Response } from "express";
import User from "../models/User.js";
import { response, utils } from "../utils/utils";

export const signup = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const hash = await utils.hashPassword(data.password);

    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();

    response(res, 201, true, "User created successfully");
  } catch (error: any) {
    response(res, 500, false, error?.message || "Server error");
  }
};
