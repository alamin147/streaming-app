import { useRef, useState } from "react";
import {
    useAddCommentMutation,
    useGetCommentsQuery,
} from "@/redux/features/videos/commentRatingApis";
import toast from "react-hot-toast";
import {
    MessageCircle,
    User,
    Send,
    ThumbsUp,
    ThumbsDown,
    ChevronDown,
} from "lucide-react";
import { getUserInfo } from "@/redux/authUlits";
import { format } from "timeago.js";

const CommentSection = ({ videoId, _id }: { videoId: string; _id: string }) => {
    const user = getUserInfo();

    const [newComment, setNewComment] = useState("");
    const [addComment] = useAddCommentMutation();
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const { data: comments, isLoading: commentLoading } =
        useGetCommentsQuery(videoId);
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

    // Create a comments section loading spinner
    const LoadingSpinner = () => (
        <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Loading comments...
                </p>
            </div>
        </div>
    );

    return (
        <>
            <div className="py-8 px-4 md:px-8 dark:bg-black bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="mt-8 bg-gray-100 dark:bg-gray-900 rounded-lg p-6 shadow-md">
                        <div className="flex items-center gap-2 mb-6">
                            <MessageCircle className="text-yellow-600 dark:text-yellow-400" />
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                Comments
                                {!commentLoading &&
                                    `: ${comments?.data?.comments?.length || 0}`}
                            </h2>
                        </div>

                        {/* Add Comment */}
                        <div className="mb-8">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    {user ? (
                                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-yellow-600 dark:text-yellow-500 font-bold border border-yellow-400/30 dark:border-yellow-500/30">
                                            {user.name.charAt(0).toUpperCase()}
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
                        {commentLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <div className="space-y-6">
                                {comments?.data?.comments?.length > 0 ? (
                                    comments?.data?.comments?.map(
                                        (comment: any) => (
                                            <div
                                                key={comment._id}
                                                className="flex gap-4"
                                            >
                                                <div className="flex-shrink-0">
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-yellow-600 dark:text-yellow-500 font-bold border border-yellow-400/30 dark:border-yellow-500/30">
                                                        {comment?.userId?.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-medium text-yellow-600 dark:text-yellow-400">
                                                            {
                                                                comment?.userId
                                                                    ?.name
                                                            }
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {format(
                                                                comment?.createdAt
                                                            )}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-800 dark:text-gray-300">
                                                        {comment?.des}
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
                                        )
                                    )
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-600 dark:text-gray-400">
                                            No comments yet. Be the first to
                                            comment!
                                        </p>
                                    </div>
                                )}

                                {comments?.length > 0 && (
                                    <div className="mt-8 flex justify-center">
                                        <button className="text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400 font-medium flex items-center gap-2">
                                            Show more comments
                                            <ChevronDown />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentSection;
