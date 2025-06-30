import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useChangeVideoStatusMutation,
  useDeleteVideoMutation,
  useGetAllVideosQuery,
} from "@/redux/features/dashboard/adminDashboard/adminDashboardApi";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertCircleIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Loader2,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AllVideos = () => {
  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    sortBy: "newest",
  });

  // Video management state
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  // Fetch all videos without params
  const { data, isLoading } = useGetAllVideosQuery({});
  const allVideosFromServer = data?.data?.videos || [];
  const [deleteVideo] = useDeleteVideoMutation();
  const [changeVideoStatus, { isLoading: isStatusChanging }] =
    useChangeVideoStatusMutation();

  // Client-side filtering logic
  const filteredVideos = useMemo(() => {
    if (!Array.isArray(allVideosFromServer)) return [];

    let result = [...allVideosFromServer];

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (video) =>
          video?.title?.toLowerCase().includes(lowerSearch) ||
          video?.description?.toLowerCase().includes(lowerSearch) ||
          video?.userId?.name?.toLowerCase().includes(lowerSearch)
      );
    }

    // Apply category filter
    if (filters.category !== "all") {
      result = result.filter((video) => video.category === filters.category);
    }

    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter((video) => video.status === filters.status);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "views":
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "ratings":
        result.sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
        break;
    }

    return result;
  }, [allVideosFromServer, searchTerm, filters]);

  // Client-side pagination
  const paginatedVideos = useMemo(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredVideos.slice(startIndex, endIndex);
  }, [filteredVideos, page, limit]);

  // Calculate pagination data
  const pagination = useMemo(() => {
    const total = filteredVideos.length;
    const pages = Math.max(1, Math.ceil(total / limit));
    return { total, pages };
  }, [filteredVideos, limit]);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1); // Reset to first page on search
  };

  // Reset to page 1 when filters or limit change
  useEffect(() => {
    setPage(1);
  }, [filters, limit]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleOpenStatusDialog = (video: any) => {
    setSelectedVideo(video);
    setSelectedStatus(video.status);
    setIsStatusDialogOpen(true);
  };

  const handleOpenDeleteDialog = (video: any) => {
    setSelectedVideo(video);
    setIsDeleteDialogOpen(true);
  };

  const handleStatusChange = async () => {
    try {
      await changeVideoStatus({
        videoId: selectedVideo._id,
        status: selectedStatus,
      }).unwrap();
      toast.success(`Video status changed to ${selectedStatus}`);
      setIsStatusDialogOpen(false);
    } catch (error) {
      console.error("Failed to change status:", error);
      toast.error("Failed to change video status");
    }
  };

  const handleDeleteVideo = async () => {
    try {
      const res = await deleteVideo(selectedVideo._id).unwrap();
      console.log(res);
      toast.success("Video deleted Successfully");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete video:", error);
      toast.error("Failed to delete video");
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < pagination.pages) {
      setPage(page + 1);
    }
  };

  // page numbers for pagination
  const generatePageNumbers = () => {
    const totalPages = pagination?.pages || 1;
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pageNumbers.push(i);
      } else if (
        (i === 2 && page > 3) ||
        (i === totalPages - 1 && page < totalPages - 2)
      ) {
        pageNumbers.push(null);
      }
    }

    return pageNumbers.filter((value, index, self) =>
      value === null ? self[index - 1] !== null : true
    );
  };

  const handleExportCSV = () => {
    // Define headers for the CSV
    const headers = [
      "Title",
      "Uploader",
      "Category",
      "Views",
      "Ratings",
      "Status",
      "Created Date",
    ];

    let csvContent = "\ufeff"; // UTF-8 BOM

    csvContent += headers.join(",") + "\n";

    filteredVideos.forEach((video) => {
      const row = [
        `"${(video.title || "").replace(/"/g, '""')}"`,
        `"${(video.userId?.name || "").replace(/"/g, '""')}"`,
        `"${(video.category || "").replace(/"/g, '""')}"`,
        video.views?.toString() || "0",
        video.ratings?.toString() || "0",
        `"${(video.status || "").replace(/"/g, '""')}"`,
        `"${new Date(video.createdAt).toLocaleDateString()}"`,
      ];
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Set up and trigger download
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `videos-export-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV export started");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <>
      <TabsContent value="videos" className="space-y-4">
        <Card className="border border-gray-800/20 dark:border-gray-100/10">
          <CardHeader>
            <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0">
              <div>
                <CardTitle>Video Management</CardTitle>
                <CardDescription>
                  View and manage all platform videos
                </CardDescription>
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search videos..."
                    className="w-full pl-8 sm:w-[200px]"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className={`gap-1 ${showFilters ? "bg-yellow-500/20" : ""}`}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    <span className="hidden xs:inline">Filter</span>
                  </Button>
                  <Select
                    value={limit.toString()}
                    onValueChange={(value) => setLimit(Number(value))}
                  >
                    <SelectTrigger className="w-[80px] sm:w-[100px]">
                      <SelectValue placeholder={`${limit}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Per Page</SelectLabel>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleExportCSV}
                  className="sm:ml-0"
                >
                  <Download className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Export as CSV</span>
                  <span className="sm:hidden">Export as CSV</span>
                </Button>
              </div>
            </div>

            {/* Filters row */}
            {showFilters && (
              <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Category filter */}
                <Select
                  value={filters.category}
                  onValueChange={(value) =>
                    handleFilterChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
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
                  </SelectContent>
                </Select>

                {/* Status filter */}
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort by filter */}
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
                    <SelectItem value="views">Most Viewed</SelectItem>
                    <SelectItem value="ratings">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-muted-foreground">
                    <th className="py-3 px-4 text-left font-medium w-1/4">
                      Title
                    </th>
                    <th className="py-3 px-4 text-left font-medium hidden md:table-cell w-1/6">
                      Uploader
                    </th>
                    <th className="py-3 px-4 text-left font-medium hidden lg:table-cell w-1/8">
                      Category
                    </th>
                    <th className="py-3 px-4 text-center font-medium hidden md:table-cell w-1/12">
                      Views
                    </th>
                    <th className="py-3 px-4 text-center font-medium hidden lg:table-cell w-1/12">
                      Ratings
                    </th>
                    <th className="py-3 px-4 text-left font-medium hidden md:table-cell w-1/8">
                      Status
                    </th>
                    <th className="py-3 px-4 text-center font-medium w-1/12">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedVideos?.length > 0 ? (
                    paginatedVideos.map((video: any) => (
                      <tr
                        key={video._id}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="font-medium">{video?.title}</div>
                          <div className="text-muted-foreground text-xs md:hidden">
                            {video?.duration}
                          </div>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          {video?.userId?.name}
                        </td>
                        <td className="py-3 px-4 hidden lg:table-cell">
                          {video?.category}
                        </td>
                        <td className="py-3 px-4 text-center hidden md:table-cell">
                          {video?.views?.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center hidden lg:table-cell">
                          {video?.ratings?.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                              video?.status === "Published"
                                ? "bg-green-400 text-black"
                                : video?.status === "Pending"
                                ? "bg-yellow-400 text-black"
                                : video?.status === "Under Review"
                                ? "bg-blue-400 text-black"
                                : video?.status === "Rejected"
                                ? "bg-red-400 text-black"
                                : "bg-gray-500/10 text-gray-500"
                            }`}
                            onClick={() => handleOpenStatusDialog(video)}
                          >
                            {video?.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100/30"
                            onClick={() => handleOpenDeleteDialog(video)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-10 text-center text-muted-foreground"
                      >
                        No videos found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            {pagination && pagination.total > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {Math.min(1, pagination.total)}-
                  {Math.min(page * limit, pagination.total)} of{" "}
                  {pagination.total} videos
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={page <= 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>

                  <div className="hidden sm:flex items-center gap-1">
                    {generatePageNumbers().map((pageNum, i) =>
                      pageNum === null ? (
                        <span
                          key={`ellipsis-${i}`}
                          className="px-2 text-muted-foreground"
                        >
                          ...
                        </span>
                      ) : (
                        <Button
                          key={`page-${pageNum}`}
                          variant={pageNum === page ? "default" : "outline"}
                          size="sm"
                          className={
                            pageNum === page
                              ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                              : ""
                          }
                          onClick={() => setPage(pageNum as number)}
                        >
                          {pageNum}
                        </Button>
                      )
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={page >= pagination.pages}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Status Change Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Video Status</DialogTitle>
            <DialogDescription>
              Select a new status for "{selectedVideo?.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup
              value={selectedStatus}
              onValueChange={setSelectedStatus}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Published" id="published" />
                <Label htmlFor="published" className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                  Published
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Pending" id="pending" />
                <Label htmlFor="pending" className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-yellow-400 mr-2"></span>
                  Pending
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Under Review" id="under-review" />
                <Label htmlFor="under-review" className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-400 mr-2"></span>
                  Under Review
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Rejected" id="rejected" />
                <Label htmlFor="rejected" className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-red-400 mr-2"></span>
                  Rejected
                </Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStatusDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStatusChange}
              disabled={
                isStatusChanging || selectedStatus === selectedVideo?.status
              }
            >
              {isStatusChanging ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertCircleIcon className="text-yellow-500" />
            </div>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="text-white bg-red-500 hover:bg-red-600"
              onClick={handleDeleteVideo}
            ></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AllVideos;
