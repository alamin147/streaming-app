import Cards from "../cards/Cards"

const VideosCards = ({title,open,Videos}:{title:string,open:boolean, Videos:any}) => {
  return (
    <>
     <div
          className={`w-screen ${
            open === true
              ? "max-w-[calc(100vw-300px)]"
              : "max-w-[calc(100vw-50px)]"
          } mx-auto mt-7`}
        >
          {(Videos?.data.videos.length>0)&&<h1 className="text-black dark:text-white text-lg md:text-2xl mb-2 ">
            <span className="me-1.5 border-l-8 border-yellow-500"></span>
            <span>{title}</span>
          </h1>}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4">
            {Videos?.data.videos.map((movie: any) => (
              <div key={movie._id}>
                {title=="Trending"?
                 <Cards _id={movie._id} title={movie.title} imgUrl={movie.imgUrl} />:

                <Cards _id={movie.videoId._id} title={movie.videoId.title} imgUrl={movie.videoId.imgUrl} />
            }
              </div>
            ))}
          </div>
        </div>
    </>
  )
}

export default VideosCards
