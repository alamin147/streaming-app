import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleVideoQuery } from "@/redux/features/videos/videosApi";
import CommentSection from "@/components/commentSection/CommentSection";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import VideoPlayer from "./videoPlayer/VideoPlayers";
import Content from "./Content";

import Navbar from "@/components/navbar/Navbar";

export const SingleVideo = () => {
  const videoId: any = useParams();
  const { data: singleVideo, isLoading } = useGetSingleVideoQuery(videoId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const video = singleVideo?.data?.video || {};
  const { imgUrl = "", videoUrl = "", _id = "" } = video;

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <div className="">
            <div className="min-hscreen g-black text-gray-200">
              {/* Video Player */}
              <div className="w-full bg-gray-100 dark:bg-gray-900">
                <VideoPlayer
                  src={videoUrl}
                  poster={imgUrl}
                  //   title={title}
                  onPlay={() => console.log("Video started playing")}
                  onPause={() => console.log("Video paused")}
                  onTimeUpdate={(time) => console.log("Current time:", time)}
                />
              </div>
            </div>
            {/* Content below video */}
            <Content video={video} videoId={videoId} />

            {/* Comment Section */}
          </div>
          <CommentSection videoId={videoId} _id={_id} />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};
