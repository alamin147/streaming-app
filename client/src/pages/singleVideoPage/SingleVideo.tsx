import { useState, useRef, useEffect } from "react";
import { Star, Play } from "lucide-react";
import { BsFillBookmarkPlusFill, BsBookmarkCheckFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import Hls from "hls.js";
import screenfull from "screenfull";
import {
    useAddToWatchLaterMutation,
    useGetSingleVideoQuery,
    useIsBookmarkedQuery,
    useUploadRecentVideosMutation,
    useRecordVideoViewMutation,
} from "@/redux/features/videos/videosApi";
import toast from "react-hot-toast";
import CommentSection from "@/components/commentSection/CommentSection";
import RatingSection from "@/components/ratingSection/RatingSection";
import ReportVideoDialog from "@/components/reportVideoDialog/ReportVideoDialog";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { UserAndTheme } from "@/lib/UserAndTheme";

export const SingleVideo = () => {
    const videoId: any = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [called, setCalled] = useState(true);
    const [uploadRecentVideos] = useUploadRecentVideosMutation();
    const [addToWatchLater] = useAddToWatchLaterMutation();
    const { data: singleVideo, isLoading } = useGetSingleVideoQuery(videoId);
    const { data: isBookmarked, isLoading: bookmarkedLoad } =
        useIsBookmarkedQuery(videoId);
    const [viewCounted, setViewCounted] = useState(false);
    const [watchTimer, setWatchTimer] = useState<NodeJS.Timeout | null>(null);
    const [recordVideoView] = useRecordVideoViewMutation();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const video = singleVideo?.data?.video || {};
    const {
        title = "",
        imgUrl = "",
        des = "",
        videoUrl = "",
        views = 0,
        _id = "",
        createdAt = "",
        ratings = 0,
    } = video;
    useEffect(() => {
        if (videoRef.current && videoUrl) {
            if (videoUrl.includes(".m3u8") && Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoUrl);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    if (videoRef.current) {
                        videoRef.current.addEventListener(
                            "play",
                            handleVideoStateChange
                        );
                        videoRef.current.addEventListener(
                            "pause",
                            handleVideoStateChange
                        );
                    }
                });
            } else {
                videoRef.current.src = videoUrl;
            }
        }
    }, [videoUrl]);

    useEffect(() => {
        const viewedVideos = JSON.parse(localStorage.getItem('viewedVideos') || '{}');
        if (videoId && videoId.id && viewedVideos[videoId.id]) {
            setViewCounted(true);
        }
    }, [videoId]);

    const handlePlayClick = async () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);

            if (called) {
                await uploadRecentVideos(videoId);
                setCalled(false);
            }

            if (!viewCounted) {
                if (watchTimer) {
                    clearTimeout(watchTimer);
                }

                const timer = setTimeout(async () => {
                    try {
                        await recordVideoView(videoId.id);

                        const viewedVideos = JSON.parse(localStorage.getItem('viewedVideos') || '{}');
                        viewedVideos[videoId.id] = Date.now();
                        localStorage.setItem('viewedVideos', JSON.stringify(viewedVideos));

                        setViewCounted(true);
                    } catch (error) {
                        console.error("Failed to record view", error);
                    }
                }, 10000);

                setWatchTimer(timer);
            }
        }
    };

    const handleVideoStateChange = () => {
        if (videoRef.current) {
            const isCurrentlyPlaying = !videoRef.current.paused;
            setIsPlaying(isCurrentlyPlaying);

            if (!isCurrentlyPlaying && watchTimer) {
                clearTimeout(watchTimer);
                setWatchTimer(null);
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setIsMuted(newVolume === 0);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seekTime = parseFloat(e.target.value);
        setCurrentTime(seekTime);
        if (videoRef.current) {
            videoRef.current.currentTime = seekTime;
        }
    };

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };

    useEffect(() => {
        return () => {
            if (watchTimer) {
                clearTimeout(watchTimer);
            }
        };
    }, [watchTimer]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (screenfull.isEnabled) {
                setIsFullscreen(screenfull.isFullscreen);

                if (screenfull.isFullscreen && window.screen.orientation) {
                    try {
                        if (window.innerWidth < 768) {
                            (window.screen.orientation as any)?.lock('landscape').catch(() => {
                                console.log('Orientation lock not supported');
                            });
                        }
                    } catch (e) {
                        console.error('Failed to lock orientation', e);
                    }
                }
            }
        };

        if (screenfull.isEnabled) {
            screenfull.on('change', handleFullscreenChange);
        }

        const fullscreenChangeEvents = [
            'fullscreenchange',
            'webkitfullscreenchange',
            'mozfullscreenchange',
            'MSFullscreenChange'
        ];

        fullscreenChangeEvents.forEach(eventName => {
            document.addEventListener(eventName, handleFullscreenChange);
        });

        return () => {
            if (screenfull.isEnabled) {
                screenfull.off('change', handleFullscreenChange);
            }

            fullscreenChangeEvents.forEach(eventName => {
                document.removeEventListener(eventName, handleFullscreenChange);
            });
        };
    }, []);

    const toggleFullscreen = () => {
        if (containerRef.current && screenfull.isEnabled) {
            screenfull.toggle(containerRef.current);
        }
    };

    const LoadingSpinner = () => (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-medium text-gray-200">
                    Loading video...
                </p>
            </div>
        </div>
    );

    if (isLoading || bookmarkedLoad) {
        return <LoadingSpinner />;
    }

    const handleAddToWatchLater = async () => {
        const res = await addToWatchLater(videoId).unwrap();
        if (res?.status == 200)
            toast.success(
                res?.message ? res.message : "Video Added to watch later"
            );
        else
            toast.success(
                res?.message
                    ? res.message
                    : "Video failed to add in watch later"
            );
    };

    return (
        <>
         <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
     <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800/10 dark:border-gray-100/10 pe-4 justify-between">
                        <div className="flex items-center gap-2 px-4">
                            {<SidebarTrigger className=" flex md:hidden -ml-1" />}
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="/">
                                            <span className="text-yellow-500 font-bold">
                                                N
                                            </span>
                                            Movies
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Video</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                     <UserAndTheme on={true}/>
                    </header>
            <div className="py-8 px-4 md:px-8">
                <div className="min-hscreen bg-black text-gray-200">
                    {/* Video Player */}
                    <div className="w-full bg-gray-100 dark:bg-gray-900">
                            <div ref={containerRef} className="relative w-full aspect-video max-h-[80vh] video-container">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-contain"
                                poster={imgUrl}
                                onPlay={handleVideoStateChange}
                                onPause={handleVideoStateChange}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onVolumeChange={() => {
                                    if (videoRef.current) {
                                        setIsMuted(videoRef.current.muted);
                                        setVolume(videoRef.current.muted ? 0 : videoRef.current.volume);
                                    }
                                }}
                                playsInline
                                controls={false}
                            ></video>

                            {/* Fully custom controls */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 p-2 flex flex-col">
                                {/* Progress bar */}
                                <div className="w-full flex items-center gap-2 mb-1">
                                    <span className="text-white text-xs">{formatTime(currentTime)}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration || 100}
                                        value={currentTime}
                                        onChange={handleSeek}
                                        className="flex-grow h-1 bg-gray-500 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500"
                                    />
                                    <span className="text-white text-xs">{formatTime(duration)}</span>
                                </div>

                                {/* Controls row */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={togglePlay}
                                            className="text-white p-1.5"
                                        >
                                            {isPlaying ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="6" y="4" width="4" height="16"></rect>
                                                    <rect x="14" y="4" width="4" height="16"></rect>
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                </svg>
                                            )}
                                        </button>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={toggleMute}
                                                className="text-white p-1.5"
                                            >
                                                {isMuted ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                                                        <line x1="23" y1="9" x2="17" y2="15"></line>
                                                        <line x1="17" y1="9" x2="23" y2="15"></line>
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                                    </svg>
                                                )}
                                            </button>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={volume}
                                                onChange={handleVolumeChange}
                                                className="w-16 h-1 bg-gray-500 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={toggleFullscreen}
                                            className="text-white p-1.5"
                                        >
                                            {isFullscreen ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M4 14h6m0 0v6m0-6l-7 7m17-11h-6m0 0V4m0 6l7-7"></path>
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                                                </svg>
                                            )}
                                        </button>

                                        {/* Options dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setShowOptions(!showOptions)}
                                                className="text-white p-1.5"
                                                aria-label="Options"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="1"></circle>
                                                    <circle cx="19" cy="12" r="1"></circle>
                                                    <circle cx="5" cy="12" r="1"></circle>
                                                </svg>
                                            </button>

                                            {/* Dropdown menu for options */}
                                            {showOptions && (
                                                <div className="absolute right-0 bottom-12 bg-black bg-opacity-90 rounded-md shadow-lg p-3 w-56 z-20">
                                                    {/* Playback speed options */}
                                                    <div className="mb-3">
                                                        <p className="text-white text-sm font-medium mb-1">Playback Speed</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                                                                <button
                                                                    key={speed}
                                                                    onClick={() => {
                                                                        if (videoRef.current) {
                                                                            videoRef.current.playbackRate = speed;
                                                                            setPlaybackSpeed(speed);
                                                                            setShowOptions(false);
                                                                        }
                                                                    }}
                                                                    className={`text-xs px-2 py-1 rounded ${
                                                                        playbackSpeed === speed
                                                                        ? 'bg-yellow-500 text-black font-medium'
                                                                        : 'bg-gray-700 text-white'
                                                                    }`}
                                                                >
                                                                    {speed === 1 ? 'Normal' : `${speed}x`}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Quality selection */}
                                                    <div className="mb-3">
                                                        <p className="text-white text-sm font-medium mb-1">Quality</p>
                                                        <select
                                                            className="w-full bg-gray-700 text-white px-2 py-1 rounded text-sm"
                                                            onChange={() => {

                                                                setShowOptions(false);
                                                            }}
                                                        >
                                                            <option value="auto">Auto</option>
                                                            <option value="1080p">1080p</option>
                                                            <option value="720p">720p</option>
                                                            <option value="480p">480p</option>
                                                            <option value="360p">360p</option>
                                                        </select>
                                                    </div>

                                                    {/* Picture-in-Picture */}
                                                    <button
                                                        onClick={() => {
                                                            if (videoRef.current && document.pictureInPictureEnabled) {
                                                                if (document.pictureInPictureElement) {
                                                                    document.exitPictureInPicture();
                                                                } else {
                                                                    videoRef.current.requestPictureInPicture();
                                                                }
                                                                setShowOptions(false);
                                                            }
                                                        }}
                                                        className="w-full text-left text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded flex items-center gap-2"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                            <rect x="12" y="12" width="10" height="5" rx="2" ry="2"></rect>
                                                        </svg>
                                                        <span>Picture-in-Picture</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {!isPlaying && (
                                <div
                                    className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 transition-opacity hover:bg-opacity-20"
                                    onClick={handlePlayClick}
                                >
                                    <div className="bg-yellow-500 bg-opacity-80 rounded-full p-5 shadow-lg transform transition-transform hover:scale-110">
                                        <Play className="h-12 w-12 text-black fill-black" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Content below video */}
                <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white dark:bg-black">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        {/* Poster Image */}
                        <div className="flex-shrink-0 w-full md:w-64 lg:w-72 md:h-auto">
                            <div className="relative rounded-lg overflow-hidden w-full md:w-64 lg:w-72 h-[400px] md:h-full shadow-md">
                                <img
                                    src={imgUrl}
                                    alt={title || "Video Poster"}
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex flex-col gap-4 h-full">
                                {/* Title and Controls */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-gray-300">
                                        {title}
                                    </h1>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-300">
                                                    Views:{" "}
                                                    <span className="text-yellow-600 dark:text-yellow-500">
                                                        {views}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {isBookmarked?.data?.bookmarked ? (
                                                <BsBookmarkCheckFill
                                                    className="text-2xl md:text-3xl text-yellow-600 dark:text-yellow-500 cursor-pointer"
                                                    onClick={handleAddToWatchLater}
                                                />
                                            ) : (
                                                <BsFillBookmarkPlusFill
                                                    className="text-2xl md:text-3xl text-gray-700 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-500 cursor-pointer"
                                                    onClick={handleAddToWatchLater}
                                                />
                                            )}
                                            <ReportVideoDialog videoId={_id} />
                                        </div>
                                    </div>
                                </div>
                                <RatingSection
                                category={video.category}
                                    videoId={_id}
                                    videoRating={video.ratings || 0}
                                    howManyRated={video.howManyRated || 0}
                                />
                                {/* Badges and Rating */}
                                <div className="flex justify-between flex-wrap items-center gap-3">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                                            HD
                                        </span>
                                        <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500">
                                            <Star className="fill-yellow-600 dark:fill-yellow-500 h-5 w-5" />
                                            <span className="font-medium">
                                              {ratings}
                                            </span>
                                        </div>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            24 min
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex flex-wrap gap-2">
                                            {video.tags && video.tags.length > 0 && (
                                                <>
                                                    <span className=" text-gray-600 dark:text-gray-400 px-3 py-1  text-md font-medium">
                                                        Tags:
                                                    </span>
                                                    {video.tags.map((tag:string, index:number) => (
                                                        <span key={index} className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </>
                                            )}
                                        </div>

                                    </div>
                                </div>

                                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
                                    {des}
                                </p>

                                {/* Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-2">
                                    <div className="flex">
                                        <span className="w-28 text-gray-600 dark:text-gray-400">
                                            Uploaded by:
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-200">
                                          {video?.userId?.name || "Unknown"}
                                        </span>
                                    </div>

                                    <div className="flex">
                                        <span className="w-28 text-gray-600 dark:text-gray-400">
                                            Released:
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-200">
                                            {createdAt?.split("T")[0] || "Unknown"}
                                        </span>
                                    </div>

                                    <div className="flex col-span-1 md:col-span-2">
                                        <span className="w-28 text-gray-600 dark:text-gray-400">
                                            Production:
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-200">
                                            N Movies, Limited

                                        </span>
                                    </div>
                                    <div className="flex col-span-1 md:col-span-2">
                                        <span className="w-28 text-gray-600 dark:text-gray-400">
                                            Casts:
                                        </span>
                                        <span className="text-gray-800 dark:text-gray-200">
                                           Unknown
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <CommentSection videoId={videoId} _id={_id} />
            </div>
            </SidebarInset>
             </SidebarProvider>
        </>
    );
};
