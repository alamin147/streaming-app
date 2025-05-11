import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { useTheme } from "../themeProvider/ThemeProvider";
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoIosMoon } from "react-icons/io";
import { RiVideoUploadFill } from "react-icons/ri";
import Carousel from "../carousel/Carousel";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import VideoUploadModal from "../uploads/Upload";
import { getUserInfo } from "@/redux/authUlits";
import { Avatar } from "../ui/avatar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";

export default function Sidebar() {
    const user = getUserInfo();

    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
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
                        {theme == "dark" ? (
                            <Sun
                                onClick={() => setTheme("light")}
                                className="cursor-pointer  w-6 h-6 md:w-7 md:h-7 text-yellow-600"
                                size={24}
                            />
                        ) : (
                            <IoIosMoon
                                onClick={() => setTheme("dark")}
                                className="cursor-pointer  w-6 h-6 md:w-7 md:h-7 text-black"
                            />
                        )}
                        {user ? (
                            <Avatar className="border-2 border-gray-700 flex items-center justify-center text-black dark:text-white font-bold">
                                {user.name.charAt(0)}
                                {user.name.charAt(user.name.indexOf(" ") + 1)}
                            </Avatar>
                        ) : (
                            <Link to="/login">
                                <Button
                                    className="py-5 px-5 md:text-lg dark:bg-yellow-500"
                                    size="sm"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </header>
                {<VideoUploadModal isOpen={isOpen} setIsOpens={setIsOpen} />}
                {/* main data */}
                <Carousel />
            </SidebarInset>
        </SidebarProvider>
    );
}
