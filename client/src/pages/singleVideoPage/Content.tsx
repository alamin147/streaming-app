import { Star } from "lucide-react";
import { BsFillBookmarkPlusFill, BsBookmarkCheckFill } from "react-icons/bs";
import RatingSection from "@/components/ratingSection/RatingSection";
import ReportVideoDialog from "@/components/reportVideoDialog/ReportVideoDialog";
import {
  useAddToWatchLaterMutation,
  useIsBookmarkedQuery,
} from "@/redux/features/videos/videosApi";
import toast from "react-hot-toast";
const Content = ({ video, videoId }: { video: any; videoId: string }) => {
  const [addToWatchLater] = useAddToWatchLaterMutation();
  const { data: isBookmarked, isLoading: bookmarkedLoad } =
    useIsBookmarkedQuery(videoId);

  const handleAddToWatchLater = async () => {
    const res = await addToWatchLater(videoId).unwrap();
    if (res?.status == 200)
      toast.success(res?.message ? res.message : "Video Added to watch later");
    else
      toast.success(
        res?.message ? res.message : "Video failed to add in watch later"
      );
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

  if (bookmarkedLoad) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="max-w-7xl p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Poster Image */}
          <div className="flex-shrink-0 w-full md:w-64 lg:w-72 md:h-auto">
            <div className="relative rounded-lg overflow-hidden w-full md:w-64 lg:w-72 h-[400px] md:h-full shadow-md">
              <img
                src={video?.imgUrl}
                alt={video?.title || "Video Poster"}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col gap-4 h-full">
              {/* Title and Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-gray-300">
                  {video?.title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-300">
                        Views:{" "}
                        <span className="text-yellow-600 dark:text-yellow-500">
                          {video?.views}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
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
                    <ReportVideoDialog videoId={video?._id} />
                  </div>
                </div>
              </div>
              <RatingSection
                category={video.category}
                videoId={video?._id}
                videoRating={video.ratings || 0}
                howManyRated={video.howManyRated || 0}
              />
              {/* Badges and Rating */}
              <div className="flex justify-between flex-wrap items-center gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                    HD
                  </span>
                  <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500">
                    <Star className="fill-yellow-600 dark:fill-yellow-500 h-5 w-5" />
                    <span className="font-medium">{video?.ratings}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {video?.videoDuration}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {video.tags && video.tags.length > 0 && (
                      <>
                        <span className=" text-gray-600 dark:text-gray-400 px-3 py-1  text-md font-medium">
                          Tags:
                        </span>
                        {video.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
                {video?.des}
              </p>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                <div className="flex">
                  <span className="w-28 text-gray-600 dark:text-gray-400">
                    Uploaded by:
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {video?.userId?.name || "Unknown"}
                  </span>
                </div>

                <div className="flex">
                  <span className="w-28 text-gray-600 dark:text-gray-400">
                    Released:
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {video?.createdAt?.split("T")[0] || "Unknown"}
                  </span>
                </div>

                <div className="flex col-span-1 md:col-span-2">
                  <span className="w-28 text-gray-600 dark:text-gray-400">
                    Production:
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    N Movies, Limited
                  </span>
                </div>
                <div className="flex col-span-1 md:col-span-2">
                  <span className="w-28 text-gray-600 dark:text-gray-400">
                    Casts:
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    Unknown
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
