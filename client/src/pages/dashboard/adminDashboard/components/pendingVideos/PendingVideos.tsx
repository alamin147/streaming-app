import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Check, Search, X } from "lucide-react"
import { useGetPendingVideosQuery, useApproveVideoMutation, useRejectVideoMutation } from "@/redux/features/dashboard/adminDashboard/adminDashboardApi"
import { useState } from "react"
import { format } from "date-fns"
import toast from "react-hot-toast"

const PendingVideos = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { data, isLoading, error } = useGetPendingVideosQuery(undefined)
  const [approveVideo] = useApproveVideoMutation()
  const [rejectVideo] = useRejectVideoMutation()

  const pendingVideos = data?.data?.pendingVideos || []

  const filteredVideos = pendingVideos.filter((video: any) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApprove = async (id: string) => {
    try {
      await approveVideo(id).unwrap()
      toast.success("Video approved successfully. The video is now publicly available.")
    } catch (error) {
      toast.error("Failed to approve video")
    }
  }

  const handleReject = async (id: string) => {
    try {
      await rejectVideo(id).unwrap()
      toast.success("Video rejected successfully. The creator will be notified.")
    } catch (error) {
      toast.error("Failed to reject video")
    }
  }

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp)
      const now = new Date()

      // If less than 24 hours ago
      if (now.getTime() - date.getTime() < 24 * 60 * 60 * 1000) {
        const hours = Math.floor((now.getTime() - date.getTime()) / (60 * 60 * 1000))
        return hours <= 1 ? "1 hour ago" : `${hours} hours ago`
      }

      // If less than 7 days ago
      if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
        const days = Math.floor((now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000))
        return days === 1 ? "1 day ago" : `${days} days ago`
      }

      // Otherwise show formatted date
      return format(date, "MMM d, yyyy")
    } catch (e) {
      return "Unknown date"
    }
  }
  return (
     <Card className="col-span-7 md:col-span-4 border border-gray-800/20 dark:border-gray-100/10">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>Pending Approval</CardTitle>
                        <CardDescription>
                          Videos awaiting review before they become public
                        </CardDescription>
                      </div>
                      <div className="flex items-center">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search..."
                            className="w-[180px] pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(item => (
                      <div
                        key={item}
                        className="flex animate-pulse items-center gap-4 p-3 rounded-md border border-gray-800/10 dark:border-gray-100/10"
                      >
                        <div className="bg-muted w-16 h-16 rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="bg-muted w-20 h-8 rounded"></div>
                          <div className="bg-muted w-20 h-8 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-4 text-red-500">
                    Failed to load pending videos
                  </div>
                ) : filteredVideos.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    {searchQuery ? "No videos matching your search" : "No pending videos found"}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredVideos.map((video: any) => (
                      <div
                        key={video._id}
                        className="flex items-center gap-4 p-3 rounded-md border border-gray-800/10 dark:border-gray-100/10 hover:bg-muted/20"
                      >
                        <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={video.imgUrl}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold truncate">
                            {video.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <div>By {video.userId?.name || "Unknown"}</div>
                            <div>{formatTimestamp(video.createdAt)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-500 text-green-500 hover:bg-green-500/10"
                            onClick={() => handleApprove(video._id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500/10"
                            onClick={() => handleReject(video._id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {filteredVideos.length > 5 && (
                  <div className="mt-4 text-center">
                    <Button
                      variant="link"
                      className="text-yellow-500"
                    >
                      View All Pending Content
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
  )
}

export default PendingVideos
