import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Film,
  Shield,
  ChevronsUpDown,
  Search,
  UserPlus,
  Flag,
  Eye,
  Download,
  Filter,
  MoreHorizontal,
  Trash2,
  Edit2,
  Check,
  X,
  AlertTriangle,
  Clock
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { UserAndTheme } from "@/lib/UserAndTheme";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RiAdminLine } from "react-icons/ri";
import { MdReportProblem } from "react-icons/md";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChartTab, setActiveChartTab] = useState("views");
  const progress = 76;

  // Chart Data
  const viewsData = [
    { name: 'Jan', views: 4000 },
    { name: 'Feb', views: 3000 },
    { name: 'Mar', views: 5000 },
    { name: 'Apr', views: 7800 },
    { name: 'May', views: 5000 },
    { name: 'Jun', views: 6000 },
    { name: 'Jul', views: 8700 }
  ];

  const contentTypeData = [
    { name: 'Movies', value: 58 },
    { name: 'TV Shows', value: 27 },
    { name: 'Documentaries', value: 15 }
  ];

  const COLORS = ['#FACC15', '#38BDF8', '#FB7185', '#A3E635'];

  const userGrowthData = [
    { name: 'Jan', users: 2400 },
    { name: 'Feb', users: 4200 },
    { name: 'Mar', users: 5800 },
    { name: 'Apr', users: 7900 },
    { name: 'May', users: 9100 },
    { name: 'Jun', users: 10400 },
    { name: 'Jul', users: 12500 }
  ];

  const engagementData = [
    { name: 'Comments', count: 3200 },
    { name: 'Likes', count: 8500 },
    { name: 'Shares', count: 2300 },
    { name: 'Saves', count: 1800 }
  ];

  // Mock data for the admin dashboard
  const pendingVideos = [
    {
      id: "1",
      title: "Epic Adventure Movie",
      submittedBy: "John Doe",
      timestamp: "2 hours ago",
      status: "pending",
      imgUrl: "/original-80ca8c0c7cc530cd5bb0a0962acf369a.webp",
    },
    {
      id: "2",
      title: "Action Thriller",
      submittedBy: "Jane Smith",
      timestamp: "5 hours ago",
      status: "pending",
      imgUrl: "/original-9f342183ecc26d3bc8bc66e7ba537228.webp",
    },
    {
      id: "3",
      title: "Sci-Fi Journey",
      submittedBy: "Mike Johnson",
      timestamp: "1 day ago",
      status: "pending",
      imgUrl: "/original-7ad6eb1e183e6a0719a1045bf9d6b589.webp",
    },
  ];

  const recentReports = [
    { id: 1, type: "Content", reason: "Copyright", user: "James Brown", timestamp: "3 hours ago" },
    { id: 2, type: "User", reason: "Harassment", user: "Sarah Wilson", timestamp: "12 hours ago" },
    { id: 3, type: "Comment", reason: "Spam", user: "Robert Davis", timestamp: "1 day ago" },
  ];

  // Mock user data
  const users = [
    { id: 1, name: "Emma Thompson", email: "emma@example.com", role: "User", status: "Active", lastActive: "Just now", joined: "Mar 15, 2024" },
    { id: 2, name: "Michael Chen", email: "michael@example.com", role: "Premium", status: "Active", lastActive: "2 hours ago", joined: "Jan 5, 2024" },
    { id: 3, name: "Sophie Martinez", email: "sophie@example.com", role: "Admin", status: "Active", lastActive: "1 day ago", joined: "Feb 20, 2023" },
    { id: 4, name: "David Wilson", email: "david@example.com", role: "User", status: "Inactive", lastActive: "2 weeks ago", joined: "Nov 12, 2023" },
    { id: 5, name: "Olivia Johnson", email: "olivia@example.com", role: "Premium", status: "Active", lastActive: "3 hours ago", joined: "Apr 8, 2024" },
  ];

  // Mock videos data
  const allVideos = [
    { id: 1, title: "The Lost Kingdom", uploader: "Studio Entertainment", category: "Adventure", duration: "2h 15m", views: 245680, likes: 15420, status: "Published", publishDate: "2024-04-10" },
    { id: 2, title: "City Lights", uploader: "Urban Films", category: "Drama", duration: "1h 45m", views: 189520, likes: 12350, status: "Published", publishDate: "2024-03-22" },
    { id: 3, title: "Space Frontier", uploader: "Cosmic Pictures", category: "Sci-Fi", duration: "2h 30m", views: 320450, likes: 27800, status: "Published", publishDate: "2024-02-15" },
    { id: 4, title: "Dark Waters", uploader: "Mystery Box", category: "Thriller", duration: "1h 58m", views: 142780, likes: 9870, status: "Under Review", publishDate: "2024-04-18" },
    { id: 5, title: "Mountain Escape", uploader: "Nature Channel", category: "Documentary", duration: "1h 20m", views: 98540, likes: 5620, status: "Published", publishDate: "2024-03-05" },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b border-gray-800/10 dark:border-gray-100/10 pe-4">
          <div className="flex items-center gap-2 px-4">
            {<SidebarTrigger className="flex md:hidden -ml-1" />}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    <span className="text-yellow-500 font-bold">N</span>Movies
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Admin Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <UserAndTheme on={true}/>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 overflow-auto">
          {/* Welcome Section */}
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
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsOpen(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Admin
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border border-gray-800/20 dark:border-gray-100/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,568</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +2.5% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-800/20 dark:border-gray-100/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Content
                </CardTitle>
                <Film className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,832</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12.7% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-800/20 dark:border-gray-100/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Approval
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-yellow-500 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" /> 8 need urgent review
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-800/20 dark:border-gray-100/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Reported Content
                </CardTitle>
                <Flag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" /> 5 high priority
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-7">
                {/* Charts Section */}
                <Card className="col-span-7 md:col-span-4 border border-gray-800/20 dark:border-gray-100/10">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>Platform Analytics</CardTitle>
                        <CardDescription>
                          Visualized performance metrics
                        </CardDescription>
                      </div>
                      <div>
                        <Tabs value={activeChartTab} onValueChange={setActiveChartTab}>
                          <TabsList className="grid w-[200px] grid-cols-2">
                            <TabsTrigger value="views">Views</TabsTrigger>
                            <TabsTrigger value="users">Users</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {activeChartTab === "views" && (
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={viewsData}
                            margin={{
                              top: 10,
                              right: 30,
                              left: 0,
                              bottom: 0,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="views" stroke="#FACC15" fill="#FACC15" fillOpacity={0.2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                    {activeChartTab === "users" && (
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={userGrowthData}
                            margin={{
                              top: 10,
                              right: 30,
                              left: 0,
                              bottom: 0,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="users" stroke="#FACC15" fill="#FACC15" fillOpacity={0.2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Content Distribution Chart */}
                <Card className="col-span-7 md:col-span-3 border border-gray-800/20 dark:border-gray-100/10">
                  <CardHeader>
                    <CardTitle>Content Distribution</CardTitle>
                    <CardDescription>
                      Breakdown by content type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={contentTypeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {contentTypeData.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-7">
                {/* Engagement Chart */}
                <Card className="col-span-7 md:col-span-4 border border-gray-800/20 dark:border-gray-100/10">
                  <CardHeader>
                    <CardTitle>User Engagement</CardTitle>
                    <CardDescription>
                      Activity metrics across platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={engagementData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#FACC15" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card className="col-span-7 md:col-span-3 border border-gray-800/20 dark:border-gray-100/10">
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>
                      Platform health metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">Server Load</h4>
                          <span className="text-sm font-medium">{progress}%</span>
                        </div>
                        <div className="space-y-2">
                          <Progress
                            value={progress}
                            className="h-2 bg-gray-300 dark:bg-gray-700"
                          />
                          <p className="text-xs text-muted-foreground">
                            Normal load, no issues detected
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">Storage Usage</h4>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <div className="space-y-2">
                          <Progress
                            value={45}
                            className="h-2 bg-gray-300 dark:bg-gray-700"
                          />
                          <p className="text-xs text-muted-foreground">
                            5.4 TB of 12 TB used
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">CDN Status</h4>
                          <span className="text-sm font-medium">99.8%</span>
                        </div>
                        <div className="space-y-2">
                          <Progress
                            value={99.8}
                            className="h-2 bg-gray-300 dark:bg-gray-700"
                          />
                          <p className="text-xs text-muted-foreground">
                            All regions operating normally
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content Approval Section */}
              <div className="grid gap-6 md:grid-cols-7">
                <Card className="col-span-7 md:col-span-4 border border-gray-800/20 dark:border-gray-100/10">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>Pending Approval</CardTitle>
                        <CardDescription>
                          Content awaiting moderation
                        </CardDescription>
                      </div>
                      <div className="flex items-center">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search..."
                            className="w-[180px] pl-8"
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVideos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center gap-4 p-3 rounded-md border border-gray-800/10 dark:border-gray-100/10 hover:bg-muted/20"
                    >
                      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={video.imgUrl}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold truncate">
                          {video.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <div>By {video.submittedBy}</div>
                          <div>{video.timestamp}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="link" className="text-yellow-500">
                    View All Pending Content
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reports Section */}
            <Card className="col-span-7 md:col-span-3 border border-gray-800/20 dark:border-gray-100/10">
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>
                  Flagged content and user complaints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-start justify-between p-3 rounded-md border border-gray-800/10 dark:border-gray-100/10 hover:bg-muted/20"
                    >
                      <div className="flex gap-3">
                        <div className="rounded-full bg-red-500/10 p-2">
                          <MdReportProblem className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">
                            {report.type} Report: {report.reason}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Reported by {report.user} • {report.timestamp}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8">
                        <ChevronsUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="link" className="text-yellow-500">
                    View All Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-4">
              <Card className="border border-gray-800/20 dark:border-gray-100/10">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>
                        View and manage user accounts
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search users..."
                          className="w-[200px] pl-8"
                        />
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                      <Button
                        className="bg-yellow-500 hover:bg-yellow-600 text-black"
                        size="sm"
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Add User
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50 text-muted-foreground">
                          <th className="py-3 px-4 text-left font-medium">Name</th>
                          <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Email</th>
                          <th className="py-3 px-4 text-left font-medium hidden lg:table-cell">Role</th>
                          <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Status</th>
                          <th className="py-3 px-4 text-left font-medium hidden lg:table-cell">Joined</th>
                          <th className="py-3 px-4 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-medium">{user.name}</div>
                              <div className="text-muted-foreground text-xs md:hidden">{user.email}</div>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">{user.email}</td>
                            <td className="py-3 px-4 hidden lg:table-cell">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                                user.role === "Admin" ? "bg-yellow-500/10 text-yellow-500" :
                                user.role === "Premium" ? "bg-blue-500/10 text-blue-500" :
                                "bg-gray-500/10 text-gray-500"
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                                user.status === "Active" ? "bg-green-500/10 text-green-500" :
                                "bg-red-500/10 text-red-500"
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 hidden lg:table-cell">{user.joined}</td>
                            <td className="py-3 px-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[160px]">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Profile
                                  </DropdownMenuItem>
                                  {user.status === "Active" ? (
                                    <DropdownMenuItem className="text-amber-500">
                                      <X className="h-4 w-4 mr-2" />
                                      Suspend
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem className="text-green-500">
                                      <Check className="h-4 w-4 mr-2" />
                                      Activate
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="text-red-500">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Showing 5 of 100 users
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-4">
              <Card className="border border-gray-800/20 dark:border-gray-100/10">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Video Management</CardTitle>
                      <CardDescription>
                        View and manage all platform videos
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search videos..."
                          className="w-[200px] pl-8"
                        />
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50 text-muted-foreground">
                          <th className="py-3 px-4 text-left font-medium">Title</th>
                          <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Uploader</th>
                          <th className="py-3 px-4 text-left font-medium hidden lg:table-cell">Category</th>
                          <th className="py-3 px-4 text-center font-medium hidden md:table-cell">Views</th>
                          <th className="py-3 px-4 text-center font-medium hidden lg:table-cell">Likes</th>
                          <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Status</th>
                          <th className="py-3 px-4 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allVideos.map((video) => (
                          <tr key={video.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-medium">{video.title}</div>
                              <div className="text-muted-foreground text-xs md:hidden">{video.duration}</div>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">{video.uploader}</td>
                            <td className="py-3 px-4 hidden lg:table-cell">{video.category}</td>
                            <td className="py-3 px-4 text-center hidden md:table-cell">{video.views.toLocaleString()}</td>
                            <td className="py-3 px-4 text-center hidden lg:table-cell">{video.likes.toLocaleString()}</td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                                video.status === "Published" ? "bg-green-500/10 text-green-500" :
                                "bg-yellow-500/10 text-yellow-500"
                              }`}>
                                {video.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[160px]">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  {video.status === "Under Review" ? (
                                    <DropdownMenuItem className="text-green-500">
                                      <Check className="h-4 w-4 mr-2" />
                                      Approve
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem className="text-amber-500">
                                      <Flag className="h-4 w-4 mr-2" />
                                      Flag
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="text-red-500">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Showing 5 of 1,245 videos
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>

      {/* Add Admin Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Administrator</DialogTitle>
            <DialogDescription>
              Create a new administrator account with full system access.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name">Full Name</label>
              <Input id="name" placeholder="Enter admin name" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="admin@example.com" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="role">Admin Role</label>
              <Input id="role" defaultValue="Content Administrator" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)} className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <RiAdminLine className="mr-2 h-4 w-4" />
              Create Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}

export default AdminDashboard;
