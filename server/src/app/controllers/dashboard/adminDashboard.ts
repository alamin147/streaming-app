import { Request, Response } from "express";
import { response } from "../../utils/utils";
import Video from "../../models/Video";
import Comment from "../../models/Comment";
import RecentVideo from "../../models/RecentVideos";
import WatchLater from "../../models/WatchLater";
import User from "../../models/User";

export const getDashboardStats = async (
    req: Request,
    res: Response,
) => {
    try {
        const totalUsers = await User.countDocuments();
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        const usersLastMonth = await User.countDocuments({
            createdAt: { $lt: lastMonthDate }
        });
        const userGrowthPercent = usersLastMonth > 0
            ? parseFloat((((totalUsers - usersLastMonth) / usersLastMonth) * 100).toFixed(1))
            : 2.5;

        const totalVideos = await Video.countDocuments();
        const videosLastMonth = await Video.countDocuments({
            createdAt: { $lt: lastMonthDate }
        });
        const videosGrowthPercent = videosLastMonth > 0
            ? parseFloat((((totalVideos - videosLastMonth) / videosLastMonth) * 100).toFixed(1))
            : 12.7;

        const twoOldDate = new Date();
        twoOldDate.setHours(twoOldDate.getHours() - 48);

        const pendingVideos = await Video.countDocuments({ status: "Pending" });
        const urgentPendingVideos = await Video.countDocuments({
            status: "Pending",
            createdAt: { $lt: twoOldDate }
        });

        const reportedContent = 23;
        const highPriorityReports = 5;

        response(res, 200, true, "Dashboard stats fetched successfully", {
            stats: {
                users: {
                    total: totalUsers,
                    growthPercent: userGrowthPercent
                },
                videos: {
                    total: totalVideos,
                    growthPercent: videosGrowthPercent
                },
                pending: {
                    total: pendingVideos,
                    urgent: urgentPendingVideos
                },
                reported: {
                    total: reportedContent,
                    highPriority: highPriorityReports
                }
            }
        });
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};

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

export const deleteVideo = async (
    req: Request,
    res: Response,
) => {
    try {
        const { videoId } = req.params;

        const video = await Video.findById(videoId);

        if (!video) {
            return response(res, 404, false, "Video not found");
        }

        await Promise.all([
            Video.findByIdAndDelete(videoId),
            Comment.deleteMany({ videoId }),
            RecentVideo.deleteMany({ videoId }),
            WatchLater.deleteMany({ videoId })
        ]);

        response(res, 200, true, "Video deleted successfully");
    } catch (err: any) {
        response(res, 500, false, err.message || "Internal Server Error");
    }
};
