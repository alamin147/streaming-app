import { Request, Response } from "express";
import { response } from "../../utils/utils";
import Video from "../../models/Video";
import Comment from "../../models/Comment";
import RecentVideo from "../../models/RecentVideos";
import WatchLater from "../../models/WatchLater";
import User from "../../models/User";
import jwt from "jsonwebtoken";

export const getMyVideos = async (
  req: Request,
  res: Response,

) => {
  try {
    const userId=req.user.id;
    const myVideos=await Video.find({userId, isDeleted: false })
    response(res,200,true,"My Video fetched successfully",{myVideos})
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};
export const updateMyVideos = async (
  req: Request,
  res: Response,

) => {
  try {
    const userId = req.user.id;
    const videoId = req.params.videoId;
    const { title, des, category, tags } = req.body;

    let updateData: any = { title, des };

    if (category) {
      updateData.category = category;
    }
    if (tags) {
      updateData.tags = JSON.parse(tags);
    }

    const video = await Video.findOneAndUpdate(
      { _id: videoId, userId },
      updateData,
      { new: true }
    );

    if (!video) {
      return response(res, 404, false, "Video not found or unauthorized");
    }

    response(res, 200, true, "Video updated successfully", { video });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const deleteMyVideos = async (
  req: Request,
  res: Response,

) => {
  try {
    const userId=req.user.id;
    const videoId=req.params.videoId;
    const video = await Video.findOne({ _id: videoId, userId });

    if (!video) {
      return response(res, 404, false, "Video not found");
    }

    await Promise.all([
      Video.findByIdAndDelete(videoId),

      Comment.deleteMany({ videoId }),

      RecentVideo.deleteMany({ videoId }),

      WatchLater.deleteMany({ videoId })
    ]);

    response(res, 200, true, "Video and all related data deleted successfully", { video });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const editProfile = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.user.id;
    const { name, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, bio },
      { new: true }
    );
    if (!user) {
      return response(res, 404, false, "User not found");
    }
    const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role:user.role
          },
          process.env.JWTSECRET as string
        );

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    response(res, 200, true, "Profile updated successfully", { token });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};
