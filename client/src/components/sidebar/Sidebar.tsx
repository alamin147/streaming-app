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

import Navbar from "../navbar/Navbar";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        {<VideoUploadModal isOpen={isOpen} setIsOpens={setIsOpen} />}
        <div className="mt-4">
          <Carousel />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
