import { NextFunction, Request, Response } from "express";
import Video from "../models/Video";
import { response } from "../utils/utils";

export const getPendingVideos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const pendingVideos = await Video.find({ status: "Pending" })
            .populate("userId", "name img")
            .sort({ createdAt: -1 });

        response(res, 200, true, "Pending videos fetched successfully", { pendingVideos });
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};

export const approveVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const video = await Video.findById(id);
        if (!video) {
            return response(res, 404, false, "Video not found");
        }

        video.status = "Published";
        await video.save();

        response(res, 200, true, "Video approved successfully");
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};
export const rejectVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const video = await Video.findById(id);
        if (!video) {
            return response(res, 404, false, "Video not found");
        }

        video.status = "Rejected";
        await video.save();

        response(res, 200, true, "Video rejected successfully");
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};
