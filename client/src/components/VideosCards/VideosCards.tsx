import Cards from "../cards/Cards";

const VideosCards = ({ title, open, Videos }: any) => {
  const videos = Videos?.data?.videos || [];

  return (
    <div className="py-8 px-4 md:px-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4">
        {videos.map((video: any) => {
          const videoData = video.videoId || video;
          return (
            <Cards
              key={videoData._id}
              _id={videoData._id}
              title={videoData.title}
              imgUrl={videoData.imgUrl}
              duration={videoData.duration}
              createdAt={videoData.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VideosCards;
