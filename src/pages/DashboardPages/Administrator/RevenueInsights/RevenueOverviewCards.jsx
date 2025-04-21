import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CheckCircle, Clock, DollarSign } from "lucide-react";

const RevenueOverviewCards = ({
  totalRevenue,
  uniquePatients,
  appointmentsToday,
  avgRevenuePerAppointment,
  totalAppointments,
}) => {
  return (
    <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
      {/* Total Revenue */}
      <Card className="border shadow-none border-[#e5e7eb] w-full py-6 grid place-items-stretch">
        <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0">
          <CardTitle className="text-lg font-semibold">Total Revenue</CardTitle>
          <div className="h-8 w-8 rounded-full bg-sky-500/20 flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-sky-500" />
          </div>
        </CardHeader>
        <CardContent className="ml-1 -mt-3">
          <div className="text-3xl font-extrabold">
            $ {totalRevenue?.toLocaleString() || 0}
          </div>
          <div className="flex items-center mt-2">
            <Badge
              variant="secondary"
              className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-100"
            >
              From {totalAppointments} Appointments Revenue
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Avg Revenue Per Appointment */}
      <Card className="border shadow-none border-[#e5e7eb] w-full py-6 grid place-items-stretch">
        <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0">
          <CardTitle className="text-lg font-semibold">Avg Revenue</CardTitle>
          <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <BarChart className="h-4 w-4 text-indigo-500" />
          </div>
        </CardHeader>
        <CardContent className="ml-1 -mt-3">
          <div className="text-3xl font-extrabold">
            $ {avgRevenuePerAppointment?.toFixed(2) || "0.00"}
          </div>
          <Badge
            variant="secondary"
            className="text-xs mt-2 bg-purple-100 text-purple-800 hover:bg-purple-100"
          >
            Based on recent appointments
          </Badge>
        </CardContent>
      </Card>

      {/* Unique Patients & Today’s Appointments */}
      <Card className="border shadow-none border-[#e5e7eb] w-full py-6 grid place-items-stretch">
        <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0">
          <CardTitle className="text-lg font-semibold">
            Patients & Appointments
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent className="ml-1 -mt-3">
          <div className="text-3xl font-extrabold">
            {uniquePatients}{" "}
            <span className="text-2xl font-semibold">unique patients</span>
          </div>
          <Badge
            variant="secondary"
            className="text-xs mt-2 bg-sky-100 text-sky-800 hover:bg-sky-100"
          >
            {appointmentsToday} appointments today
          </Badge>
        </CardContent>
      </Card>

      {/* Total Appointments */}
      <Card className="border shadow-none border-[#e5e7eb] w-full py-6 grid place-items-stretch">
        <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0">
          <CardTitle className="text-lg font-semibold">
            Total Appointments
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
        </CardHeader>
        <CardContent className="ml-1 -mt-3">
          <div className="text-3xl font-bold">{totalAppointments}</div>
          <Badge
            variant="secondary"
            className="text-xs mt-2 bg-orange-100 text-orange-800 hover:bg-orange-100"
          >
            All-time appointment count
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueOverviewCards;
