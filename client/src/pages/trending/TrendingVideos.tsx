import { useGetRecentVideosQuery, useGetVideosQuery } from "@/redux/features/videos/videosApi";
import Footer from "@/components/footer/Footer";
import { SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import VideosCards from "@/components/VideosCards/VideosCards";
import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { UserAndTheme } from "@/lib/UserAndTheme";

const TrendingVideos = () => {
      const { data: videos } = useGetVideosQuery(undefined);

    return (
        <SidebarProvider>
            <TrendingContent videos={videos} />
        </SidebarProvider>
    )
}

const TrendingContent = ({ videos }: { videos: any }) => {
    const { open, setOpen, isMobile } = useSidebar();

    if (isMobile === true) {
        setOpen(false);
    }

    return (
        <>
            <AppSidebar />
            <SidebarInset>
                <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b border-gray-800/10 dark:border-gray-100/10 pe-4">
                    <div className="flex items-center gap-2 px-4">
                        {<SidebarTrigger className="flex md:hidden -ml-1" />}
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/">
                                        <span className="text-yellow-500 font-bold italic">N</span>Movies
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Trending</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <UserAndTheme on={true} />
                </header>
                <div className="min-h-screen">
                    <VideosCards title="Trending" open={open} Videos={videos} />
                </div>
                <Footer />
            </SidebarInset>
        </>
    )
}


export default TrendingVideos
