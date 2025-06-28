import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Shield } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Stats from "./components/stats/Stats";
import AllVideos from "./components/videos/AllVideos";
import UserTab from "./components/userTab/UserTab";
import PendingVideos from "./components/pendingVideos/PendingVideos";
import ReportVideos from "./components/reportVideos/ReportVideos";
import ContentDistributionChart from "./components/contentDistributionChart/ContentDistributionChart";
import AnalyticChart from "./components/analyticChart/AnalyticChart";
import Navbar from "@/components/navbar/Navbar";

const AdminDashboard = () => {
  const [activeChartTab, setActiveChartTab] = useState("views");
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <div className="flex flex-1 flex-col gap-6 p-6 overflow-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-500" />
                Admin Control Panel
              </h1>
              <p className="text-muted-foreground">
                Manage platform content, users, and system settings
              </p>
            </div>
          </div>

          <Stats />
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-7">
                <AnalyticChart
                  activeChartTab={activeChartTab}
                  setActiveChartTab={setActiveChartTab}
                />
                <ContentDistributionChart />
              </div>
              <div className="grid gap-6 md:grid-cols-7">
                <PendingVideos />
                <ReportVideos />
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <UserTab />
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <AllVideos />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminDashboard;
