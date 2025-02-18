import { NextFunction, Request, Response } from "express";
import Video from "../models/Video";
import { response } from "../utils/utils";
import { createError } from "../error/error";

export const createVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
    response(res, 201, true, "Video Created successfully");
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const video = await Video.findById(req.params.id).lean();

    response(res, 200, true, "Video fetched successfully", { video });
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return response(res, 404, false, "Video not found!");

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      response(res, 200, true, "Video updated successfully", { updatedVideo });
    } else {
      return response(res, 403, false, "You can update only your video!");
    }
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const deleteVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return response(res, 404, false, "Video not found!");
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted.");
    } else {
      return response(res, 403, false, "You can delete only your video!");
    }
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const addView = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    response(res, 200, true, "View added successfully");
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const fetchVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 20 } }]);
    response(res, 200, true, "Videos fetched successfully", { videos });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const trendingVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    response(res, 200, true, "Trending videos fetched successfully", {
      videos,
    });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};
