import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload, ImageIcon, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useUploadVideoMutation } from "@/redux/features/videos/videosApi";
import toast from "react-hot-toast";

interface VideoUploadModalProps {
  isOpen: boolean;
  setIsOpens: (open: boolean) => void;
}

export default function VideoUploadModal({
  isOpen,
  setIsOpens,
}: VideoUploadModalProps) {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Watching form fields
  const thumbnail = watch("thumbnail");
  const videoFile = watch("video");

  // Handle file selection
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "thumbnail" | "video"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(type, file);
    }
  };

  const [uploadVideo] = useUploadVideoMutation();
  const onSubmit = async (data: any) => {
    if (!data.video) return alert("Please select a video file.");
    11929445
    11534336
    if(data.video.size>(100*1024*1024))
    {
      let size=Number(data.video.size);
      toast.error(`Video must be under 100MB. Your video size is: ${(size/(1024*1024)).toFixed(2)}MB`)
      return;
    }
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.desc) formData.append("desc", data.desc);
    if (data.thumbnail) formData.append("thumbnail", data.thumbnail);
    if (data.video) formData.append("video", data.video);

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const response = await uploadVideo(formData).unwrap();

      console.log(response);
      alert("Video uploaded successfully!");
      reset();
      setIsOpens(false);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } transition-opacity duration-300`}
      onClick={() => setIsOpens(false)}
    >
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-md relative transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          onClick={() => setIsOpens(false)}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Upload Your Video
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <Input
              type="text"
              placeholder="Enter video title"
              {...register("title", { required: true })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <Textarea placeholder="Describe your video" {...register("desc")} />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Thumbnail
            </label>
            <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center">
              {thumbnail ? (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="Thumbnail preview"
                  className="w-full h-40 object-cover rounded-md"
                />
              ) : (
                <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
              )}
              <label className="mt-2 inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg cursor-pointer transition-colors">
                <span>Browse files</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "thumbnail")}
                />
              </label>
            </div>
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Video File
            </label>
            <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center">
              {videoFile ? (
                <div className="text-sm text-center">
                  <Film className="w-10 h-10 text-yellow-500 mb-2" />
                  <p>{videoFile.name}</p>
                </div>
              ) : (
                <Film className="w-10 h-10 text-gray-400 mb-2" />
              )}
              <label className="mt-2 inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg cursor-pointer transition-colors">
                <span>Browse files</span>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "video")}
                />
              </label>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-4">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-center mt-1">
                {uploadProgress}% Uploaded
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
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
              className="bg-yellow-500 hover:bg-yellow-400 text-black transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
