import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomTooltip from "@/pages/DashboardPages/Pharmacist/SalesReport/CustomTooltip";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  DollarSign,
  Minus,
} from "lucide-react";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const RevenueAnalyticsTab = ({ stats, revenueByDates, appointmentsPerDay }) => {
  const appointmentChartData = Object.entries(appointmentsPerDay).map(
    ([date, count]) => ({
      date: formatDate(date),
      appointments: count,
    })
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className={"-mt-6"}>
            <div className="text-2xl font-bold">${stats.totalRevenue}</div>
          </CardContent>
        </Card>

        <Card
          className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className={"-mt-6"}>
            <div className="text-2xl font-bold">{stats.totalAppointments}</div>
          </CardContent>
        </Card>

        <Card
          className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Revenue Per Appointment
            </CardTitle>
          </CardHeader>
          <CardContent className={"-mt-6"}>
            <div className="text-2xl font-bold">
              ${stats.avgRevenuePerAppointment.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
        >
          <CardHeader>
            <CardTitle>Revenue by Date</CardTitle>
            <CardDescription>Daily revenue breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueByDates.map((item) => ({
                    date: formatDate(item.date),
                    revenue: item.totalRevenue,
                  }))}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip valuePrefix="$" />} />
                  <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card
          className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
        >
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>Daily appointment count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentChartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="appointments"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card
        className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
      >
        <CardHeader>
          <CardTitle>Revenue Details</CardTitle>
          <CardDescription>Breakdown Of Revenue By Date</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" /> Date
                  </div>
                </TableHead>
                <TableHead className="px-6 py-3">Day</TableHead>
                <TableHead className="px-6 py-3 text-right">
                  <div className="flex justify-end items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Revenue
                  </div>
                </TableHead>
                <TableHead className="px-6 py-3">Trend</TableHead>
                <TableHead className="px-6 py-3">Change</TableHead>
                <TableHead className="px-6 py-3">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueByDates.map((item, index) => {
                const current = item.totalRevenue;
                const prev =
                  index < revenueByDates.length - 1
                    ? revenueByDates[index + 1].totalRevenue
                    : null;
                const change =
                  prev !== null ? ((current - prev) / prev) * 100 : null;
                const trendIcon = !prev ? (
                  <Minus className="w-4 h-4 text-muted-foreground" />
                ) : current > prev ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : current < prev ? (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                ) : (
                  <Minus className="w-4 h-4 text-muted-foreground" />
                );

                const trendText = !prev
                  ? "No data"
                  : current > prev
                  ? "Revenue increased"
                  : current < prev
                  ? "Revenue dropped"
                  : "No change";

                const day = new Date(item.date).toLocaleDateString("en-US", {
                  weekday: "long",
                });

                const status =
                  current > 250
                    ? { label: "High", color: "bg-green-100 text-green-800" }
                    : current > 150
                    ? {
                        label: "Medium",
                        color: "bg-yellow-100 text-yellow-800",
                      }
                    : { label: "Low", color: "bg-red-100 text-red-800" };

                return (
                  <TableRow
                    key={item.date}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="px-6 py-4 font-medium">
                      {item.date}
                    </TableCell>
                    <TableCell className="px-6 py-4">{day}</TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      ${current}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {trendIcon}
                        <span className="text-sm text-muted-foreground">
                          {trendText}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {change !== null ? (
                        <span
                          className={`text-sm font-medium ${
                            change > 0
                              ? "text-green-600"
                              : change < 0
                              ? "text-red-600"
                              : "text-muted-foreground"
                          }`}
                        >
                          {change > 0 ? "+" : ""}
                          {change.toFixed(2)}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span
                        className={`text-sm px-3 py-1 rounded-full font-medium ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
export default RevenueAnalyticsTab;
