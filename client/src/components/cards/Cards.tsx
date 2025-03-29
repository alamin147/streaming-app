import { Dot } from "lucide-react";
import { FaPlay } from "react-icons/fa";

const Cards = ({ title, imgUrl }: { title: string; imgUrl: string }) => {
  return (
    <div className="max-w-36 sm:max-w-48 text-black dark:text-white relative group">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={imgUrl}
          alt={title}
          className="rounded-t-lg transition-transform duration-300 group-hover:scale-110"
        />
        <span className="absolute top-2 right-2 bg-white text-black font-semibold text-xs px-1 rounded">
          HD
        </span>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="cursor-pointer bg-yellow-500 rounded-full p-3 sm:p-5 flex items-center justify-center">
            <FaPlay className="text-white text-xl sm:text-2xl" />
          </div>
        </div>
      </div>
      <h2 className="mt-2 sm:mt-3 text-sm sm:text-base font-bold">{title}</h2>
      <div className="mt-1 sm:mt-2 flex flex-wrap justify-between text-xs sm:text-sm text-gray-400">
        <div className="flex items-center">
          <span>2024</span>
          <Dot />
          <span>118m</span>
        </div>
        <div>
          <span className="border border-gray-500 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded">
            Movie
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
