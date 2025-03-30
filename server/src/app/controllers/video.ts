import { NextFunction, Request, Response } from "express";
import Video from "../models/Video";
import { response } from "../utils/utils";
import fs from "fs";
import dotenv from "dotenv";
import { uploadFile } from "../middlewares/uploads";
dotenv.config();

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

export const getByTag = async (req: Request, res: Response) => {
  try {
    const tags = (req.query.tags as string).split(",");
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    response(res, 200, true, "Videos fetched successfully", { videos });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const search = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    response(res, 200, true, "Videos fetched successfully", { videos });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const uploadVideo: any = async (req: Request, res: Response) => {
  let uploadedThumbnail: any;
  let uploadedVideo: any;
  let imgUrl: any;
  let videoUrl: any;
  if (
    !req.files ||
    !(req.files as any).video ||
    !(req.files as any).thumbnail
  ) {
    return response(res, 400, false, "Both video and thumbnail are required.");
  }

  // console.log("files", req.files);
  const videoFile = (req.files as any).video[0];
  const thumbnailFile = (req.files as any).thumbnail[0];

  const maxSize = 500 * 1024 * 1024;
  if (videoFile.size > maxSize || thumbnailFile.size > maxSize) {
    return response(res, 400, false, "Video or thumbnail size exceeds 500MB.");
  }

  console.log(videoFile, thumbnailFile, req.body);

  const { title, desc } = req.body;
  try {
    if (thumbnailFile) {
      const filename = `${title.replace(/ /g, "_")}_${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}`;

      uploadedThumbnail = await uploadFile(thumbnailFile.path, filename);

      if (uploadedThumbnail?.secure_url) {
        imgUrl = uploadedThumbnail?.secure_url as string;
      }
    }
    if (videoFile) {
      const filename = `${title.replace(/ /g, "_")}_${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}`;

      uploadedVideo = await uploadFile(videoFile.path, filename);

      if (uploadedVideo?.secure_url) {
        videoUrl = uploadedVideo?.secure_url as string;
      }
    }

    const newVideo = new Video({
      userId: req.user.id,
      title,
      des: desc,
      videoUrl: videoUrl,
      imgUrl: imgUrl,
    });

    const savedVideo = await newVideo.save();

    response(res, 201, true, "Video uploaded successfully", savedVideo);
  } catch (error: any) {
    console.log(error);
    response(res, 500, false, error.message || "Internal Server Error");
  }
};
