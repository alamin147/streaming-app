import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { useGetContentDistributionQuery } from "@/redux/features/dashboard/adminDashboard/adminDashboardApi";
import { Loader2 } from "lucide-react";

const ContentDistributionChart = () => {
  const { data, isLoading, error } = useGetContentDistributionQuery(undefined);

  const contentTypeData = (data?.data?.distribution || [
    { name: 'Movies', value: 1 },
    { name: 'TV Shows', value: 0 },
    { name: 'Documentaries', value: 0 }
  ]).filter((item:any) => item.value > 0);


  if (contentTypeData.length === 0) {
    contentTypeData.push({ name: 'No Content', value: 1 });
  }

  const COLORS = ['#FACC15', '#38BDF8', '#FB7185', '#A3E635'];

  return (
    <Card className="col-span-7 md:col-span-3 border border-gray-800/20 dark:border-gray-100/10">
      <CardHeader>
        <CardTitle>Content Distribution</CardTitle>
        <CardDescription>
          Breakdown by content type
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-[250px]">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[250px]">
            <p className="text-red-500">Failed to load content distribution data</p>
          </div>
        ) : contentTypeData.every((item: { name: string, value: number }) => item.value === 0) ? (
          <div className="flex justify-center items-center h-[250px]">
            <p className="text-muted-foreground">No content distribution data available</p>
          </div>
        ) : (
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
                  {contentTypeData.map((_:any, index:number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value} videos`, 'Count']} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ContentDistributionChart
