import * as React from "react";
import {
  House,
  History,
  BookmarkPlus,
  DoorOpen,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getUserInfo } from "@/redux/authUlits";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoIosVideocam } from "react-icons/io"
import { FaUserShield } from "react-icons/fa6";
import { HiOutlineVideoCamera } from "react-icons/hi2";
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
      title: "All Videos",
      url: "/videos",
      icon: HiOutlineVideoCamera,
    },
  ],
  navSecondary: [
    {
      title: "Log out",
      url: "#",
      icon: DoorOpen,
    },
  ],
  projects: [
    {
      name: "Bookmark",
      url: "/bookmark",
      icon: BookmarkPlus,
    },
     {
      name: "History",
      url: "/history",
      icon: History,
    },

  ],

  dashboard: [
    {
      title: "Dashboard",
      url: "/dashboard/my-dashboard",
      icon: MdDashboard,
    },
    {
      title: "My videos",
      url: "/dashboard/my-videos",
      icon: IoIosVideocam,
    },
    {
      title: "Edit Profile",
       url: "/dashboard/edit-profile",
      icon: FaUser,
    },
  ],
  adminDashboard: [
    {
      title: "Dashboard",
      url: "/dashboard/adminDashboard",
      icon: FaUserShield,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const user = getUserInfo();
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
        <NavMain title="Menu" items={data.navMain}  />
        <NavProjects projects={data.projects} />
        {user && <NavMain title="Dashboard" items={data.dashboard}  />}
        {user?.role=="admin" && <NavMain title="Admin Dashboard" items={data.adminDashboard}  />}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}
