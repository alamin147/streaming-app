import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PlaySquare, Search, Edit2, Trash2, MoreHorizontal, Filter, Eye, ThumbsUp, Clock } from "lucide-react";
import { useState } from "react";
import { getUserInfo } from "@/redux/authUlits";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function MyVideos() {
  const user = getUserInfo();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const myVideos = [
    {
      id: "1",
      title: "Epic Adventure Movie",
      description: "An amazing adventure through fantastical lands",
      views: 2543,
      likes: 423,
      imgUrl: "/original-80ca8c0c7cc530cd5bb0a0962acf369a.webp",
      duration: "2:15:30",
      createdAt: "2025-04-15",
      category: "Adventure"
    },
    {
      id: "2",
      title: "Action Thriller",
      description: "Non-stop action in this thrilling movie",
      views: 1876,
      likes: 321,
      imgUrl: "/original-9f342183ecc26d3bc8bc66e7ba537228.webp",
      duration: "1:58:22",
      createdAt: "2025-04-28",
      category: "Action"
    },
    {
      id: "3",
      title: "Sci-Fi Journey",
      description: "Explore the depths of space in this sci-fi epic",
      views: 3254,
      likes: 542,
      imgUrl: "/original-7ad6eb1e183e6a0719a1045bf9d6b589.webp",
      duration: "2:24:15",
      createdAt: "2025-05-05",
      category: "Sci-Fi"
    },
    {
      id: "4",
      title: "Mystery Thriller",
      description: "A twisted tale of mystery and suspense",
      views: 1453,
      likes: 312,
      imgUrl: "/MV5BZGRiZDZhZjItM2M3ZC00Y2IyLTk3Y2MtMWY5YjliNDFkZTJlXkEyXkFqcGc@.jpg",
      duration: "2:05:47",
      createdAt: "2025-05-10",
      category: "Mystery"
    },
  ];

  // Filter videos based on search query
  const filteredVideos = myVideos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle edit dialog open
  const handleEditClick = (video: any) => {
    setSelectedVideo(video);
    setIsEditDialogOpen(true);
  };

  // Handle delete dialog open
  const handleDeleteClick = (video: any) => {
    setSelectedVideo(video);
    setIsDeleteDialogOpen(true);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800/10 dark:border-gray-100/10">
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    <span className="text-yellow-500 font-bold">N</span>Movies
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>My Videos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 overflow-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Videos</h1>
              <p className="text-muted-foreground">Manage your uploaded content</p>
            </div>
            <Link to="/">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <PlaySquare className="mr-2 h-4 w-4" />
                Upload New Video
              </Button>
            </Link>
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
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All Videos</DropdownMenuItem>
                    <DropdownMenuItem>Most Viewed</DropdownMenuItem>
                    <DropdownMenuItem>Most Recent</DropdownMenuItem>
                    <DropdownMenuItem>Oldest</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          {/* Videos List */}
          <div className="space-y-4">
            {filteredVideos.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium">No videos found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search query</p>
              </div>
            ) : (
              filteredVideos.map((video) => (
                <Card key={video.id} className="border border-gray-800/20 dark:border-gray-100/10 overflow-hidden hover:border-yellow-500/30 transition-colors">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative sm:w-48 h-40 sm:h-auto">
                      <img
                        src={video.imgUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{video.title}</h3>
                          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{video.description}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditClick(video)}>
                              <Edit2 className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteClick(video)} className="text-red-500 focus:text-red-500">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="mt-4 flex items-center text-sm text-muted-foreground gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          <span>{video.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span>{video.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Uploaded {video.createdAt}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
                            {video.category}
                          </span>
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
        </div>
      </SidebarInset>

      {/* Edit Video Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
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
                <Input id="title" defaultValue={selectedVideo.title} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={selectedVideo.description} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" defaultValue={selectedVideo.category} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <div className="relative h-32 bg-muted rounded-md overflow-hidden">
                    <img src={selectedVideo.imgUrl} alt={selectedVideo.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="sm">Change</Button>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Video Info</Label>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{selectedVideo.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Views:</span>
                      <span>{selectedVideo.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Likes:</span>
                      <span>{selectedVideo.likes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Video</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this video? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedVideo && (
            <div className="py-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-16 rounded overflow-hidden flex-shrink-0">
                  <img src={selectedVideo.imgUrl} alt={selectedVideo.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">{selectedVideo.title}</h4>
                  <p className="text-sm text-muted-foreground">{selectedVideo.views.toLocaleString()} views</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive">
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
