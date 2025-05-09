import { useState } from "react";
import { Star } from "lucide-react";
import { useAddRatingMutation } from "@/redux/features/videos/commentRatingApis";
import { getUserInfo } from "@/redux/authUlits";
import toast from "react-hot-toast";

interface RatingSectionProps {
  videoId: string;
  videoRating: number;
  howManyRated: number;
  className?: string;
}

const RatingSection = ({ videoId, videoRating, howManyRated, className = "" }: RatingSectionProps) => {
  const user = getUserInfo();
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [addRating] = useAddRatingMutation();

  const handleRateVideo = async (selectedRating: number) => {
    if (!user) {
      toast.error("Please login to rate this video");
      return;
    }

    try {
      const response = await addRating({
        videoId,
        rating: selectedRating,
      }).unwrap();

      if(response?.status==200)
      {
        setRating(selectedRating);
        toast.success("Rating submitted successfully!");
      }
      else
      {
          toast.error("Failed to submit rating");
      }

    } catch (error) {
      toast.error("Failed to submit rating");
    }
  };

  return (
    <div className={`flex justify-end ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium mr-2">
        Score:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRateVideo(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(null)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                (hoveredRating !== null
                  ? star <= hoveredRating
                  : rating !== null && star <= rating) ||
                (hoveredRating === null &&
                  rating === null &&
                  star <= (videoRating || 0))
                  ? "fill-yellow-500 text-yellow-500"
                  : "fill-none text-gray-400"
              }`}
            />
          </button>
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {videoRating
            ? `(${videoRating.toFixed(1)}${howManyRated ? ` • ${howManyRated} ${howManyRated === 1 ? 'rating' : 'ratings'}` : ''})`
            : "(0)"}
        </span>
      </div>
    </div>
  );
};

export default RatingSection;
