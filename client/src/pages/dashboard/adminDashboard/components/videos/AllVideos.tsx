import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useChangeVideoStatusMutation, useGetAllVideosQuery } from "@/redux/features/dashboard/adminDashboard/adminDashboardApi"
import { TabsContent } from "@radix-ui/react-tabs"
import { Download,  Filter,  Search } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"

const AllVideos = () => {
    const {data, isLoading} = useGetAllVideosQuery(undefined)
    const allVideos = data?.data?.videos || []
    const [changeVideoStatus, { isLoading: isStatusChanging }] = useChangeVideoStatusMutation()

    const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState<any>(null)
    const [selectedStatus, setSelectedStatus] = useState("")

    const handleOpenStatusDialog = (video: any) => {
        setSelectedVideo(video)
        setSelectedStatus(video.status)
        setIsStatusDialogOpen(true)
    }

    const handleStatusChange = async () => {
        try {
            await changeVideoStatus({
                videoId: selectedVideo._id,
                status: selectedStatus
            }).unwrap()
            toast.success(`Video status changed to ${selectedStatus}`)
            setIsStatusDialogOpen(false)
        } catch (error) {
            console.error("Failed to change status:", error)
            toast.error("Failed to change video status")
        }
    }

    if(isLoading){
        return <div className="flex justify-center items-center h-64">Loading videos...</div>
    }

  return (
    <>
        <TabsContent value="videos" className="space-y-4">
            <Card className="border border-gray-800/20 dark:border-gray-100/10">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Video Management</CardTitle>
                      <CardDescription>
                        View and manage all platform videos
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search videos..."
                          className="w-[200px] pl-8"
                        />
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50 text-muted-foreground">
                          <th className="py-3 px-4 text-left font-medium w-1/4">Title</th>
                          <th className="py-3 px-4 text-left font-medium hidden md:table-cell w-1/6">Uploader</th>
                          <th className="py-3 px-4 text-left font-medium hidden lg:table-cell w-1/8">Category</th>
                          <th className="py-3 px-4 text-center font-medium hidden md:table-cell w-1/12">Views</th>
                          <th className="py-3 px-4 text-center font-medium hidden lg:table-cell w-1/12">Ratings</th>
                          <th className="py-3 px-4 text-left font-medium hidden md:table-cell w-1/8">Status</th>
                          <th className="py-3 px-4 text-center font-medium w-1/12">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allVideos?.map((video:any) => (
                          <tr key={video._id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-medium">{video?.title}</div>
                              <div className="text-muted-foreground text-xs md:hidden">{video?.duration}</div>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">{video?.userId?.name}</td>
                            <td className="py-3 px-4 hidden lg:table-cell">{video?.category}</td>
                            <td className="py-3 px-4 text-center hidden md:table-cell">{video?.views?.toLocaleString()}</td>
                            <td className="py-3 px-4 text-center hidden lg:table-cell">{video?.ratings?.toLocaleString()}</td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                                  video?.status === "Published" ? "bg-green-400 text-black" :
                                  video?.status === "Pending" ? "bg-yellow-400 text-black" :
                                  video?.status === "Under Review" ? "bg-blue-400 text-black" :
                                  video?.status === "Rejected" ? "bg-red-400 text-black" :
                                  "bg-gray-500/10 text-gray-500"
                                }`}
                                onClick={() => handleOpenStatusDialog(video)}
                              >
                                {video?.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                             <Button className="px-5 py-0.5 rounded-full text-xs font-medium cursor-pointer bg-red-500 text-white hover:bg-red-400">Delete</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                    <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleStatusChange}
                        disabled={isStatusChanging || selectedStatus === selectedVideo?.status}
                    >
                        {isStatusChanging ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default AllVideos
