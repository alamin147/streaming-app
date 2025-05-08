import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        videoId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Video",
        },
        des: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
