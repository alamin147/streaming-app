import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaPlay, FaPlus } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { useSidebar } from "../ui/sidebar";
//  image array
const images = [
  "https://media.gettyimages.com/id/1445487185/photo/canadian-born-actor-keanu-reeves-walks-along-an-aisle-in-the-church-of-saint-eustache-in-a.jpg?s=612x612&w=0&k=20&c=rCJatqXjiKyzRRobjW7iuSZrYg7a7n0MbjRHw2NASZQ=",
  "https://media.gettyimages.com/id/517724758/photo/marlon-brando-as-don-vito-corleone-in-the-godfather-for-which-he-won-an-oscar-for-best-actor.jpg?s=612x612&w=0&k=20&c=AteFgnS-zJEp9DmlieoeCk-ECqOyXy82splFpVmoLA8=",
  "https://media.gettyimages.com/id/517475848/photo/scenes-from-the-movie-bonnie-and-clyde-with-warren-beatty-and-faye-dunaway-produced-by-warner.jpg?s=612x612&w=0&k=20&c=Jej6SNujxegbMJmE2ChJw9J3SazL0zlZdCOf6W1G5T0=",
  "https://media.gettyimages.com/id/515364544/photo/the-hand-of-a-phantom-threatens-a-woman-in-bed-in-this-scene-from-the-cat-and-the-canary-1927.jpg?s=612x612&w=0&k=20&c=08-ykLwmdSBv7JQE-Qhb-tfYWVJwxMverMfnlNlLUOg=",
  "https://media.gettyimages.com/id/50379490/photo/warriors-on-horses-in-movie-gladiator-being-filmed-at-bourne-wood.jpg?s=612x612&w=0&k=20&c=78DVB2IT8h-d0vb2y1obcvR9IM2Hi4jVUBqbXu1FtBU=",
];

const Sliders = () => {
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
          loop={true}
          pagination={{ clickable: true }}
          spaceBetween={10}
          className="h-full rounded-2xl shadow-lg "
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
                {/* Overlay with title, rating, year, tags, and buttons */}
                <div className=" absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-center gap-2">
                  <div className="-mt-0 md:-mt-20">
                    {/* Title */}
                    <div className="mb-3 md:mb-6">
                      <h2 className="text-2xl md:text-6xl font-semibold text-white mb-2 z-10">
                        Movie Title {index + 1}
                      </h2>
                    </div>
                    {/* Rating | Year | Age | Duration */}
                    <div className="text-sm md:text-lg flex items-center gap-2  text-white z-10 mb-2">
                      <span className="text-yellow-500">⭐ 8.5 |</span>
                      <span className="flex items-center gap-1">2021 |</span>
                      <span>12+ |</span>
                      <span>1.20 hr </span>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 text-xs md:text-sm z-10 mb-4">
                      <span className="bg-gray-500 text-white px-3 py-1 rounded-md">
                        Action
                      </span>
                      <span
                        className=" text-white px-3 py-1 rounded-md"
                        style={{
                          background:
                            "linear-gradient(8deg, rgba(91,91,91,1) 54%, rgba(83,83,83,1) 60%)",
                        }}
                      >
                        Thriller
                      </span>

                      <span className="bg-gray-500 text-white px-3 py-1 rounded-md">
                        DramaMovies
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 md:gap-8 mt-2 z-10 items-center">
                      <button className="px-2 md:px-4 py-2  bg-yellow-500 rounded-md hover:bg-yellow-400 flex font-semibold gap-1.5 text-black text-sm  md:text-lg">
                        <FaPlay className="mt-0.5 md:mt-1 " />
                        Watch Now
                      </button>

                      <button className="group hover:text-yellow-500 text-sm  md:text-lg flex items-center gap-2 text-white rounded-md ">
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
