import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Video"
    },
    reason: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Resolved", "Dismissed"],
      default: "Pending"
    },
    type: {
      type: String,
      enum: ["Content", "Copyright", "Harassment", "Spam", "Other"],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
