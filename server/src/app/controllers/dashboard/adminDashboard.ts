import { Request, Response } from "express";
import { response } from "../../utils/utils";
import Video from "../../models/Video";
import Comment from "../../models/Comment";
import RecentVideo from "../../models/RecentVideos";
import WatchLater from "../../models/WatchLater";
import User from "../../models/User";
import jwt from "jsonwebtoken";

export const getAllVideos = async (
    req: Request,
    res: Response,
) => {
    try {
        const videos = await Video.find().populate({
            path: "userId",
            select: "name email img",
        });
        response(res, 200, true, "Videos fetched successfully", { videos });
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};
