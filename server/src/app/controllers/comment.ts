import { Request, Response, NextFunction } from "express";
import Comment from "../models/Comment";
import Video from "../models/Video";
import { response } from "../utils/utils";
// import { createError } from "../utils/error";

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newComment = new Comment({ ...req.body, userId: req.user?.id });
    const savedComment = await newComment.save();
    response(res, 201, true, "Comment added successfully", {
      commnet: savedComment,
    });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return response(res, 404, false, "Comment not found");
    }
    const video = await Video.findById(comment.videoId);
    if (!video) {
      return response(res, 404, false, "Video not found");
    }

    if (
      req.user?.id === comment.userId?.toString() ||
      req.user?.id === video.userId?.toString()
    ) {
      await Comment.findByIdAndDelete(req.params.id);
      return response(res, 200, true, "The comment has been deleted.");
    } else {
      return response(res, 403, false, "You can delete only your comment!");
    }
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    response(res, 200, true, "Comments fetched successfully", { comments });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};
