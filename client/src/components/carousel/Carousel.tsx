import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "swiper/swiper-bundle.css";

// Your component code here
const Carousel = () => {
  return (
    <div className="w-screen max-w-[calc(100vw-50px)] mx-auto h-80 md:h-[500px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full rounded-2xl shadow-lg"
      >
        {["image1.jpg", "image2.jpg", "image3.jpg"].map((image, index) => (
          <SwiperSlide key={index}>
            {/* <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-2xl"
            /> */}
            <div className="w-full h-full bg-gray-500 rounded-2xl">
              <h1>{index}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
