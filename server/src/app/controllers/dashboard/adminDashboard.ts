import { Request, Response } from "express";
import { response } from "../../utils/utils";
import Video from "../../models/Video";
import Comment from "../../models/Comment";
import RecentVideo from "../../models/RecentVideos";
import WatchLater from "../../models/WatchLater";

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

export const changeVideoStatus = async (
    req: Request,
    res: Response,
) => {
    try {
        const { videoId } = req.params;
        const { status } = req.body;

        const validStatuses = ["Pending", "Under Review", "Published", "Rejected"];
        if (!validStatuses.includes(status)) {
            return response(res, 400, false, "Invalid status value");
        }

        const video = await Video.findById(videoId);

        if (!video) {
            return response(res, 404, false, "Video not found");
        }

        video.status = status;
        await video.save();

        response(res, 200, true, "Video status updated successfully", { video });
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};
