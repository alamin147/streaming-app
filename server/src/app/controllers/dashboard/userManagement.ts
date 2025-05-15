import { Request, Response } from "express";
import { response } from "../../utils/utils";
import User from "../../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();

    const searchTerm = req.query.search as string;
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

    const users = await User.find(query)
      .select("name username email img role createdAt status")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    response(res, 200, true, "Users fetched successfully", {
      users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        pages: Math.ceil(totalUsers / limit)
      }
    });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return response(res, 400, false, "Invalid status value");
    }

    const user = await User.findById(userId);
    if (!user) {
      return response(res, 404, false, "User not found");
    }

    user.status = status;
    await user.save();

    response(res, 200, true, "User status updated successfully", { user: {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      img: user.img,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt
    }});
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["user", "admin", "premium"].includes(role)) {
      return response(res, 400, false, "Invalid role value");
    }

    const user = await User.findById(userId);
    if (!user) {
      return response(res, 404, false, "User not found");
    }

    user.role = role;
    await user.save();

    response(res, 200, true, "User role updated successfully", { user: {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      img: user.img,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt
    }});
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return response(res, 404, false, "User not found");
    }

    await User.findByIdAndDelete(userId);

    response(res, 200, true, "User deleted successfully");
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};
