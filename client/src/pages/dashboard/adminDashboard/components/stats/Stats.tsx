import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Clock, Film, Flag, Loader2, TrendingUp, User } from 'lucide-react'
import { useGetDashboardStatsQuery } from '@/redux/features/dashboard/adminDashboard/adminDashboardApi'


const Stats = () => {
  const { data, isLoading, isError } = useGetDashboardStatsQuery(undefined)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full py-10">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center w-full py-6">
        <p className="text-red-500 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2" /> Failed to load dashboard statistics
        </p>
      </div>
    )
  }

  const stats = data?.data?.stats

  return (
   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border border-gray-800/20 dark:border-gray-100/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.users.total.toLocaleString()}</div>
                <p className={`text-xs flex items-center mt-1 ${stats?.users.growthPercent > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stats?.users.growthPercent > 0 ? '+' : ''}{stats?.users.growthPercent}% from last month
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
                <div className="text-2xl font-bold">{stats?.videos.total.toLocaleString()}</div>
                <p className={`text-xs flex items-center mt-1 ${stats?.videos.growthPercent > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stats?.videos.growthPercent > 0 ? '+' : ''}{stats?.videos.growthPercent}% from last month
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
                <div className="text-2xl font-bold">{stats?.pending.total}</div>
                <p className="text-xs text-yellow-500 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {stats?.pending.urgent} need urgent review
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
                <div className="text-2xl font-bold">{stats?.reported.total}</div>
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {stats?.reported.highPriority} high priority
                </p>
              </CardContent>
            </Card>
          </div>
  )
}

export default Stats
