import mongoose from "mongoose";
const RecentVideoSchema = new mongoose.Schema(
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
    },
    { timestamps: true }
);

export default mongoose.model("RecentVideo", RecentVideoSchema);
