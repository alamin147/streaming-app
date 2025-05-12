import { Request, Response } from "express";
import { response } from "../../utils/utils";
import Video from "../../models/Video";

export const getMyVideos = async (
  req: Request,
  res: Response,

) => {
  try {
    const userId=req.user.id;
    const myVideos=await Video.find({userId})
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
    const userId=req.user.id;
    const videoId=req.params.videoId;
    const { title, des } = req.body;
    const video = await Video.findOneAndUpdate(
      { _id: videoId, userId },
      { title, des },
      { new: true }
    );
    if (!video) {
      return response(res, 404, false, "Video not found");
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
    const video = await Video.findOneAndDelete({ _id: videoId, userId });
    if (!video) {
      return response(res, 404, false, "Video not found");
    }
    response(res, 200, true, "Video deleted successfully", { video });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};
