import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload, ImageIcon, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUploadVideoMutation } from "@/redux/features/videos/videosApi";
import toast from "react-hot-toast";

interface VideoUploadModalProps {
    isOpen: boolean;
    setIsOpens: (open: boolean) => void;
}

const CATEGORIES = ["movies", "documentaries", "tv shows", "web series", "short films", "educational", "music videos", "sports"] as const;
const TAGS = ["action", "horror", "comedy", "drama", "thriller", "romance", "adventure", "sci-fi", "fantasy", "animation", "documentary", "crime", "mystery", "family"] as const;

type Category = typeof CATEGORIES[number];
type Tag = typeof TAGS[number];

export default function VideoUploadModal({ isOpen, setIsOpens }: VideoUploadModalProps) {
    const { register, handleSubmit, setValue, watch, reset } = useForm();
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [videoDuration, setVideoDuration] = useState<string>("");
    const [videoDetails, setVideoDetails] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>("movies");

    const thumbnail = watch("thumbnail");
    const videoFile = watch("video");

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        type: "thumbnail" | "video"
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setValue(type, file);
            if (type === "video") {
                calculateVideoDuration(file);
            }
        }
    };

    const calculateVideoDuration = (file: File) => {
        const videoUrl = URL.createObjectURL(file);
        const video = document.createElement("video");

        video.onloadedmetadata = () => {
            const duration = video.duration;
            const hours = Math.floor(duration / 3600);
            const minutes = Math.floor((duration % 3600) / 60);
            const seconds = Math.floor(duration % 60);

            let durationText = "";
            const parts = [];

            if (hours > 0) parts.push(`${hours}hr`);
            if (minutes > 0 || hours > 0) parts.push(`${minutes}min`);
            parts.push(`${seconds}sec`);

            durationText = parts.join('');
            setVideoDuration(durationText);

            setVideoDetails(`${file.name} (${durationText})`);
            URL.revokeObjectURL(videoUrl);
        };

        video.src = videoUrl;
        video.onerror = () => {
            console.error("Error loading video metadata");
            URL.revokeObjectURL(videoUrl);
        };
    };

    const [uploadVideo] = useUploadVideoMutation();

    const onSubmit = async (data: any) => {
        if (!data.video) return toast.error("Please select a video file.");

        if (data.video.size > 100 * 1024 * 1024) {
            const size = Number(data.video.size);
            toast.error(
                `Video must be under 100MB. Your video size is: ${(
                    size /
                    (1024 * 1024)
                ).toFixed(2)}MB`
            );
            return;
        }

        const formData = new FormData();
        if (data.title) formData.append("title", data.title);
        if (data.desc) formData.append("desc", data.desc);
        if (data.thumbnail) formData.append("thumbnail", data.thumbnail);
        if (data.video) formData.append("video", data.video);
        formData.append("duration", videoDuration);
        formData.append("category", selectedCategory);
        formData.append("tags", JSON.stringify(selectedTags));

        try {
            setIsUploading(true);
            await uploadVideo(formData).unwrap();
            toast.success("Video uploaded successfully! It will be available after approval.");
            reset();
            setVideoDuration("");
            setVideoDetails("");
            setSelectedTags([]);
            setSelectedCategory("movies");
            setIsOpens(false);
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleTagToggle = (tag: Tag) => {
        setSelectedTags(prev => {
            if (prev.includes(tag)) {
                return prev.filter(t => t !== tag);
            }
            if (prev.length >= 5) {
                toast.error("You can select up to 5 tags only");
                return prev;
            }
            return [...prev, tag];
        });
    };

    return (
        <div
            className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 ${
                isOpen ? "visible opacity-100" : "invisible opacity-0"
            } transition-opacity duration-300`}
            onClick={() => setIsOpens(false)}
        >
            <div
                className="bg-background border border-gray-800/20 dark:border-gray-100/10 p-6 rounded-lg shadow-2xl w-full max-w-[525px] relative transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute right-4 top-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100"
                        onClick={() => setIsOpens(false)}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                <div className="space-y-1.5 text-center sm:text-left mb-6">
                    <h2 className="text-lg font-semibold leading-none tracking-tight">
                        Upload Your Video
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Fill in the details and upload your video
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Enter video title"
                            {...register("title", { required: true })}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="desc">Description</Label>
                        <Textarea
                            id="desc"
                            placeholder="Describe your video"
                            className="resize-none min-h-[80px]"
                            {...register("desc")}
                        />
                    </div>

                    {/* Category Selection */}
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={selectedCategory} onValueChange={(value: Category) => setSelectedCategory(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {CATEGORIES.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tags Selection */}
                    <div className="grid gap-2">
                        <Label>Tags (select up to 5)</Label>
                        <div className="flex flex-wrap gap-2">
                            {TAGS.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => handleTagToggle(tag)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                        selectedTags.includes(tag)
                                            ? 'bg-yellow-500 text-black'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Thumbnail Upload */}
                        <div className="grid gap-2">
                            <Label htmlFor="thumbnail">Thumbnail</Label>
                            <div className="relative h-32 border border-dashed rounded-md p-1 flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/30 transition-colors">
                                {thumbnail ? (
                                    <>
                                        <img
                                            src={URL.createObjectURL(thumbnail)}
                                            alt="Thumbnail preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md">
                                            <label className="cursor-pointer">
                                                <span className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md text-sm font-medium">Change</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleFileChange(e, "thumbnail")}
                                                />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                                        <label className="cursor-pointer">
                                            <span className="inline-flex items-center px-4 py-2 bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 rounded-md text-sm font-medium">
                                                Choose Image
                                            </span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleFileChange(e, "thumbnail")}
                                            />
                                        </label>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Video Upload */}
                        <div className="grid gap-2">
                            <Label htmlFor="video">Video File</Label>
                            <div className="relative h-32 border border-dashed rounded-md p-1 flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/30 transition-colors">
                                {videoFile ? (
                                    <>
                                        <div className="text-sm text-center">
                                            <Film className="h-8 w-8 text-yellow-500 mb-2 mx-auto" />
                                            <p className="text-xs font-medium mb-2 line-clamp-1">{videoDetails}</p>
                                            <label className="cursor-pointer">
                                                <span className="inline-flex items-center px-4 py-2 bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 rounded-md text-sm font-medium">
                                                    Change Video
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    className="hidden"
                                                    onChange={(e) => handleFileChange(e, "video")}
                                                />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Film className="h-10 w-10 text-muted-foreground mb-2" />
                                        <label className="cursor-pointer">
                                            <span className="inline-flex items-center px-4 py-2 bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 rounded-md text-sm font-medium">
                                                Choose Video
                                            </span>
                                            <input
                                                type="file"
                                                accept="video/*"
                                                className="hidden"
                                                onChange={(e) => handleFileChange(e, "video")}
                                            />
                                        </label>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Moderation notice */}
                    <div className="p-3 rounded-md bg-blue-500/10 border border-blue-500/20 text-sm">
                        <p className="text-blue-500">
                            <span className="font-medium">Note:</span> Uploaded videos require admin approval before appearing publicly.
                            You can view your video's status in the "My Videos" section.
                        </p>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 mt-2 border-t border-gray-800/20 dark:border-gray-100/10">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpens(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isUploading}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black transition-colors"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            {isUploading ? "Uploading..." : "Upload Video"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
