import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RecepStatisticsChart = ({
  totalApprovedAppointments,
  totalApprovedBedBookings,
}) => {
  // Data for Appointment Overview bar charts
  const appointmentOverviewData = [
    {
      name: "Doctor Appointments",
      value: totalApprovedAppointments,
    },
    { name: "Accepted Bed Requests", value: totalApprovedBedBookings },
  ];

  return (
    <Card className="lg:col-span-4 xl:col-span-5 border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-base font-bold">
          Statistics Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={appointmentOverviewData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4a9c9a" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RecepStatisticsChart;
