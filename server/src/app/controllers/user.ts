import { Request, Response } from "express";
import User from "../models/User";
import { response } from "../utils/utils";

export const updateUser = async (req: Request, res: Response) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      response(res, 200, true, "User Updated successfully", {
        user: updatedUser,
      });
    } catch (err: any) {
      response(res, 500, false, err.message || "Internal Server Error");
    }
  } else {
    return response(res, 403, false, "You can update only your account!");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      response(res, 200, true, "User deleted successfully");
    } catch (err: any) {
      response(res, 500, false, err.message || "Internal Server Error");
    }
  } else {
    return response(res, 403, false, "You can delete only your account!");
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
    response(res, 200, true, "User Retrieved successfully", { user });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};
