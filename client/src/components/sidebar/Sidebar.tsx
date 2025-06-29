import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Carousel from "../carousel/Carousel";

import { useState } from "react";
import VideoUploadModal from "../uploads/Upload";

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
