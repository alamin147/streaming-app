import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useTheme } from "../themeProvider/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoIosMoon } from "react-icons/io";
import Carousel from "../carousel/Carousel";

export default function Sidebar() {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
          <div className="flex items-center gap-4">
            {<SidebarTrigger className=" flex md:hidden -ml-1" />}
            <Separator orientation="vertical" className="mr-2 h-4" />
            <a href="#" className="hover:text-yellow-400 text-sm md:text-lg font-medium">
              All
            </a>
            <a href="#" className="hover:text-yellow-400 text-sm md:text-lg font-medium">
              Movies
            </a>
            <a href="#" className="hover:text-yellow-400 text-sm md:text-lg font-medium">
              Trending
            </a>
          </div>
          <div className="flex items-center gap-4">
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
            <Button
              className="py-5 px-5 md:text-lg dark:bg-yellow-500"
              size="sm"
            >
              Login
            </Button>
          </div>
        </header>
        {/* main data */}
        <Carousel />
      </SidebarInset>
    </SidebarProvider>
  );
}
