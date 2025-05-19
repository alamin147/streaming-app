import { Request, Response, NextFunction } from "express";
import Report from "../models/Report";
import Video from "../models/Video";
import User from "../models/User";
import { response } from "../utils/utils";

export const reportVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { videoId, reason, description, type } = req.body;

    const video = await Video.findById(videoId);
    if (!video) {
      return response(res, 404, false, "Video not found");
    }

    const newReport = new Report({
      userId: req.user.id,
      videoId,
      reason,
      description,
      type
    });

    const savedReport = await newReport.save();

    response(res, 201, true, "Video reported successfully", {
      report: savedReport,
    });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const getAllReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "name email img",
      })
      .populate({
        path: "videoId",
        select: "title imgUrl",
      });

    response(res, 200, true, "Reports fetched successfully", { reports });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const updateReportStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reportId } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Reviewed", "Resolved", "Dismissed"];
    if (!validStatuses.includes(status)) {
      return response(res, 400, false, "Invalid status value");
    }

    const report = await Report.findById(reportId);

    if (!report) {
      return response(res, 404, false, "Report not found");
    }

    report.status = status;
    await report.save();

    response(res, 200, true, "Report status updated successfully", { report });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};

export const getReportDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reportId } = req.params;

    const report = await Report.findById(reportId)
      .populate({
        path: "userId",
        select: "name email img",
      })
      .populate({
        path: "videoId",
        select: "title imgUrl videoUrl views",
      });

    if (!report) {
      return response(res, 404, false, "Report not found");
    }

    response(res, 200, true, "Report details fetched successfully", { report });
  } catch (err: any) {
    response(res, 500, false, err.message || "Internal Server Error");
  }
};
