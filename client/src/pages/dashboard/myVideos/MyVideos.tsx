import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Edit2,
  Trash2,
  Filter,
  Eye,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { FaCalendarWeek } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetMyVideosQuery,
  useUpdateMyVideosMutation,
  useDeleteMyVideosMutation,
} from "@/redux/features/dashboard/userDashboard/userDashboardApi";
import { toast } from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Navbar from "@/components/navbar/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MyVideos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(5);
  const { data: myVideo, refetch } = useGetMyVideosQuery(undefined);

  const [updateMyVideos, { isLoading: isUpdateLoading }] =
    useUpdateMyVideosMutation();
  const [deleteMyVideos, { isLoading: isDeleteLoading }] =
    useDeleteMyVideosMutation();

  const myVideos = myVideo?.data?.myVideos || [];
  const filteredVideos = myVideos?.filter(
    (video: any) =>
      video?.title.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      video?.des.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const sortedAndFilteredVideos = useMemo(() => {
    let filtered = [...filteredVideos];

    // Apply filters
    switch (currentFilter) {
      case "most-viewed":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "most-recent":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      default:
        // "all" - keep default sorting (which is typically newest first)
        break;
    }

    return filtered;
  }, [filteredVideos, currentFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedAndFilteredVideos.length / videosPerPage);
  const displayedVideos = sortedAndFilteredVideos.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  );

  // Reset to first page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, currentFilter]);

  const handleEditClick = async (video: any) => {
    setSelectedVideo(video);
    setEditedTitle(video.title);
    setEditedDescription(video.des);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const res = await updateMyVideos({
        videoId: selectedVideo._id,
        title: editedTitle,
        des: editedDescription,
      }).unwrap();

      if (res.status === 200) {
        toast.success("Video updated successfully");
        setIsEditDialogOpen(false);
        refetch();
      } else {
        toast.error("Failed to update video");
      }
    } catch (error) {
      toast.error("An error occurred while updating the video");
    }
  };
  const handleDeleteClick = (video: any) => {
    setSelectedVideo(video);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSubmit = async () => {
    try {
      if (!selectedVideo) return;

      const res = await deleteMyVideos({
        videoId: selectedVideo._id,
      }).unwrap();

      if (res.status === 200) {
        toast.success("Video deleted successfully");
        setIsDeleteDialogOpen(false);
        refetch();
      } else {
        toast.error("Failed to delete video");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the video");
    }
  };

  // Filter handler
  const handleFilterChange = (filterType: any) => {
    setCurrentFilter(filterType);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />

        <div className="flex flex-1 flex-col gap-6 p-6 overflow-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Videos</h1>
              <p className="text-muted-foreground">
                Manage your uploaded content
              </p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <Card className="border border-gray-800/20 dark:border-gray-100/10">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search videos..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleFilterChange("all")}
                      className={
                        currentFilter === "all"
                          ? "bg-gray-100 dark:bg-gray-800"
                          : ""
                      }
                    >
                      All Videos
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleFilterChange("most-viewed")}
                      className={
                        currentFilter === "most-viewed"
                          ? "bg-gray-100 dark:bg-gray-800"
                          : ""
                      }
                    >
                      Most Viewed
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleFilterChange("most-recent")}
                      className={
                        currentFilter === "most-recent"
                          ? "bg-gray-100 dark:bg-gray-800"
                          : ""
                      }
                    >
                      Most Recent
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleFilterChange("oldest")}
                      className={
                        currentFilter === "oldest"
                          ? "bg-gray-100 dark:bg-gray-800"
                          : ""
                      }
                    >
                      Oldest
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
          {/* Videos List */}
          <div className="space-y-4">
            {displayedVideos?.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium">No videos found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your search query
                </p>
              </div>
            ) : (
              displayedVideos?.map((video: any) => (
                <Card
                  key={video._id}
                  className="border border-gray-800/20 dark:border-gray-100/10 overflow-hidden hover:border-yellow-500/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative sm:w-48 h-40 max-h-48 sm:h-auto">
                      <img
                        src={video.imgUrl}
                        alt={video.title}
                        className="w-full h-full obejct-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{video.title}</h3>
                          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                            {video.des}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center text-sm text-muted-foreground gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          <span>{video?.views?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" />
                          <span>{video?.ratings?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCalendarWeek className="h-3.5 w-3.5" />
                          <span>{video?.createdAt?.split("T")[0]}</span>
                          <Clock className="ms-2 h-3.5 w-3.5" />
                          <span>
                            {video?.createdAt?.split("T")[1]?.split(".")[0]}
                          </span>
                        </div>

                        {/* Show video status with tooltip */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div
                                className={`px-2 py-0.5 text-xs rounded-full ${
                                  video.status === "Published"
                                    ? "bg-green-500/20 text-green-500"
                                    : video.status === "Pending"
                                    ? "bg-yellow-500/20 text-yellow-500"
                                    : video.status === "Rejected"
                                    ? "bg-red-500/20 text-red-500"
                                    : "bg-blue-500/20 text-blue-500"
                                }`}
                              >
                                {video.status}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              {video.status === "Published"
                                ? "This video is available to all users"
                                : video.status === "Pending"
                                ? "This video is awaiting approval from administrators"
                                : video.status === "Rejected"
                                ? "This video was rejected by administrators"
                                : "This video is under review"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          {video?.tags?.map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 mr-1"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditClick(video)}
                            className="h-8"
                          >
                            <Edit2 className="mr-2 h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteClick(video)}
                            className="h-8"
                          >
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Pagination */}
          {sortedAndFilteredVideos.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {Math.min(1, sortedAndFilteredVideos.length)}-
                {Math.min(
                  currentPage * videosPerPage,
                  sortedAndFilteredVideos.length
                )}{" "}
                of {sortedAndFilteredVideos.length} videos
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>

                <div className="hidden sm:flex items-center gap-1">
                  {(() => {
                    const pageNumbers = [];
                    const maxVisible = 5; // Maximum number of page buttons to show

                    if (totalPages <= maxVisible) {
                      // If we have 5 or fewer pages, show all page numbers
                      for (let i = 1; i <= totalPages; i++) {
                        pageNumbers.push(i);
                      }
                    } else {
                      // Always show first page
                      pageNumbers.push(1);

                      // Logic for middle pages
                      let startPage = Math.max(2, currentPage - 1);
                      let endPage = Math.min(totalPages - 1, currentPage + 1);

                      // Adjust if we're near the beginning
                      if (currentPage <= 3) {
                        endPage = 4;
                      }

                      // Adjust if we're near the end
                      if (currentPage >= totalPages - 2) {
                        startPage = totalPages - 3;
                      }

                      // Add ellipsis after first page if needed
                      if (startPage > 2) {
                        pageNumbers.push("ellipsis1");
                      }

                      // Add middle pages
                      for (let i = startPage; i <= endPage; i++) {
                        pageNumbers.push(i);
                      }

                      // Add ellipsis before last page if needed
                      if (endPage < totalPages - 1) {
                        pageNumbers.push("ellipsis2");
                      }

                      // Always show last page
                      pageNumbers.push(totalPages);
                    }

                    return pageNumbers.map((pageNum: any, idx) => {
                      if (pageNum === "ellipsis1" || pageNum === "ellipsis2") {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="px-2 py-1 text-muted-foreground"
                          >
                            ...
                          </span>
                        );
                      }

                      return (
                        <Button
                          key={`page-${pageNum}`}
                          variant={
                            pageNum === currentPage ? "default" : "outline"
                          }
                          size="sm"
                          className={
                            pageNum === currentPage
                              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                              : ""
                          }
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    });
                  })()}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-1">
                  Per page:
                </span>
                <Select
                  value={videosPerPage.toString()}
                  onValueChange={(value) => {
                    setVideosPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[70px] h-9">
                    <SelectValue placeholder={videosPerPage.toString()} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>

      {/* Edit Video Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px] w-[calc(100%-2rem)] mx-auto">
          <DialogHeader>
            <DialogTitle>Edit Video</DialogTitle>
            <DialogDescription>
              Make changes to your video details below.
            </DialogDescription>
          </DialogHeader>
          {selectedVideo && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  className="max-h-60 h-40"
                  id="description"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </div>
              <div className="">
                <p className="mb-1">Tags:</p>
                {selectedVideo?.tags?.map((tag: string, index: number) => (
                  <span
                    key={index + `13`}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 mr-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="grid gap-2">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <div className="relative w-full h-32 bg-muted rounded-md overflow-hidden">
                    <img
                      src={selectedVideo?.imgUrl}
                      alt={selectedVideo?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      {/* <Button variant="secondary" size="sm">Change</Button> */}
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Video Info</Label>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{selectedVideo?.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Views:</span>
                      <span>{selectedVideo?.views?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ratings:</span>
                      <span>{selectedVideo?.ratings?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Video Uploaded:
                      </span>
                      <span>
                        {selectedVideo?.createdAt
                          ?.split("T")[0]
                          ?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              onClick={handleEditSubmit}
              disabled={isUpdateLoading}
            >
              {isUpdateLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] w-[calc(100%-2rem)] mx-auto">
          <DialogHeader>
            <DialogTitle>Delete Video</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this video? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {selectedVideo && (
            <div className="py-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-16 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={selectedVideo.imgUrl}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{selectedVideo.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedVideo.views.toLocaleString()} views
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSubmit}
              disabled={isDeleteLoading}
            >
              {isDeleteLoading ? "Deleting..." : "Delete Permanently"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
