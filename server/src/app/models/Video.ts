import mongoose from "mongoose";
const VideoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        tags: {
            type: [String],
            default: [],
        },
        category:{
        type: String,
        enum: ["movies", "documentaries", "tv shows"],
        default: "movies"
        },
        duration:{
            type: Number,
            default: 0,
        },
        ratings:{
            type: Number,
            default: 0,
        },
        howManyRated:{
            type: Number,
            default: 0,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
