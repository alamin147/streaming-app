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

import Carousel from "../carousel/Carousel";

export default function Sidebar() {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <a href="#" className="text-sm font-medium">
              All
            </a>
            <a href="#" className="text-sm font-medium">
              Movies
            </a>
            <a href="#" className="text-sm font-medium">
              Trending
            </a>
          </div>
          <div className="flex items-center gap-4">
            {theme == "dark" ? (
              <Sun
                onClick={() => setTheme("light")}
                className="cursor-pointer"
              />
            ) : (
              <Moon
                onClick={() => setTheme("dark")}
                className="cursor-pointer"
              />
            )}
            <Button className="dark:bg-yellow-500" size="sm">
              Login
            </Button>
          </div>
        </header>
        {/* main data */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
          <Carousel />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
