import React from "react";
import { useGetVideosQuery } from "@/redux/features/videos/videosApi";
import Footer from "@/components/footer/Footer";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import VideosCards from "@/components/VideosCards/VideosCards";
import { AppSidebar } from "@/components/app-sidebar";

import { Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/navbar/Navbar";
import { useSearchParams } from "react-router-dom";

const Videos = () => {
  const { data: videos } = useGetVideosQuery(undefined);

  return (
    <SidebarProvider>
      <AllVideos videos={videos} />
    </SidebarProvider>
  );
};

const AllVideos = ({ videos }: { videos: any }) => {
  const { open, setOpen, isMobile } = useSidebar();
  const [searchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Initialize filters with URL params
  const [filters, setFilters] = useState({
    genre: searchParams.get("genre") || "all",
    category: searchParams.get("category") || "all",
    year: searchParams.get("year") || "all",
    searchQuery: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "newest",
  });

  const [showFilters, setShowFilters] = useState(false);

  // If there are any filter params in the URL, show the filters panel
  useEffect(() => {
    if (
      searchParams.has("genre") ||
      searchParams.has("category") ||
      searchParams.has("year") ||
      searchParams.has("sortBy")
    ) {
      setShowFilters(true);
    }
  }, [searchParams]);

  if (isMobile === true) {
    setOpen(false);
  }

  const filteredVideos = useMemo(() => {
    if (!videos?.data?.videos || !Array.isArray(videos.data.videos)) {
      console.log("No videos data available or invalid format");
      return [];
    }

    let result = [...videos.data.videos];

    // Filter by genre (tags)
    if (filters.genre && filters.genre !== "all") {
      result = result.filter((video) => video.tags?.includes(filters.genre));
    }

    // Filter by category
    if (filters.category && filters.category !== "all") {
      result = result.filter((video) => video.category === filters.category);
    }

    if (filters.year && filters.year !== "all") {
      result = result.filter((video) => {
        const videoYear = new Date(video.createdAt).getFullYear().toString();
        if (filters.year === "older") {
          return parseInt(videoYear) < 2021;
        }
        return videoYear === filters.year;
      });
    }

    if (filters.searchQuery) {
      result = result.filter((video) =>
        video.title?.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    if (filters.sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filters.sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (filters.sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filters.sortBy === "views") {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return result;
  }, [videos, filters]);

  const totalPages = Math.max(
    1,
    Math.ceil((filteredVideos?.length || 0) / itemsPerPage)
  );

  const paginatedVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    console.log(
      `Pagination: page ${currentPage}, showing ${startIndex}-${endIndex} of ${filteredVideos.length}`
    );

    return {
      data: {
        videos: filteredVideos.slice(startIndex, endIndex),
      },
    };
  }, [filteredVideos, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
    console.log("Reset to page 1, items per page:", itemsPerPage);
  }, [filters, itemsPerPage]);

  // Update URL when filters change
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));

    // Update URL params without navigating
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    // Update the URL with new search params
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${newParams.toString()}`
    );
  };

  const handleItemsPerPageChange = (value: string) => {
    const newLimit = Number(value);
    console.log("Setting items per page to:", newLimit);
    setItemsPerPage(newLimit);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      pageNumbers.length < 5 ||
      i === 1 ||
      i === totalPages ||
      Math.abs(i - currentPage) <= 1
    ) {
      pageNumbers.push(i);
    }
  }

  const uniquePageNumbers = [...new Set(pageNumbers)].sort((a, b) => a - b);

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        {/* Filter UI */}
        <div className="bg-background/95 backdrop-blur sticky top-16 z-10 p-4 border-b">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
            <h1 className="text-xl font-semibold">All Videos</h1>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search videos..."
                  className="pl-9"
                  value={filters.searchQuery}
                  onChange={(e) =>
                    handleFilterChange("searchQuery", e.target.value)
                  }
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters((prev) => !prev)}
                className={showFilters ? "bg-yellow-500/20" : ""}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              {/* Genre/Tags filter */}
              <div>
                <Select
                  value={filters.genre}
                  onValueChange={(value) => handleFilterChange("genre", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="horror">Horror</SelectItem>
                    <SelectItem value="comedy">Comedy</SelectItem>
                    <SelectItem value="drama">Drama</SelectItem>
                    <SelectItem value="thriller">Thriller</SelectItem>
                    <SelectItem value="romance">Romance</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="animation">Animation</SelectItem>
                    <SelectItem value="documentary">Documentary</SelectItem>
                    <SelectItem value="crime">Crime</SelectItem>
                    <SelectItem value="mystery">Mystery</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category filter */}
              <div>
                <Select
                  value={filters.category}
                  onValueChange={(value) =>
                    handleFilterChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="movies">Movies</SelectItem>
                    <SelectItem value="documentaries">Documentaries</SelectItem>
                    <SelectItem value="tv shows">TV Shows</SelectItem>
                    <SelectItem value="web series">Web Series</SelectItem>
                    <SelectItem value="short films">Short Films</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="music videos">Music Videos</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Year filter */}
              <div>
                <Select
                  value={filters.year}
                  onValueChange={(value) => handleFilterChange("year", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="older">Older</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort by filter */}
              <div>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => handleFilterChange("sortBy", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="views">Most Viewed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div className="min-h-screen p-4">
          {filteredVideos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground text-lg">
                No videos found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              <VideosCards open={open} Videos={paginatedVideos} />

              {/* Pagination controls  */}
              <div className="flex flex-wrap justify-center items-center gap-2 py-8 mt-4 border-t pt-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="bg-background border border-input hover:bg-accent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {uniquePageNumbers.map((number, index, array) => (
                  <React.Fragment key={number}>
                    {index > 0 && array[index] - array[index - 1] > 1 && (
                      <span className="px-2 text-muted-foreground">...</span>
                    )}
                    <Button
                      variant={number === currentPage ? "default" : "outline"}
                      className={
                        number === currentPage
                          ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                          : "bg-background hover:bg-accent"
                      }
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </Button>
                  </React.Fragment>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage >= totalPages}
                  className="bg-background border border-input hover:bg-accent"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Items per page */}
              <div className="flex justify-center items-center mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Items per page:
                  </span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={handleItemsPerPageChange}
                  >
                    <SelectTrigger className="h-8 w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="48">48</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </SidebarInset>
    </>
  );
};

export default Videos;
