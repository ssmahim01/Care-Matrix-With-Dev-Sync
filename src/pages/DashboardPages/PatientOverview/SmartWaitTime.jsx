import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "date-fns";
import { Clock } from "lucide-react";

const SmartWaitTime = ({ appointment }) => {
  return (
    <Card className="mt-6 border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Clock className="h-5 w-5 mt-1" />
          Smart Wait-Time Prediction
        </CardTitle>
        <CardDescription className={"-mt-1"}>
          Based on your upcoming appointment with{" "}
          {appointment?.doctorName || "your doctor"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-base font-medium">Appointment Details:</p>
            <p className="text-base tracking-wide mt-1">
              {appointment?.date} at {appointment?.time || "N/A"}
            </p>
            <p className="text-base tracking-wide">
              With: {appointment?.doctorName || "N/A"} (
              {appointment?.doctorTitle || "Doctor"})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-base font-medium">Current Status:</p>
            <Badge
              className={
                appointment?.status === "pending"
                  ? "bg-orange-500"
                  : "bg-blue-500"
              }
            >
              {appointment?.status?.charAt(0).toUpperCase() +
                appointment?.status?.slice(1) || "Unknown"}
            </Badge>
          </div>
        </div>

        {/* {waitTimeMinutes > 0 ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Estimated Wait Time:</span>
              <span className="text-sm font-bold">
                {waitTimeMinutes} minutes
              </span>
            </div>
            <Progress
              value={Math.min(100, (waitTimeMinutes / 60) * 100)}
              className="h-2"
            />
            <p className="text-xs text-muted-foreground">
              This is a real-time estimate based on current clinic conditions
              and may change.
            </p>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWaitTimeMinutes(calculateWaitTime())}
              >
                Refresh Estimate
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm">
              Your appointment is scheduled for a future date. Check back on the
              day of your appointment for wait time estimates.
            </p>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
};

export default SmartWaitTime;
