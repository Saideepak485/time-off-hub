import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface LeaveRequestFormProps {
  onSubmit: (request: LeaveRequest) => void;
}

export interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  days: number;
}

export const LeaveRequestForm = ({ onSubmit }: LeaveRequestFormProps) => {
  const [type, setType] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startD = new Date(start);
    const endD = new Date(end);
    const diff = Math.ceil((endD.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!type || !startDate || !endDate || !reason) {
      toast.error("Please fill in all fields");
      return;
    }

    const days = calculateDays(startDate, endDate);
    
    if (days <= 0) {
      toast.error("End date must be after start date");
      return;
    }

    const newRequest: LeaveRequest = {
      id: Date.now().toString(),
      type,
      startDate,
      endDate,
      reason,
      status: "pending",
      days,
    };

    onSubmit(newRequest);
    toast.success("Leave request submitted successfully!");
    
    // Reset form
    setType("");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Request Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="type">Leave Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select leave type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vacation">Vacation Leave</SelectItem>
              <SelectItem value="sick">Sick Leave</SelectItem>
              <SelectItem value="personal">Personal Leave</SelectItem>
              <SelectItem value="emergency">Emergency Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {startDate && endDate && (
          <p className="text-sm text-muted-foreground">
            Duration: {calculateDays(startDate, endDate)} day(s)
          </p>
        )}

        <div>
          <Label htmlFor="reason">Reason</Label>
          <Textarea
            id="reason"
            placeholder="Provide a brief reason for your leave request..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
          />
        </div>

        <Button type="submit" className="w-full">Submit Request</Button>
      </form>
    </Card>
  );
};
