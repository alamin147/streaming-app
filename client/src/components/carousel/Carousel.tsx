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

const Carousel = () => {
  const { open, setOpen } = useSidebar();
  const { isMobile } = useSidebar();
  if (isMobile === true) {
    setOpen(false);
  }

  const { data: videos } = useGetVideosQuery(undefined);
  const { data: recentvideos } = useGetRecentVideosQuery(undefined);
  const { data: watelaterVideos } = useGetWatchLaterVideosQuery(undefined);

  const topRatedVideos = useMemo(() => {
    return topRated(videos?.data?.videos || []);
  }, [videos]);

  const recentlyAddedVideos = useMemo(() => {
    return recentVideos(videos?.data?.videos || []);
  }, [videos]);

  return (
    <>
      <Sliders videos={videos} />

      <div>
        {/* trending */}
        <VideosCards title="Trending" open={open} Videos={videos} />
        {/* top rated */}
        <VideosCards
          title="Top Rated"
          open={open}
          Videos={{ data: { videos: topRatedVideos } }}
        />
        {/* recently upload */}
        <VideosCards
          title="Recently Uploaded"
          open={open}
          Videos={{ data: { videos: recentlyAddedVideos } }}
        />
        {/* recently view by you */}
        <VideosCards
          title="Recently Watched by you"
          open={open}
          Videos={recentvideos}
        />
        {/* watch later */}
        <VideosCards title="Watch Later" open={open} Videos={watelaterVideos} />
        {/* Promotional Section */}
        <PromotionalSection />
        {/* Pricing Section */}
        <Pricing />
        {/* Blog Section */}
        <BlogSection />
        {/* Newsletter Section */}
        <NewsletterSection />
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Carousel;
