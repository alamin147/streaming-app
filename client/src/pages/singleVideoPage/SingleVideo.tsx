import { useState, useRef, useEffect } from "react";
import {
    Star,
    Play,
    Sun,
    MessageCircle,
    User,
    Send,
    ThumbsUp,
    ThumbsDown,
    ChevronDown,
} from "lucide-react";
import { BsFillBookmarkPlusFill, BsBookmarkCheckFill } from "react-icons/bs";
import { Link, NavLink, useParams } from "react-router-dom";
import { getUserInfo } from "@/redux/authUlits";
import { useTheme } from "@/components/themeProvider/ThemeProvider";
import { IoIosMoon } from "react-icons/io";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import Hls from "hls.js";
import {
    useAddToWatchLaterMutation,
    useGetSingleVideoQuery,
    useIsBookmarkedQuery,
    useUploadRecentVideosMutation,
} from "@/redux/features/videos/videosApi";
import toast from "react-hot-toast";
import { useAddCommentMutation } from "@/redux/features/videos/commentRatingApis";

export const SingleVideo = () => {
    const videoId: any = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const user = getUserInfo();
    const { theme, setTheme } = useTheme();
    const [called, setCalled] = useState(true);
    const [uploadRecentVideos] = useUploadRecentVideosMutation();
    const [addToWatchLater] = useAddToWatchLaterMutation();
    const [addComment] = useAddCommentMutation();
    const { data: singleVideo, isLoading } = useGetSingleVideoQuery(videoId);
    const { data: isBookmarked, isLoading: bookmarkedLoad } =
        useIsBookmarkedQuery(videoId);
    const [comments, setComments] = useState([
        {
            id: 1,
            username: "CinemaFan",
            text: "This is one of the best movies I've seen this year!",
            timestamp: "2 days ago",
        },
        {
            id: 2,
            username: "FilmBuff42",
            text: "The cinematography was incredible. Those night scenes were perfect.",
            timestamp: "1 day ago",
        },
        {
            id: 3,
            username: "MovieCritic",
            text: "Great story with amazing character development. Definitely worth watching!",
            timestamp: "5 hours ago",
        },
    ]);

    const [newComment, setNewComment] = useState("");
    const commentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const video = singleVideo?.data?.video || {};
    const {
        title = "",
        imgUrl = "",
        des = "",
        videoUrl = "",
        views = 0,
        _id = "",
    } = video;
    useEffect(() => {
        if (videoRef.current && videoUrl) {
            if (videoUrl.includes(".m3u8") && Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoUrl);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    if (videoRef.current) {
                        videoRef.current.addEventListener(
                            "play",
                            handleVideoStateChange
                        );
                        videoRef.current.addEventListener(
                            "pause",
                            handleVideoStateChange
                        );
                    }
                });
            } else {
                videoRef.current.src = videoUrl;
            }
        }
    }, [videoUrl]);

    const handlePlayClick = async () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
            if (called) {
                await uploadRecentVideos(videoId);
                setCalled(false);
            }
        }
    };

    const handleVideoStateChange = () => {
        if (videoRef.current) {
            setIsPlaying(!videoRef.current.paused);
        }
    };

    const handleAddComment = async () => {
        if (newComment.trim() === "") return;

        try {
            const commentData = {
                videoId: _id,
                comment: newComment.trim(),
            };

            const response = await addComment(commentData).unwrap();
            if (response?.status == 201) {
                toast.success(
                    response?.message || "Comment added successfully"
                );
                setNewComment("");
            } else toast.error("Failed to add comment. Please try again.");

            // Show success message
        } catch (error) {
            console.error("Failed to add comment:", error);
            toast.error("Failed to add comment. Please try again.");
        }
    };

    const LoadingSpinner = () => (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-medium text-gray-200">
                    Loading video...
                </p>
            </div>
        </div>
    );

    if (isLoading || bookmarkedLoad) {
        return <LoadingSpinner />;
    }

    const handleAddToWatchLater = async () => {
        const res = await addToWatchLater(videoId).unwrap();
        if (res?.status == 200)
            toast.success(
                res?.message ? res.message : "Video Added to watch later"
            );
        else
            toast.success(
                res?.message
                    ? res.message
                    : "Video failed to add in watch later"
            );
    };

    return (
        <>
            <div className="flex h-16 shrik-0 items-center justify-between gap-2  py-8 px-4 md:px-8">
                <div className="flex items-center gap-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:text-yellow-400 text-sm md:text-lg font-medium ${
                                isActive ? "text-yellow-400" : ""
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/movies"
                        className={({ isActive }) =>
                            `hover:text-yellow-400 text-sm md:text-lg font-medium ${
                                isActive ? "text-yellow-400" : ""
                            }`
                        }
                    >
                        Movies
                    </NavLink>
                    <NavLink
                        to="/#trending"
                        className={({ isActive }) =>
                            `hover:text-yellow-400 text-sm md:text-lg font-medium ${
                                isActive ? "text-yellow-400" : ""
                            }`
                        }
                    >
                        Trending
                    </NavLink>
                </div>
                <div className="flex items-center gap-4">
                    {theme == "dark" ? (
                        <Sun
                            onClick={() => setTheme("light")}
                            className="cursor-pointer  w-6 h-6 md:w-7 md:h-7 text-yellow-600"
                            size={24}
                        />
                    ) : (
                        <IoIosMoon
                            onClick={() => setTheme("dark")}
                            className="cursor-pointer  w-6 h-6 md:w-7 md:h-7 text-black"
                        />
                    )}
                    {user ? (
                        <Avatar className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                            <AvatarFallback className="h-full w-full border-2 flex items-center justify-center text-black dark:text-white font-bold ">
                                {user.name.charAt(0)}
                                {user.name.charAt(user.name.indexOf(" ") + 1)}
                            </AvatarFallback>
                        </Avatar>
                    ) : (
                        <Link to="/login">
                            <Button
                                className="py-5 px-5 md:text-lg dark:bg-yellow-500"
                                size="sm"
                            >
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
            <div className="py-8 px-4 md:px-8">
                <div className="min-hscreen bg-black text-gray-200">
                    {/* Video Player */}
                    <div className="w-full bg-gray-100 dark:bg-gray-900">
                        <div className="relative w-full aspect-video max-h-[80vh]">
                            <video
                                ref={videoRef}
                                controls
                                className="w-full h-full object-contain"
                                poster={imgUrl}
                                onPlay={handleVideoStateChange}
                                onPause={handleVideoStateChange}
                            ></video>

                            {/* Play button overlay */}
                            {!isPlaying && (
                                <div
                                    className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 transition-opacity hover:bg-opacity-20"
                                    onClick={handlePlayClick}
                                >
                                    <div className="bg-yellow-500 bg-opacity-80 rounded-full p-5 shadow-lg transform transition-transform hover:scale-110">
                                        <Play className="h-12 w-12 text-black fill-black" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Content below video */}
                <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white dark:bg-black">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        {/* Poster Image */}
                        <div className="flex-shrink-0 w-full md:w-64 lg:w-72 md:h-auto">
                            <div className="relative rounded-lg overflow-hidden w-full md:w-64 lg:w-72 h-[400px] md:h-full shadow-md">
                                <img
                                    src={imgUrl}
                                    alt={title || "Video Poster"}
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex flex-col gap-4 h-full">
                                {/* Title and Rating */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-gray-300">
                                        {title}
                                    </h1>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-300">
                                                    Views:{" "}
                                                    <span className="text-yellow-600 dark:text-yellow-500">
                                                        {views}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        {isBookmarked?.data?.bookmarked ? (
                                            <BsBookmarkCheckFill
                                                className="text-2xl md:text-3xl text-yellow-600 dark:text-yellow-500 cursor-pointer"
                                                onClick={handleAddToWatchLater}
                                            />
                                        ) : (
                                            <BsFillBookmarkPlusFill
                                                className="text-2xl md:text-3xl text-gray-700 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-500 cursor-pointer"
                                                onClick={handleAddToWatchLater}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Badges and Rating */}
                                <div className="flex justify-between flex-wrap items-center gap-3">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                                            HD
                                        </span>
                                        <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500">
                                            <Star className="fill-yellow-600 dark:fill-yellow-500 h-5 w-5" />
                                            <span className="font-medium">
                                                7.8
                                            </span>
                                        </div>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            24 min
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-md font-medium">
                                            Genre:
                                        </span>
                                        <span className="bg-red-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                                            Action
                                        </span>
                                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                                            Comedy
                                        </span>
                                        <span className="bg-green-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                                            Horror
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
                                    {des}
                                </p>

                                {/* Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                                    <div className="flex">
                                        <span className="w-28 text-gray-600 dark:text-gray-400">
                                            Country:
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-200">
                                            Japan
                                        </span>
                                    </div>

                                    <div className="flex">
                                        <span className="w-28 text-gray-600 dark:text-gray-400">
                                            Released:
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-200">
                                            2024-10-03
                                        </span>
                                    </div>

                                    <div className="flex col-span-1 md:col-span-2">
                                        <span className="w-28 text-gray-600 dark:text-gray-400">
                                            Production:
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-200">
                                            Telecom Animation Film, UNLIMITED
                                            PRODUCE by TMS, TMS Music
                                        </span>
                                    </div>
                                    <div className="flex col-span-1 md:col-span-2">
                                        <span className="w-28 text-gray-600 dark:text-gray-400">
                                            Casts:
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-200">
                                            Chiaki Kobayashi, Reina Ueda, Yuuma
                                            Uchida, Shoya Chiba, Shogo Sakata
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="py-8 px-4 md:px-8 dark:bg-black bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="mt-8 bg-gray-100 dark:bg-gray-900 rounded-lg p-6 shadow-md">
                            <div className="flex items-center gap-2 mb-6">
                                <MessageCircle className="text-yellow-600 dark:text-yellow-400" />
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                    Comments ({comments.length})
                                </h2>
                            </div>

                            {/* Add Comment */}
                            <div className="mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        {user ? (
                                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-yellow-600 dark:text-yellow-500 font-bold border border-yellow-400/30 dark:border-yellow-500/30">
                                                {user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        ) : (
                                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                                <User
                                                    className="text-gray-600 dark:text-gray-400"
                                                    size={20}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <textarea
                                            ref={commentRef}
                                            value={newComment}
                                            onChange={(e) =>
                                                setNewComment(e.target.value)
                                            }
                                            placeholder={
                                                user
                                                    ? "Add a comment..."
                                                    : "Sign in to comment"
                                            }
                                            disabled={!user}
                                            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 resize-none min-h-[100px]"
                                        />
                                        <div className="flex justify-end mt-2">
                                            <button
                                                onClick={handleAddComment}
                                                disabled={
                                                    !user ||
                                                    newComment.trim() === ""
                                                }
                                                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 text-black px-4 py-2 rounded-md font-medium transition-colors"
                                            >
                                                <Send size={16} />
                                                Post Comment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Comment List */}
                            <div className="space-y-6">
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="flex gap-4"
                                        >
                                            <div className="flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-yellow-600 dark:text-yellow-500 font-bold border border-yellow-400/30 dark:border-yellow-500/30">
                                                    {comment.username
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-yellow-600 dark:text-yellow-400">
                                                        {comment.username}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {comment.timestamp}
                                                    </span>
                                                </div>
                                                <p className="text-gray-800 dark:text-gray-300">
                                                    {comment.text}
                                                </p>
                                                <div className="flex gap-4 mt-2">
                                                    <button className="text-gray-600 dark:text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400 text-sm flex items-center gap-1">
                                                        <ThumbsUp />
                                                        Like
                                                    </button>
                                                    <button className="text-gray-600 dark:text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400 text-sm flex items-center gap-1">
                                                        <ThumbsDown />
                                                        Dislike
                                                    </button>
                                                    <button className="text-gray-600 dark:text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400 text-sm flex items-center gap-1">
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-600 dark:text-gray-400">
                                            No comments yet. Be the first to
                                            comment!
                                        </p>
                                    </div>
                                )}

                                {comments.length > 0 && (
                                    <div className="mt-8 flex justify-center">
                                        <button className="text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400 font-medium flex items-center gap-2">
                                            Show more comments
                                            <ChevronDown />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
