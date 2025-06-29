import { useGetWatchLaterVideosQuery } from "@/redux/features/videos/videosApi";
import Footer from "@/components/footer/Footer";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import VideosCards from "@/components/VideosCards/VideosCards";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar/Navbar";

const WatchLater = () => {
  const { data: watchlaterVideos, isLoading } =
    useGetWatchLaterVideosQuery(undefined);

  return (
    <SidebarProvider>
      <WatchLaterContent videos={watchlaterVideos} isLoading={isLoading} />
    </SidebarProvider>
  );
};

const VideoCardSkeleton = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="w-full h-40 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
};

const WatchLaterSkeleton = ({ open }: { open: boolean }) => {
  return (
    <div className="px-4 md:px-8">
      <div className="flex items-center py-4 mb-4">
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div
        className={`grid ${
          open
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
            : "grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        } gap-6`}
      >
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
      </div>
    </div>
  );
};

const WatchLaterContent = ({
  videos,
  isLoading,
}: {
  videos: any;
  isLoading: boolean;
}) => {
  const { open, setOpen, isMobile } = useSidebar();

  if (isMobile === true) {
    setOpen(false);
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <div className="min-h-screen">
          {isLoading ? (
            <WatchLaterSkeleton open={open} />
          ) : videos?.data?.videos?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-2xl font-semibold mb-2">
                Your Watch Later list is empty
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Save videos to watch later by clicking the clock icon
              </p>
            </div>
          ) : (
            <VideosCards title="Watch Later" open={open} Videos={videos} />
          )}
        </div>
        <Footer />
      </SidebarInset>
    </>
  );
};

export default WatchLater;
