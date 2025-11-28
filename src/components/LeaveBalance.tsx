import { Card } from "@/components/ui/card";
import { Calendar, Clock, TrendingUp } from "lucide-react";

interface LeaveBalanceProps {
  totalDays: number;
  usedDays: number;
  pendingDays: number;
}

export const LeaveBalance = ({ totalDays, usedDays, pendingDays }: LeaveBalanceProps) => {
  const remainingDays = totalDays - usedDays - pendingDays;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-6 border-approved/20 bg-gradient-to-br from-card to-approved/5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Available Days</p>
            <h3 className="text-3xl font-bold mt-2 text-foreground">{remainingDays}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-approved/10 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-approved" />
          </div>
        </div>
      </Card>

      <Card className="p-6 border-pending/20 bg-gradient-to-br from-card to-pending/5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
            <h3 className="text-3xl font-bold mt-2 text-foreground">{pendingDays}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-pending/10 flex items-center justify-center">
            <Clock className="h-6 w-6 text-pending" />
          </div>
        </div>
      </Card>

      <Card className="p-6 border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Days Used</p>
            <h3 className="text-3xl font-bold mt-2 text-foreground">{usedDays}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>
    </div>
  );
};
