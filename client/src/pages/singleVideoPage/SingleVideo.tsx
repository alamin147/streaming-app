"use client";

import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

export default function AnimeDetails() {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="min-h-screen bg-black text-gray-200">
        {/* Video Player at the top */}
        <div className="w-full bg-gray-900">
          <div className="relative w-full aspect-video max-h-[80vh]">
            <video
              controls
              className="w-full h-full object-contain"
              poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EoVij8S0D6aQXr1BDZYqvVOt7TFcQW.png"
              src="https://res.cloudinary.com/dgwqvyfnk/video/upload/v1743326613/9999999999999999_2025-03-30T09-23-06-694Z.mp4"
            ></video>
          </div>
        </div>

        {/* Content below video */}
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Poster Image */}
            <div className="flex-shrink-0 w-full md:w-64 lg:w-72 md:h-auto">
              <div className="relative rounded-lg overflow-hidden w-full md:w-64 lg:w-72 h-[400px] md:h-full">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EoVij8S0D6aQXr1BDZYqvVOt7TFcQW.png"
                  alt="Blue Box Poster"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <div className="flex flex-col gap-4 h-full">
                {/* Title and Rating */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-300">
                    Blue Box
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl md:text-2xl font-bold text-gray-300">
                        Score: <span className="text-yellow-500">0.0</span>
                      </span>
                      <span className="text-sm text-gray-400">/ 0 rated</span>
                    </div>
                  </div>
                </div>

                {/* Badges and Rating */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    HD
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="fill-yellow-500 h-5 w-5" />
                    <span className="font-medium">7.8</span>
                  </div>
                  <span className="text-gray-400">24 min</span>
                </div>

                {/* Like/Dislike Buttons */}
                <div className="flex gap-2 my-2">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                      liked
                        ? "bg-yellow-500 text-black border-yellow-500"
                        : "border-gray-600 hover:bg-gray-800"
                    }`}
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <span>Like</span>
                  </button>
                  <button
                    onClick={handleDislike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                      disliked
                        ? "bg-gray-200 text-black border-gray-200"
                        : "border-gray-600 hover:bg-gray-800"
                    }`}
                  >
                    <ThumbsDown className="h-5 w-5" />
                    <span>Dislike</span>
                  </button>
                </div>

                {/* Synopsis */}
                <p className="text-gray-300 text-base md:text-lg">
                  Badminton player Taiki has always admired basketball star
                  Chinatsu from afar. But one spring day, a surprising turn
                  brings them unexpectedly close.
                </p>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                  <div className="flex">
                    <span className="w-28 text-gray-400">Country:</span>
                    <span className="text-gray-200">Japan</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-gray-400">Genre:</span>
                    <span className="text-gray-200">
                      Animation, Comedy, Drama
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-gray-400">Released:</span>
                    <span className="text-gray-200">2024-10-03</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-gray-400">Production:</span>
                    <span className="text-gray-200">
                      Telecom Animation Film, UNLIMITED PRODUCE by TMS, TMS
                      Music
                    </span>
                  </div>
                  <div className="flex col-span-1 md:col-span-2">
                    <span className="w-28 text-gray-400">Casts:</span>
                    <span className="text-gray-200">
                      Chiaki Kobayashi, Reina Ueda, Yuuma Uchida, Shoya Chiba,
                      Shogo Sakata
                    </span>
                  </div>
                  <div className="flex col-span-1 md:col-span-2">
                    <span className="w-28 text-gray-400">Tags:</span>
                    <span className="text-gray-200">
                      Watch Blue Box Online Free, Blue Box Online Free, Where to
                      watch Blue Box, Blue Box movie free online, Blue Box free
                      online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
