import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useReportVideoMutation } from "@/redux/features/dashboard/adminDashboard/reportApi";
import { MdReportProblem } from "react-icons/md";
import toast from "react-hot-toast";

interface ReportVideoProps {
  videoId: string;
}

const ReportVideoDialog = ({ videoId }: ReportVideoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reportType, setReportType] = useState("Content");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const [reportVideo, { isLoading }] = useReportVideoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) {
      toast.error("Please provide a reason for your report");
      return;
    }

    try {
      await reportVideo({
        videoId,
        type: reportType,
        reason,
        description
      }).unwrap();

      toast.success("Video reported successfully. Our team will review it.");
      setIsOpen(false);
      setReportType("Content");
      setReason("");
      setDescription("");
    } catch (error) {
      toast.error("Failed to report video. Please try again later.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-100/20">
          <MdReportProblem className="mr-1 h-4 w-4" />
          Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Report Video</DialogTitle>
            <DialogDescription>
              Please provide details about the issue with this video.
              Our team will review your report as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="report-type">Report Type</Label>
              <RadioGroup
                value={reportType}
                onValueChange={setReportType}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Content" id="content" />
                  <Label htmlFor="content">Inappropriate Content</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Copyright" id="copyright" />
                  <Label htmlFor="copyright">Copyright Violation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Harassment" id="harassment" />
                  <Label htmlFor="harassment">Harassment or Bullying</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Spam" id="spam" />
                  <Label htmlFor="spam">Spam or Misleading</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason</Label>
              <Input
                id="reason"
                placeholder="Brief reason for reporting"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Additional Details (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Provide any additional details that might help us understand the issue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)} type="button">Cancel</Button>
            <Button type="submit" disabled={isLoading} className="bg-red-500 hover:bg-red-600 text-white">
              {isLoading ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportVideoDialog;
