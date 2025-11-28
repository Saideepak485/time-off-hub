import { useState } from "react";
import { LeaveBalance } from "@/components/LeaveBalance";
import { LeaveRequestForm, LeaveRequest } from "@/components/LeaveRequestForm";
import { LeaveHistory } from "@/components/LeaveHistory";
import { Calendar } from "lucide-react";

const Index = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: "1",
      type: "vacation",
      startDate: "2024-12-20",
      endDate: "2024-12-27",
      reason: "Holiday vacation with family",
      status: "approved",
      days: 8,
    },
    {
      id: "2",
      type: "sick",
      startDate: "2024-11-15",
      endDate: "2024-11-15",
      reason: "Doctor's appointment",
      status: "approved",
      days: 1,
    },
  ]);

  const handleNewRequest = (request: LeaveRequest) => {
    setRequests([request, ...requests]);
  };

  const totalDays = 20;
  const usedDays = requests
    .filter((r) => r.status === "approved")
    .reduce((sum, r) => sum + r.days, 0);
  const pendingDays = requests
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.days, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Leave Management</h1>
              <p className="text-sm text-muted-foreground">Manage your time off requests</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground">Your Leave Balance</h2>
            <LeaveBalance
              totalDays={totalDays}
              usedDays={usedDays}
              pendingDays={pendingDays}
            />
          </section>

          <div className="grid gap-8 lg:grid-cols-2">
            <section>
              <LeaveRequestForm onSubmit={handleNewRequest} />
            </section>

            <section>
              <LeaveHistory requests={requests} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
