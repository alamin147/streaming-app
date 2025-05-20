import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    TrendingUp,
    Users,
    Eye,
    Film,
    Calendar,
    Clock,
} from "lucide-react";
import { FaPlay } from "react-icons/fa";
import { useState } from "react";
import { getUserInfo } from "@/redux/authUlits";
import VideoUploadModal from "@/components/uploads/Upload";
import { RiVideoUploadFill } from "react-icons/ri";
import { UserAndTheme } from "@/lib/UserAndTheme";
import { useGetUserDashboardStatsQuery, useGetUserRecentUploadsQuery } from "@/redux/features/dashboard/userDashboard/dashboardStatsApi";
import { format } from "date-fns";

interface Video {
    _id: string;
    title: string;
    imgUrl: string;
    views?: number;
    ratings?: number;
}

export default function MyDashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const user = getUserInfo();
    const { data: dashboardStats } = useGetUserDashboardStatsQuery({});
    const { data: recentUploadsData } = useGetUserRecentUploadsQuery({});

    const stats = dashboardStats?.data?.stats || {
        overview: {
            totalViews: 0,
            totalSubscribers: 0,
            contentCount: 0,
            totalWatchTime: 0
        },
        performance: {
            viewsProgress: 0,
            engagementProgress: 0,
            retentionProgress: 0
        }
    };

    const recentVideos = (recentUploadsData?.data?.recentVideos || []) as Video[];

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b border-gray-800/10 dark:border-gray-100/10 pe-4">
                    <div className="flex items-center gap-2 px-4">
                        {<SidebarTrigger className="flex md:hidden -ml-1" />}
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
                                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <UserAndTheme on={true} />
                </header>
                {<VideoUploadModal isOpen={isOpen} setIsOpens={setIsOpen} />}

                <div className="flex flex-1 flex-col gap-6 p-6 overflow-auto">
                    {/* Welcome Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Welcome back, {user?.name}
                            </h1>
                            <p className="text-muted-foreground">
                                Here's an overview of your content performance
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-yellow-500 text-black"
                            >
                                <RiVideoUploadFill className="mr-2 h-4 w-4" />
                                Upload Video
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border border-gray-800/20 dark:border-gray-100/10">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Views
                                </CardTitle>
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.overview.totalViews.toLocaleString()}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-800/20 dark:border-gray-100/10">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Subscribers
                                </CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.overview.totalSubscribers}</div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-800/20 dark:border-gray-100/10">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Content Count
                                </CardTitle>
                                <Film className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.overview.contentCount}</div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-800/20 dark:border-gray-100/10">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Watch Time
                                </CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.overview.totalWatchTime} hrs
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="grid gap-6 md:grid-cols-7">
                        {/* Analytics Section */}
                        <Card className="col-span-7 md:col-span-4 border border-gray-800/20 dark:border-gray-100/10">
                            <CardHeader>
                                <CardTitle>Performance Overview</CardTitle>
                                <CardDescription>
                                    View metrics across all your content
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                                    <div className="space-y-8 w-full px-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm">
                                                    Views
                                                </div>
                                                <div className="text-sm font-medium">
                                                    {stats.performance.viewsProgress}%
                                                </div>
                                            </div>
                                            <Progress
                                                value={stats.performance.viewsProgress}
                                                className="h-1.5 bg-gray-300 dark:bg-gray-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm">
                                                    Engagement
                                                </div>
                                                <div className="text-sm font-medium">
                                                    {stats.performance.engagementProgress}%
                                                </div>
                                            </div>
                                            <Progress
                                                value={stats.performance.engagementProgress}
                                                className="h-1.5 bg-gray-300 dark:bg-gray-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm">
                                                    Retention
                                                </div>
                                                <div className="text-sm font-medium">
                                                    {stats.performance.retentionProgress}%
                                                </div>
                                            </div>
                                            <Progress
                                                value={stats.performance.retentionProgress}
                                                className="h-1.5 bg-gray-300 dark:bg-gray-700"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Videos */}
                        <Card className="col-span-7 md:col-span-3 border border-gray-800/20 dark:border-gray-100/10">
                            <CardHeader>
                                <CardTitle>Recent Uploads</CardTitle>
                                <CardDescription>
                                    Your latest content performance
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentVideos.map((video: Video) => (
                                        <div
                                            key={video._id}
                                            className="flex items-center gap-4"
                                        >
                                            <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                                                <img
                                                    src={video.imgUrl}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                    <FaPlay className="text-white text-sm" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold truncate">
                                                    {video.title}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                                    <div className="flex items-center">
                                                        <Eye className="h-3 w-3 mr-1" />
                                                        {video.views?.toLocaleString() || 0}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <TrendingUp className="h-3 w-3 mr-1" />
                                                        {video.ratings?.toLocaleString() || 0}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Content Schedule Section */}
                        <Card className="col-span-7 border border-gray-800/20 dark:border-gray-100/10">
                            <CardHeader>
                                <CardTitle>Content Schedule</CardTitle>
                                <CardDescription>
                                    Upcoming releases and events
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border border-gray-800/20 dark:border-gray-100/10 p-4">
                                    <div className="grid gap-6 md:grid-cols-3">
                                        {[
                                            {
                                                date: format(new Date(), "MMMM d"),
                                                title: "Content Goal",
                                                description: "Upload 2 new videos"
                                            },
                                            {
                                                date: format(new Date().setDate(new Date().getDate() + 3), "MMMM d"),
                                                title: "Engagement Target",
                                                description: "Aim for 1000 views"
                                            },
                                            {
                                                date: format(new Date().setDate(new Date().getDate() + 7), "MMMM d"),
                                                title: "Weekly Review",
                                                description: "Analyze performance"
                                            }
                                        ].map((event) => (
                                            <div
                                                key={event.date}
                                                className="flex items-start gap-4 p-2 rounded-md hover:bg-muted/20 transition-colors"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-yellow-500/10 text-yellow-500">
                                                    <Calendar className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold">
                                                        {event.title}
                                                    </h4>
                                                    <div className="mt-1 text-xs text-muted-foreground">
                                                        {event.date}
                                                    </div>
                                                    <div className="mt-1 text-xs text-muted-foreground">
                                                        {event.description}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
