import { MdReportProblem } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {  ExternalLink, Eye, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useGetAllReportsQuery, useUpdateReportStatusMutation } from "@/redux/features/dashboard/adminDashboard/reportApi";
import { format } from "timeago.js";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ReportVideos = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");

  const { data, isLoading, refetch } = useGetAllReportsQuery(undefined);
  const [updateReportStatus, { isLoading: isUpdating }] = useUpdateReportStatusMutation();

  const reports = data?.data?.reports || [];
  const recentReports = reports.slice(0, 4);

  const handleOpenDetails = (report: any) => {
    setSelectedReport(report);
    setNewStatus(report.status);
    setIsDetailsOpen(true);
  };

  const handleStatusChange = async () => {
    try {
      await updateReportStatus({
        reportId: selectedReport._id,
        status: newStatus
      }).unwrap();

      toast.success(`Report status updated to ${newStatus}`);
      setIsDetailsOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to update report status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500 text-black';
      case 'Reviewed': return 'bg-blue-500 text-white';
      case 'Resolved': return 'bg-green-500 text-white';
      case 'Dismissed': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
console.log("line 54",recentReports)
  return (
    <>
      <Card className="col-span-7 md:col-span-3 border border-gray-800/20 dark:border-gray-100/10">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            Flagged content and user complaints
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-yellow-500" />
            </div>
          ) : recentReports.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No reports found
            </div>
          ) : (
            <div className="space-y-3">
              {recentReports.map((report:any) => (
                <div
                  key={report._id}
                  className="flex items-start justify-between p-3 rounded-md border border-gray-800/10 dark:border-gray-100/10 hover:bg-muted/20"
                >
                  <div className="flex gap-3">
                    <div className="rounded-full bg-red-500/10 p-2">
                      <MdReportProblem className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold">
                          {report.type} Report
                        </h4>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-xs mt-1">Reason: {report.reason}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Reported by {report.userId?.name || 'Unknown'} • {format(report.createdAt)}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8" onClick={() => handleOpenDetails(report)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 text-center">
            <Button variant="link" className="text-yellow-500" onClick={() => {}}>
              View All Reports
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>
              Review the report and take appropriate action
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Report Type:</span>
                  <Badge variant="outline" className="font-normal">
                    {selectedReport.type}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Reason:</span>
                  <span>{selectedReport.reason}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Status:</span>
                  <Badge className={getStatusColor(selectedReport.status)}>
                    {selectedReport.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Reported by:</span>
                  <span>{selectedReport.userId?.name || 'Unknown'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Date:</span>
                  <span>{new Date(selectedReport.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {selectedReport.description && (
                <div className="mt-2">
                  <span className="font-medium">Additional Details:</span>
                  <p className="mt-1 text-sm border rounded p-2 bg-muted/20">
                    {selectedReport.description}
                  </p>
                </div>
              )}

              <div className="border rounded p-3 bg-muted/10">
                <div className="text-sm font-medium mb-2">Reported Video:</div>
                <div className="flex gap-3">
                  {selectedReport.videoId?.imgUrl && (
                    <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={selectedReport.videoId.imgUrl}
                        alt={selectedReport.videoId.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{selectedReport.videoId?.title || "Unknown Video"}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Button size="sm" variant="outline" className="h-7 text-xs px-2">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        <Link to={`/video/${selectedReport.videoId?._id}`} target="_blank">
                        View Video
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Update Status:</label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Reviewed">Reviewed</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Dismissed">Dismissed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleStatusChange}
              disabled={isUpdating || selectedReport?.status === newStatus}
            >
              {isUpdating ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportVideos;
