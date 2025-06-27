import { useSidebar } from "../ui/sidebar";
import Footer from "../footer/Footer";
import { useGetRecentVideosQuery, useGetVideosQuery, useGetWatchLaterVideosQuery } from "@/redux/features/videos/videosApi";
import VideosCards from "../VideosCards/VideosCards";
import Sliders from "./Sliders";
import PromotionalSection from "../promotionalSection/PromotionalSection";
import Pricing from "../pricing/Pricing";


const Carousel = () => {
  const { open, setOpen } = useSidebar();
  const { isMobile } = useSidebar();
  // Close sidebar for mobile
  if (isMobile === true) {
    setOpen(false);
  }

  const { data: videos } = useGetVideosQuery(undefined);
  const { data: recentvideos } = useGetRecentVideosQuery(undefined);
  const { data: watelaterVideos } = useGetWatchLaterVideosQuery(undefined);
  return (
    <>
    <Sliders videos={videos}/>

      <div>
        {/* trending */}
        <VideosCards  title="Trending" open={open} Videos={videos}/>
        {/* recent */}
        <VideosCards title="Recently Watched" open={open} Videos={recentvideos}/>
        {/* watch later */}
        <VideosCards title="Watch Later" open={open} Videos={watelaterVideos}/>

        <PromotionalSection />

        <Pricing />
        
        <Footer />
      </div>
    </>
  );
};

export default Carousel;
