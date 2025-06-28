import React from "react";
import { useGetVideosQuery } from "@/redux/features/videos/videosApi";
import Footer from "@/components/footer/Footer";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import VideosCards from "@/components/VideosCards/VideosCards";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UserAndTheme } from "@/lib/UserAndTheme";
import { NavLink } from "react-router-dom";
import {
  ChevronDown,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    searchQuery: "",
    sortBy: "newest",
  });

  const [showFilters, setShowFilters] = useState(false);
  if (isMobile === true) {
    setOpen(false);
  }

  const filteredVideos = useMemo(() => {
    if (!videos?.data?.videos || !Array.isArray(videos.data.videos)) {
      console.log("No videos data available or invalid format");
      return [];
    }

    console.log("Processing videos:", videos.data.videos.length);
    let result = [...videos.data.videos];

    if (filters.genre) {
      result = result.filter((video) =>
        video.genre?.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }

    if (filters.year) {
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
  }, [videos, filters, itemsPerPage]);

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

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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
        <header className="sticky top-0 z-20 flex justify-between h-16 shrink-0 items-center gap-2 border-b border-gray-800/10 dark:border-gray-100/10 pe-4 bg-background">
          <div className="flex items-center gap-2 px-4">
            {<SidebarTrigger className="flex md:hidden -ml-1" />}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    <span className="text-yellow-500 font-bold">N</span>
                    Movies
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="flex flex-wrap gap-2 items-center">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `hover:text-yellow-400 text-sm font-medium px-2 ${
                        isActive ? "text-yellow-400" : ""
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                      `hover:text-yellow-400 text-sm font-medium px-2 ${
                        isActive ? "text-yellow-400" : ""
                      }`
                    }
                  >
                    Movies
                  </NavLink>
                  <NavLink
                    to="/tv-shows"
                    className={({ isActive }) =>
                      `hover:text-yellow-400 text-sm font-medium px-2 ${
                        isActive ? "text-yellow-400" : ""
                      }`
                    }
                  >
                    TV Shows
                  </NavLink>
                  <div className="relative">
                    <button
                      className="flex items-center hover:text-yellow-400 text-sm font-medium px-2"
                      onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                      onMouseEnter={() => setMegaMenuOpen(true)}
                    >
                      Categories
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </button>

                    {megaMenuOpen && (
                      <div
                        className="absolute top-full left-0 z-30 w-screen max-w-screen-lg bg-background shadow-lg rounded-lg p-4 grid grid-cols-3 gap-4 border"
                        onMouseLeave={() => setMegaMenuOpen(false)}
                      >
                        <div>
                          <h3 className="font-bold text-yellow-500 mb-2">
                            Genres
                          </h3>
                          <ul className="space-y-1">
                            <li>
                              <NavLink
                                to="/category/action"
                                className="text-sm hover:text-yellow-400"
                              >
                                Action
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/comedy"
                                className="text-sm hover:text-yellow-400"
                              >
                                Comedy
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/drama"
                                className="text-sm hover:text-yellow-400"
                              >
                                Drama
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/horror"
                                className="text-sm hover:text-yellow-400"
                              >
                                Horror
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/category/sci-fi"
                                className="text-sm hover:text-yellow-400"
                              >
                                Sci-Fi
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold text-yellow-500 mb-2">
                            Collections
                          </h3>
                          <ul className="space-y-1">
                            <li>
                              <NavLink
                                to="/collections/top-rated"
                                className="text-sm hover:text-yellow-400"
                              >
                                Top Rated
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/collections/award-winning"
                                className="text-sm hover:text-yellow-400"
                              >
                                Award Winning
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/collections/classic"
                                className="text-sm hover:text-yellow-400"
                              >
                                Classic Movies
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/collections/family"
                                className="text-sm hover:text-yellow-400"
                              >
                                Family Friendly
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/collections/indie"
                                className="text-sm hover:text-yellow-400"
                              >
                                Independent Films
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold text-yellow-500 mb-2">
                            By Year
                          </h3>
                          <ul className="space-y-1">
                            <li>
                              <NavLink
                                to="/year/2024"
                                className="text-sm hover:text-yellow-400"
                              >
                                2024
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/year/2023"
                                className="text-sm hover:text-yellow-400"
                              >
                                2023
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/year/2022"
                                className="text-sm hover:text-yellow-400"
                              >
                                2022
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/year/2021"
                                className="text-sm hover:text-yellow-400"
                              >
                                2021
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/year/older"
                                className="text-sm hover:text-yellow-400"
                              >
                                Older
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  <NavLink
                    to="/trending"
                    className={({ isActive }) =>
                      `hover:text-yellow-400 text-sm font-medium px-2 ${
                        isActive ? "text-yellow-400" : ""
                      }`
                    }
                  >
                    Trending
                  </NavLink>
                  <NavLink
                    to="/popular"
                    className={({ isActive }) =>
                      `hover:text-yellow-400 text-sm font-medium px-2 ${
                        isActive ? "text-yellow-400" : ""
                      }`
                    }
                  >
                    Popular
                  </NavLink>
                  <NavLink
                    to="/new-releases"
                    className={({ isActive }) =>
                      `hover:text-yellow-400 text-sm font-medium px-2 ${
                        isActive ? "text-yellow-400" : ""
                      }`
                    }
                  >
                    New Releases
                  </NavLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <UserAndTheme on={true} />
        </header>

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
              <div>
                <Select
                  value={filters.genre}
                  onValueChange={(value) => handleFilterChange("genre", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Genres</SelectItem>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="comedy">Comedy</SelectItem>
                    <SelectItem value="drama">Drama</SelectItem>
                    <SelectItem value="horror">Horror</SelectItem>
                    <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select
                  value={filters.year}
                  onValueChange={(value) => handleFilterChange("year", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Years</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="older">Older</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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

              <div>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={handleItemsPerPageChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Items per page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 per page</SelectItem>
                    <SelectItem value="12">12 per page</SelectItem>
                    <SelectItem value="24">24 per page</SelectItem>
                    <SelectItem value="48">48 per page</SelectItem>
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
