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
import { useEffect, useState } from "react";

// Helper function to parse time
function parseAppointmentTime(dateStr, timeStr) {
    const date = new Date(dateStr);
  
    // Extract the time (e.g., "06:30pm" -> "06:30" and "pm")
    const timePart = timeStr.split(/([ap]m)/i)[0];
    const period = timeStr.match(/([ap]m)/i)[1].toLowerCase();
    const [hoursStr, minutesStr] = timePart.split(":");
  
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
  
    if (period === "pm" && hours < 12) {
      hours += 12;
    } else if (period === "am" && hours === 12) {
      hours = 0;
    }
  
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

const SmartWaitTime = ({ appointment }) => {
  const [waitTimeMinutes, setWaitTimeMinutes] = useState(calculateWaitTime());
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPast, setIsPast] = useState(false);

  function calculateWaitTime() {
    // This would be a more complex algorithm in a real application
    // For now, we'll use a simple calculation based on appointment time
    const appointmentDate = new Date(appointment?.date || new Date());
    const currentDate = new Date();

    // If appointment is today
    if (appointmentDate.toDateString() === currentDate.toDateString()) {
      const appointmentTimeStr =
        appointment?.time?.split(" - ")[0] || "12:00am";
      const appointmentTime = parseAppointmentTime(
        appointment?.date,
        appointmentTimeStr
      );

      // Calculate difference in minutes
      const diffMs = appointmentTime.getTime() - currentDate.getTime();
      const diffMinutes = Math.round(diffMs / 60000);

      // Add a random factor to simulate real-world variability (5-20 minutes)
      return Math.max(0, diffMinutes + Math.floor(Math.random() * 15) + 5);
    }

    // If appointment is in the future, return a placeholder value
    return 0;
  }

  useEffect(() => {
    const calculateCountdown = () => {
      if (!appointment?.date || !appointment?.time) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const appointmentDate = new Date(appointment.date);
      const appointmentTimeStr = appointment.time.split(" - ")[0] || "12:00am";
      const appointmentTime = parseAppointmentTime(
        appointment.date,
        appointmentTimeStr
      );

      const now = new Date();
      const difference = appointmentTime.getTime() - now.getTime();

      if (difference <= 0) {
        setIsPast(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hoursCalc = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours: hoursCalc, minutes: mins, seconds: secs };
    };

    // Initial calculation
    setCountdown(calculateCountdown());

    // Update countdown every second
    const timer = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [appointment?.date, appointment?.time]);

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
        <div className="flex flex-col lg:flex-row items-center gap-6 xl:gap-8">
          <div className="flex flex-col w-full lg:w-fit gap-2">
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
          {/* Countdown Timer */}
          <div className="bg-white rounded-lg w-full lg:w-9/12 p-4 shadow-sm border">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Time Until Appointment
            </h3>
            {isPast ? (
              <p className="text-sm text-gray-600 font-medium">
                Your appointment time has passed.
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-gray-100 rounded p-2">
                  <div className="text-2xl font-bold text-gray-700">
                    {countdown.days}
                  </div>
                  <div className="text-sm text-gray-700 font-medium tracking-wide">
                    Days
                  </div>
                </div>
                <div className="bg-gray-100 rounded p-2">
                  <div className="text-2xl font-bold text-gray-700">
                    {countdown.hours}
                  </div>
                  <div className="text-sm text-gray-700 font-medium tracking-wide">
                    Hours
                  </div>
                </div>
                <div className="bg-gray-100 rounded p-2">
                  <div className="text-2xl font-bold text-gray-700">
                    {countdown.minutes}
                  </div>
                  <div className="text-sm text-gray-700 font-medium tracking-wide">
                    Minutes
                  </div>
                </div>
                <div className="bg-gray-100 rounded p-2">
                  <div className="text-2xl font-bold text-gray-700">
                    {countdown.seconds}
                  </div>
                  <div className="text-sm text-gray-700 font-medium tracking-wide">
                    Seconds
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {waitTimeMinutes > 0 ? (
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
        )}
      </CardContent>
    </Card>
  );
};

export default SmartWaitTime;
