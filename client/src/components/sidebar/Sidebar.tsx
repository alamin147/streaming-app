import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { RiVideoUploadFill } from "react-icons/ri";
import Carousel from "../carousel/Carousel";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import VideoUploadModal from "../uploads/Upload";
import { getUserInfo } from "@/redux/authUlits";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { UserAndTheme } from "@/lib/UserAndTheme";

export default function Sidebar() {
    const user = getUserInfo();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 ">
                    <div className="flex items-center gap-4">
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
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `hover:text-yellow-400 text-sm  font-medium ${
                                                isActive
                                                    ? "text-yellow-400"
                                                    : ""
                                            }`
                                        }
                                    >
                                        All
                                    </NavLink>
                                    <NavLink
                                        to="/movies"
                                        className={({ isActive }) =>
                                            `hover:text-yellow-400 text-sm  font-medium ${
                                                isActive
                                                    ? "text-yellow-400"
                                                    : ""
                                            }`
                                        }
                                    >
                                        Movies
                                    </NavLink>
                                    <NavLink
                                        to="/trending"
                                        className={({ isActive }) =>
                                            `hover:text-yellow-400 text-sm font-medium ${
                                                isActive
                                                    ? "text-yellow-400"
                                                    : ""
                                            }`
                                        }
                                    >
                                        Trending
                                    </NavLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex items-center gap-4">
                        {user && (
                            <RiVideoUploadFill
                                title="Upload Video"
                                onClick={() => setIsOpen(true)}
                                className="cursor-pointer w-6 h-6 md:w-7 md:h-7 dark:text-yellow-600 text-black"
                                size={24}
                            />
                        )}
                        <UserAndTheme on={false}/>
                    </div>
                </header>
                {<VideoUploadModal isOpen={isOpen} setIsOpens={setIsOpen} />}
                {/* main data */}
                <Carousel  />
            </SidebarInset>
        </SidebarProvider>
    );
}
