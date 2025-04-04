import mongoose from "mongoose";
const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
