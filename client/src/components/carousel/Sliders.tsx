import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaPlay, FaPlus } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { useSidebar } from "../ui/sidebar";
import { Link } from "react-router-dom";


const Sliders = ({videos}:{videos:any}) => {
const video = videos?.data?.videos || [];
    const { open, setOpen } = useSidebar();
  const { isMobile } = useSidebar();
  // Close sidebar for mobile
  if (isMobile === true) {
    setOpen(false);
  }

  return (
   <div
        className={`w-screen ${
          open === true
            ? "max-w-[calc(100vw-300px)]"
            : "max-w-[calc(100vw-50px)]"
        } mx-auto h-80 md:h-[700px] overflow-hidden`}
      >
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={video?.length > 1}
          pagination={{ clickable: true }}
          spaceBetween={10}
          className="h-full rounded-2xl shadow-lg "
        >
          {video?.map((vid:any, index:number) => (
            <SwiperSlide key={vid?._id || index}>
              <div className="relative w-full h-full">
                <img
                  src={vid?.imgUrl}
                  alt={vid?.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
                {/* Overlay with title, rating, year, tags, and buttons */}
                <div className=" absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-center gap-2">
                  <div className="-mt-0 md:-mt-20">
                    {/* Title */}
                    <div className="mb-3 md:mb-6">
                      <h2 className="text-2xl md:text-6xl font-semibold text-white mb-2 z-10">
                        {vid.title}
                      </h2>
                    </div>
                    {/* Rating | Year | Age | Duration */}
                    <div className="text-sm md:text-lg flex items-center gap-2  text-white z-10 mb-2">
                      <span className="text-yellow-500">⭐ {vid.ratings} |</span>
                      <span className="flex items-center gap-1">
                        {new Date(vid.createdAt).getFullYear()} |
                      </span>
                      <span>{vid?.category?.charAt(0).toUpperCase() + vid?.category.slice(1)} |</span>
                      <span>{vid.duration}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 text-xs md:text-sm z-10 mb-4">
                      {vid?.tags && vid.tags.map((tag:any, i:number) => (
                        <span
                          key={i}
                          className={`${i % 2 === 0 ? 'bg-gray-500' : ''} text-white px-3 py-1 rounded-md`}
                          style={i % 2 !== 0 ? {
                            background: "linear-gradient(8deg, rgba(91,91,91,1) 54%, rgba(83,83,83,1) 60%)"
                          } : {}}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <div className="hidden md:block text-white text-sm mb-4 max-w-2xl line-clamp-2">
                      {vid.des}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 md:gap-8 mt-2 z-10 items-center">
                      <Link to={`/video/${vid._id}`}>
                      <button
                        className="px-2 md:px-4 py-2 bg-yellow-500 rounded-md hover:bg-yellow-400 flex font-semibold gap-1.5 text-black text-sm md:text-lg"
                      >
                        <FaPlay className="mt-0.5 md:mt-1 " />
                        Watch Now
                      </button>
                      </Link>

                      <button className="group hover:text-yellow-500 text-sm md:text-lg flex items-center gap-2 text-white rounded-md ">
                        <FaPlus /> Watchlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

  )
}

export default Sliders
