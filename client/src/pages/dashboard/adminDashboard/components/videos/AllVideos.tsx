import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useGetAllVideosQuery } from "@/redux/features/dashboard/adminDashboard/adminDashboardApi"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TabsContent } from "@radix-ui/react-tabs"
import { Check, Download, Edit2, Eye, Filter, Flag, MoreHorizontal, Search, Trash2 } from "lucide-react"

const AllVideos = () => {
    const {data,isLoading}=useGetAllVideosQuery(undefined)
const allVideos = data?.data?.videos || [];
    console.log(allVideos)

if(isLoading){
return;
}
  return (
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
                          <th className="py-3 px-4 text-left font-medium">Title</th>
                          <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Uploader</th>
                          <th className="py-3 px-4 text-left font-medium hidden lg:table-cell">Category</th>
                          <th className="py-3 px-4 text-center font-medium hidden md:table-cell">Views</th>
                          <th className="py-3 px-4 text-center font-medium hidden lg:table-cell">Ratings</th>
                          <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Status</th>
                          <th className="py-3 px-4 text-right font-medium">Actions</th>
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
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                                video?.status === "Published" ? "bg-green-500/10 text-green-500" :
                                video?.status === "Pending" ? "bg-red-500/10 text-red-500" :
                                "bg-yellow-500/10 text-yellow-500"
                              }`}>
                                {video?.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[160px]">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  {video?.status === "Under Review" ? (
                                    <DropdownMenuItem className="text-green-500 cursor-pointer">
                                      <Check className="h-4 w-4 mr-2" />
                                      Approve
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem className="text-amber-500 cursor-pointer">
                                      <Flag className="h-4 w-4 mr-2" />
                                      Flag
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="text-red-500 cursor-pointer">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
  )
}

export default AllVideos
