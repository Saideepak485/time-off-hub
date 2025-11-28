import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LeaveRequest } from "./LeaveRequestForm";
import { Calendar, Clock } from "lucide-react";

interface LeaveHistoryProps {
  requests: LeaveRequest[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-approved/10 text-approved border-approved/20";
    case "rejected":
      return "bg-rejected/10 text-rejected border-rejected/20";
    case "pending":
      return "bg-pending/10 text-pending border-pending/20";
    default:
      return "";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

const getLeaveTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    vacation: "Vacation",
    sick: "Sick Leave",
    personal: "Personal",
    emergency: "Emergency"
  };
  return labels[type] || type;
};

export const LeaveHistory = ({ requests }: LeaveHistoryProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Leave History</h2>
      <div className="space-y-3">
        {requests.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No leave requests yet</p>
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">
                    {getLeaveTypeLabel(request.type)}
                  </h3>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(request.startDate)} - {formatDate(request.endDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {request.days} day{request.days > 1 ? 's' : ''}
                  </span>
                </div>
                {request.reason && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                    {request.reason}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
