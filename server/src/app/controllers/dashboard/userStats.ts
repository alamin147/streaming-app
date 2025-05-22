import { Request, Response } from "express";
import { response } from "../../utils/utils";
import Video from "../../models/Video";
import Comment from "../../models/Comment";

export const getUserStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const videos = await Video.find({ userId });
    const totalViews = videos.reduce((acc, video) => acc + (video.views || 0), 0);

    const totalSubscribers = 0;

    const contentCount = videos.length;

    const totalWatchTime = videos.reduce((acc, video) => acc + (typeof video.duration === 'string' ? parseInt(video.duration) : (video.duration || 0)), 0);

    const totalComments = await Comment.countDocuments({
      videoId: { $in: videos.map(v => v._id) }
    });

    const avgViewsPerVideo = videos.length > 0 ? totalViews / videos.length : 0;

    const engagementRate = videos.length > 0 ?
      (totalComments / (videos.length * avgViewsPerVideo)) * 100 : 0;

    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

    const viewsProgress = 66;
    const engagementProgress = Math.min(Math.round(engagementRate), 100);
    const retentionProgress = 78;

    response(res, 200, true, "Dashboard stats fetched successfully", {
      stats: {
        overview: {
          totalViews,
          totalSubscribers,
          contentCount,
          totalWatchTime: Math.round(totalWatchTime / 60),
        },
        performance: {
          viewsProgress,
          engagementProgress,
          retentionProgress,
        }
      }
    });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const getRecentUploads = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const recentVideos = await Video.find({ userId })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    response(res, 200, true, "Recent uploads fetched successfully", {
      recentVideos
    });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};
