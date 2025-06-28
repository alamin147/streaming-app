import { useMemo } from "react";
import { useSidebar } from "../ui/sidebar";
import Footer from "../footer/Footer";
import {
  useGetRecentVideosQuery,
  useGetVideosQuery,
  useGetWatchLaterVideosQuery,
} from "@/redux/features/videos/videosApi";
import VideosCards from "../VideosCards/VideosCards";
import Sliders from "./Sliders";
import PromotionalSection from "../promotionalSection/PromotionalSection";
import Pricing from "../pricing/Pricing";
import BlogSection from "../blog/Blog";
import NewsletterSection from "../newsletter/Newsletter";
import { recentVideos, topRated } from "@/utils/Utlis";
import { Skeleton } from "@/components/ui/skeleton";

const SliderSkeleton = () => (
  <div className="w-full overflow-hidden px-4 pt-4">
    <Skeleton className="h-[500px] w-full rounded-lg" />
  </div>
);

const VideoCardsSkeleton = ({ title }: { title: string }) => (
  <div className="my-8">
    <div className="flex items-center justify-between mb-4 px-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <Skeleton className="w-24 h-8" />
    </div>
    <div className="px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="border border-border rounded-lg overflow-hidden bg-card shadow-sm h-full"
            >
              <div className="relative">
                <Skeleton className="w-full h-0 pt-[56.25%]" />
                <div className="absolute bottom-2 right-2">
                  <Skeleton className="h-5 w-12 rounded" />
                </div>
              </div>
              {/* Card content */}
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex justify-between items-center mt-3">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

const PromotionalSectionSkeleton = () => (
  <div className="my-12 mx-4">
    <Skeleton className="h-[350px] w-full rounded-xl" />
  </div>
);

const PricingSkeleton = () => (
  <div className="my-12 mx-4">
    <div className="text-center mb-8">
      <Skeleton className="h-8 w-64 mx-auto mb-4" />
      <Skeleton className="h-4 w-full max-w-md mx-auto" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-[400px] rounded-xl" />
        ))}
    </div>
  </div>
);

const BlogSectionSkeleton = () => (
  <div className="my-12 mx-4">
    <div className="text-center mb-8">
      <Skeleton className="h-8 w-48 mx-auto" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-[350px] rounded-xl" />
        ))}
    </div>
  </div>
);

const NewsletterSectionSkeleton = () => (
  <div className="my-12 mx-4">
    <Skeleton className="h-[200px] w-full rounded-xl" />
  </div>
);

const Carousel = () => {
  const { open, setOpen } = useSidebar();
  const { isMobile } = useSidebar();
  if (isMobile === true) {
    setOpen(false);
  }

  const { data: videos, isLoading: videosLoading } =
    useGetVideosQuery(undefined);
  const { data: recentvideos, isLoading: recentVideosLoading } =
    useGetRecentVideosQuery(undefined);
  const { data: watelaterVideos, isLoading: watchLaterLoading } =
    useGetWatchLaterVideosQuery(undefined);

  const topRatedVideos = useMemo(() => {
    return topRated(videos?.data?.videos || []);
  }, [videos]);

  const recentlyAddedVideos = useMemo(() => {
    return recentVideos(videos?.data?.videos || []);
  }, [videos]);

  const isLoading = videosLoading || recentVideosLoading || watchLaterLoading;

  return (
    <>
      {isLoading ? <SliderSkeleton /> : <Sliders videos={videos} />}

      <div>
        {/* trending */}
        {isLoading ? (
          <VideoCardsSkeleton title="Trending" />
        ) : (
          <VideosCards title="Trending" open={open} Videos={videos} />
        )}

        {/* top rated */}
        {isLoading ? (
          <VideoCardsSkeleton title="Top Rated" />
        ) : (
          <VideosCards
            title="Top Rated"
            open={open}
            Videos={{ data: { videos: topRatedVideos } }}
          />
        )}

        {/* recently upload */}
        {isLoading ? (
          <VideoCardsSkeleton title="Recently Uploaded" />
        ) : (
          <VideosCards
            title="Recently Uploaded"
            open={open}
            Videos={{ data: { videos: recentlyAddedVideos } }}
          />
        )}

        {/* recently view by you */}
        {recentVideosLoading ? (
          <VideoCardsSkeleton title="Recently Watched by you" />
        ) : (
          <VideosCards
            title="Recently Watched by you"
            open={open}
            Videos={recentvideos}
          />
        )}

        {/* watch later */}
        {watchLaterLoading ? (
          <VideoCardsSkeleton title="Watch Later" />
        ) : (
          <VideosCards
            title="Watch Later"
            open={open}
            Videos={watelaterVideos}
          />
        )}

        {/* Promotional Section */}
        {isLoading ? <PromotionalSectionSkeleton /> : <PromotionalSection />}

        {/* Pricing Section */}
        {isLoading ? <PricingSkeleton /> : <Pricing />}

        {/* Blog Section */}
        {isLoading ? <BlogSectionSkeleton /> : <BlogSection />}

        {/* Newsletter Section */}
        {isLoading ? <NewsletterSectionSkeleton /> : <NewsletterSection />}

        {/* Footer - */}
        <Footer />
      </div>
    </>
  );
};

export default Carousel;
