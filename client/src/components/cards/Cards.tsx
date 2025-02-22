import { Dot } from "lucide-react";
import { FaPlay } from "react-icons/fa";

const Cards = () => {
  return (
    <div className="w-44 text-white shadow-lg relative group">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src="https://f.woowoowoowoo.net/resize/250x400/cf/12/cf1215815170205721c745448400c61b/cf1215815170205721c745448400c61b.jpg"
          alt="Mufasa: The Lion King"
          className="rounded-t-lg transition-transform duration-300 group-hover:scale-110"
        />
        <span className="absolute top-2 right-2 bg-white text-black text-xs px-1 rounded">
          HD
        </span>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="cursor-pointer bg-yellow-500 rounded-full p-5 flex items-center justify-center">
            <FaPlay className="text-white text-2xl " />
          </div>
        </div>
      </div>
      <h2 className="mt-3 text-base font-bold">Mufasa: The Lion King</h2>
      <div className="mt-2 flex justify-between text-sm text-gray-400">
        <div className="flex items-center">
          <span>2024</span>
          <Dot />
          <span>118m</span>
        </div>
        <div>
          <span className="border border-gray-500 text-xs px-2 py-0.5 rounded">
            Movie
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
