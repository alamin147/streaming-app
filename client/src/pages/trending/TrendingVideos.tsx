import { useGetVideosQuery } from "@/redux/features/videos/videosApi";
import Footer from "@/components/footer/Footer";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import VideosCards from "@/components/VideosCards/VideosCards";
import { AppSidebar } from "@/components/app-sidebar";

import Navbar from "@/components/navbar/Navbar";

const TrendingVideos = () => {
  const { data: videos } = useGetVideosQuery(undefined);

  return (
    <SidebarProvider>
      <TrendingContent videos={videos} />
    </SidebarProvider>
  );
};

const TrendingContent = ({ videos }: { videos: any }) => {
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
          <VideosCards title="Trending" open={open} Videos={videos} />
        </div>
        <Footer />
      </SidebarInset>
    </>
  );
};

export default TrendingVideos;
