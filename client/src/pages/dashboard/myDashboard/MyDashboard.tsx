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
    PlaySquare,
    Clock,
} from "lucide-react";
import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/redux/authUlits";
import { Link } from "react-router-dom";
import VideoUploadModal from "@/components/uploads/Upload";
import { RiVideoUploadFill } from "react-icons/ri";

export default function MyDashboard() {
    const [progress, setProgress] = useState(13);
    const [isOpen, setIsOpen] = useState(false);
    const user = getUserInfo();
    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);

    const recentVideos = [
        {
            id: "1",
            title: "Epic Adventure Movie",
            views: 2543,
            likes: 423,
            imgUrl: "/original-80ca8c0c7cc530cd5bb0a0962acf369a.webp",
        },
        {
            id: "2",
            title: "Action Thriller",
            views: 1876,
            likes: 321,
            imgUrl: "/original-9f342183ecc26d3bc8bc66e7ba537228.webp",
        },
        {
            id: "3",
            title: "Sci-Fi Journey",
            views: 3254,
            likes: 542,
            imgUrl: "/original-7ad6eb1e183e6a0719a1045bf9d6b589.webp",
        },
    ];

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800/10 dark:border-gray-100/10">
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
                                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
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
                                    145,283
                                </div>
                                <p className="text-xs text-muted-foreground flex items-center mt-1"></p>
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
                                <div className="text-2xl font-bold">2,350</div>
                                <p className="text-xs text-muted-foreground flex items-center mt-1"></p>
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
                                <div className="text-2xl font-bold">48</div>
                                <p className="text-xs text-muted-foreground flex items-center mt-1"></p>
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
                                    6,284 hrs
                                </div>
                                <p className="text-xs text-muted-foreground flex items-center mt-1"></p>
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
                                                    66%
                                                </div>
                                            </div>
                                            <Progress
                                                value={progress}
                                                className="h-1.5 bg-gray-300 dark:bg-gray-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm">
                                                    Engagement
                                                </div>
                                                <div className="text-sm font-medium">
                                                    43%
                                                </div>
                                            </div>
                                            <Progress
                                                value={43}
                                                className="h-1.5 bg-gray-300 dark:bg-gray-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm">
                                                    Retention
                                                </div>
                                                <div className="text-sm font-medium">
                                                    78%
                                                </div>
                                            </div>
                                            <Progress
                                                value={78}
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
                                    {recentVideos.map((video) => (
                                        <div
                                            key={video.id}
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
                                                        {video.views.toLocaleString()}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <TrendingUp className="h-3 w-3 mr-1" />
                                                        {video.likes.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
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
                                        {["Tomorrow", "May 15", "May 20"].map(
                                            (date, i) => (
                                                <div
                                                    key={date}
                                                    className="flex items-start gap-4 p-2 rounded-md hover:bg-muted/20 transition-colors"
                                                >
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-yellow-500/10 text-yellow-500">
                                                        <Calendar className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-semibold">
                                                            {
                                                                [
                                                                    "New Release",
                                                                    "Premiere",
                                                                    "Live Q&A",
                                                                ][i]
                                                            }
                                                        </h4>
                                                        <div className="mt-1 text-xs text-muted-foreground">
                                                            {date}, 2025
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
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
