import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Clock,
  CreditCard,
  FileText,
  User,
  Users,
} from "lucide-react";

const AppointmentsTab = ({ appointment, formatDate }) => {
  return (
    <Card
      className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
    >
      <CardHeader>
        <CardTitle>Upcoming Appointment</CardTitle>
        <CardDescription>
          Your next scheduled appointment details
        </CardDescription>
      </CardHeader>
      <CardContent>
        {appointment ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Patient:</span>
                  <span className="text-sm">{appointment?.name || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm">
                    {formatDate(appointment?.date)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Time:</span>
                  <span className="text-sm">{appointment?.time || "N/A"}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Doctor:</span>
                  <span className="text-sm">
                    {appointment?.doctorName || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Specialty:</span>
                  <span className="text-sm">
                    {appointment?.doctorTitle || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Fee:</span>
                  <span className="text-sm">
                    {appointment?.consultationFee || "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t">
              <span className="text-sm font-medium">Reason for Visit:</span>
              <p className="text-sm mt-1">
                {appointment?.reason || "No reason provided"}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Reschedule</Button>
              <Button variant="destructive">Cancel</Button>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">
            No upcoming appointments scheduled.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsTab;
