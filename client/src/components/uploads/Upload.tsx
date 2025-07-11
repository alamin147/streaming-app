import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload, ImageIcon, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUploadVideoMutation } from "@/redux/features/videos/videosApi";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

interface VideoUploadModalProps {
  isOpen: boolean;
  setIsOpens: (open: boolean) => void;
}

const CATEGORIES = [
  "movies",
  "documentaries",
  "tv shows",
  "web series",
  "short films",
  "educational",
  "music videos",
  "sports",
] as const;
const TAGS = [
  "action",
  "horror",
  "comedy",
  "drama",
  "thriller",
  "romance",
  "adventure",
  "sci-fi",
  "fantasy",
  "animation",
  "documentary",
  "crime",
  "mystery",
  "family",
] as const;

type Category = (typeof CATEGORIES)[number];
type Tag = (typeof TAGS)[number];

export default function VideoUploadModal({
  isOpen,
  setIsOpens,
}: VideoUploadModalProps) {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<string>("");
  const [videoDetails, setVideoDetails] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("movies");
  const [thumbnailProgress, setThumbnailProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);

  const thumbnail = watch("thumbnail");
  const videoFile = watch("video");

  // Handle file selection and video metadata extraction
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "thumbnail" | "video"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (type === "thumbnail" && !file.type.startsWith("image/")) {
      return toast.error("Please select a valid image file for thumbnail.");
    }
    if (type === "video" && !file.type.startsWith("video/")) {
      return toast.error("Please select a valid video file.");
    }
    if (type === "video" && file.size > 100 * 1024 * 1024) {
      // 100 MB limit
      return toast.error("Video file size exceeds 100 MB limit.");
    }
    if (type === "thumbnail" && file.size > 10 * 1024 * 1024) {
      // 10 MB limit
      return toast.error("Thumbnail file size exceeds 10 MB limit.");
    }
    // Set the file in the form state
    setValue(type, file);
    // Reset progress if changing files
    if (type === "thumbnail") {
      setThumbnailProgress(0);
    } else if (type === "video") {
      setVideoProgress(0);
      setVideoDuration("");
      setVideoDetails("");
    }

    if (file) {
      setValue(type, file);
      if (type === "video") {
        // If it's a video, calculate duration
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

      const parts = [];
      if (hours > 0) parts.push(`${hours}hr`);
      if (minutes > 0 || hours > 0) parts.push(`${minutes}min`);
      parts.push(`${seconds}sec`);
      const durationText = parts.join("");

      setVideoDuration(durationText);
      setVideoDetails(`${file.name} (${durationText})`);
      URL.revokeObjectURL(videoUrl);
    };

    video.onerror = () => {
      console.error("Error loading video metadata");
      URL.revokeObjectURL(videoUrl);
    };

    video.src = videoUrl;
  };

  const [uploadVideo] = useUploadVideoMutation();

  const onSubmit = async (data: any) => {
    if (!data.video || !data.thumbnail) {
      return toast.error("Video and thumbnail are required.");
    }
    if (data.video.size > 100 * 1024 * 1024) {
      // 100 MB limit
      return toast.error("Video file size exceeds 100 MB limit.");
    }
    if (data.thumbnail.size > 10 * 1024 * 1024) {
      // 10 MB limit
      return toast.error("Thumbnail file size exceeds 10 MB limit.");
    }

    try {
      setIsUploading(true);

      // Upload thumbnail to Cloudinary with progress tracking
      const imgUrl = await uploadToCloudinary(
        data.thumbnail,
        "image",
        (progress) => setThumbnailProgress(progress)
      );

      // Upload video to Cloudinary with progress tracking
      const videoUrl = await uploadToCloudinary(
        data.video,
        "video",
        (progress) => setVideoProgress(progress)
      );

      const metadata = {
        title: data.title,
        desc: data.desc,
        duration: videoDuration,
        category: selectedCategory,
        tags: selectedTags,
        imgUrl,
        videoUrl,
      };

      await uploadVideo(metadata).unwrap();

      toast.success(
        "Video uploaded successfully! It will be available after approval.",
        {
          duration: 4000,
        }
      );
      reset();
      setVideoDuration("");
      setVideoDetails("");
      setSelectedTags([]);
      setSelectedCategory("movies");
      setThumbnailProgress(0);
      setVideoProgress(0);
      setIsOpens(false);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Tag selection toggle function
  const handleTagToggle = (tag: Tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
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
      className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto py-4 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } transition-opacity duration-300`}
      onClick={() => setIsOpens(false)}
    >
      <div
        className="bg-background border border-gray-800/20 dark:border-gray-100/10 p-4 sm:p-6 rounded-lg shadow-2xl w-[calc(100%-2rem)] max-w-[525px] my-4 mx-auto relative transition-all duration-300"
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
            <Select
              value={selectedCategory}
              onValueChange={(value: Category) => setSelectedCategory(value)}
            >
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
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
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
              <Label htmlFor="thumbnail">Thumbnail (Max: 10mb)</Label>
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
                        <span className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md text-sm font-medium">
                          Change
                        </span>
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
              <Label htmlFor="video">Video File (Max: 100mb)</Label>
              <div className="relative h-32 border border-dashed rounded-md p-1 flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/30 transition-colors">
                {videoFile ? (
                  <div className="text-sm text-center">
                    <Film className="h-8 w-8 text-yellow-500 mb-2 mx-auto" />
                    <p className="text-xs font-medium mb-2 line-clamp-1">
                      {videoDetails}
                    </p>
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

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Thumbnail upload</span>
                  <span>{thumbnailProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${thumbnailProgress}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Video upload</span>
                  <span>{videoProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${videoProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Moderation notice */}
          <div className="p-3 rounded-md bg-blue-500/10 border border-blue-500/20 text-sm">
            <p className="text-blue-500">
              <span className="font-medium">Note:</span> Uploaded videos require
              admin approval before appearing publicly. You can view your
              video's status in the "My Videos" section.
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
