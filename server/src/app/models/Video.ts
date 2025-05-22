import mongoose from "mongoose";

const VALID_TAGS = ["action", "horror", "comedy", "drama", "thriller", "romance", "adventure", "sci-fi", "fantasy", "animation", "documentary", "crime", "mystery", "family"];
const VALID_CATEGORIES = ["movies", "documentaries", "tv shows", "web series", "short films", "educational", "music videos", "sports"];

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
            validate: {
                validator: function(v: string[]) {
                    return v.length <= 5 && v.every(tag => VALID_TAGS.includes(tag));
                },
                message: "Invalid tags or too many tags. Maximum 5 tags allowed."
            }
        },
        category:{
        type: String,
        enum: VALID_CATEGORIES,
        default: "movies"
        },
        duration:{
            type: String,
        },
        ratings:{
            type: Number,
            default: 0,
        },
        howManyRated:{
            type: Number,
            default: 0,
        },
        status:{
            type: String,
            enum: ["Pending","Under Review", "Published","Rejected"],
            default: "Pending"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
