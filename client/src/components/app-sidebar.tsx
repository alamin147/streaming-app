import * as React from "react";
import {
  LayoutGrid,
  House,
  ArrowDownToLine,
  History,
  Flame,
  Settings,
  LifeBuoy,
  Send,
  BookmarkPlus,
  TvMinimalPlay,
  Film,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: House,
    },
    {
      title: "Download",
      url: "/download",
      icon: ArrowDownToLine,
    },
    {
      title: "Trending",
      url: "/trending",
      icon: Flame,
    },
    {
      title: "Category",
      url: "/category",
      icon: LayoutGrid,
      items: [
        {
          title: "Action",
          url: "/category/action",
        },
        {
          title: "Adventure",
          url: "/category/adventure",
        },
        {
          title: "Horror",
          url: "/category/horror",
        },
        {
          title: "Comedy",
          url: "/category/comedy",
        },
      ],
    },
    {
      title: "History",
      url: "/history",
      icon: History,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Bookmark",
      url: "#",
      icon: BookmarkPlus,
    },
    {
      name: "Movies",
      url: "#",
      icon: TvMinimalPlay,
    },
    {
      name: "Series",
      url: "#",
      icon: Film,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar variant="inset"  {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <h1 className="ms-2">
              <span className="text-yellow-500 font-bold italic text-4xl">
                N
              </span>
              <span className="text-xl">Movies</span>
            </h1>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain}  />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
