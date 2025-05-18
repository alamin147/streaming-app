import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SystemStats = () => {
const progress = 76;
  return (
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
  )
}

export default SystemStats
