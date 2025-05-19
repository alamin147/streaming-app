import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
const AnalyticChart = ({activeChartTab,setActiveChartTab}:{activeChartTab:string,setActiveChartTab:any}) => {
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

  const userGrowthData = [
    { name: 'Jan', users: 2400 },
    { name: 'Feb', users: 4200 },
    { name: 'Mar', users: 5800 },
    { name: 'Apr', users: 7900 },
    { name: 'May', users: 9100 },
    { name: 'Jun', users: 10400 },
    { name: 'Jul', users: 12500 }
  ];


  return (
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
  )
}

export default AnalyticChart
