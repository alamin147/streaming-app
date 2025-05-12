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
