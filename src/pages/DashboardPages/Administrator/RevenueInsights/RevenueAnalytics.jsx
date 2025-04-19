import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export const RevenueAllCards = ({
  totalRevenue,
  avgRevenuePerAppointment,
  avgRevenuePerDates,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="border shadow border-[#e5e7eb] w-full pb-6">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-base font-semibold text-gray-700">
              Total Revenue
            </div>
            <div className="text-3xl font-extrabold mt-1 text-primary">
              ${" "}
              {totalRevenue.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border shadow border-[#e5e7eb] w-full pb-6">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-3xl font-extrabold mt-1 text-primary">
              ${" "}
              {avgRevenuePerAppointment.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>{" "}
            <div className="text-base font-semibold text-gray-700">
              Average Revenue By Appointments
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border shadow border-[#e5e7eb] w-full pb-6">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-3xl font-extrabold mt-1 text-primary">
              ${" "}
              {avgRevenuePerDates.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>{" "}
            <div className="text-base font-semibold text-gray-700">
              Average Revenue By Dates
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const RevenueAnalytics = ({ revenueData }) => {
  return (
    <div>
      {/* Revenue Table */}
      <Table className={"p-6"}>
        <TableCaption>A List Of Revenue By All Dates</TableCaption>
        <TableHeader>
          <TableRow className={"bg-base-200 hover:bg-base-200"}>
            <TableHead className={"px-6"}>Date</TableHead>
            <TableHead className={"px-6"}>Day</TableHead>
            <TableHead className={"px-6"}>Appointments</TableHead>
            <TableHead className={"px-6"}>Total Revenue</TableHead>
            <TableHead className={"px-6 text-xs"}>
              Avg Revenue
              <br />
              Per Appt
            </TableHead>
            <TableHead className={"px-6"}>% of Total</TableHead>
            <TableHead className={"px-6"}>Revenue Chart</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {revenueData?.map((day) => {
            const avgRevenuePerAppointment = (
              day.totalRevenue / day.appointments
            ).toFixed(2);
            const totalRevenueAllDays = revenueData.reduce(
              (sum, d) => sum + d.totalRevenue,
              0
            );
            const revenuePercentage = (
              (day.totalRevenue / totalRevenueAllDays) *
              100
            ).toFixed(1);
            const barWidth = parseFloat(revenuePercentage);

            return (
              <TableRow key={day?.date}>
                <TableCell className={"px-6"}>
                  {format(new Date(day?.date), "MMM dd, yyyy")}
                </TableCell>
                <TableCell className={"px-6"}>
                  {format(new Date(day?.date), "EEEE")}
                </TableCell>
                <TableCell className={"px-6"}>
                  {day?.appointments} Total
                </TableCell>
                <TableCell className={"px-6"}>
                  <span className="font-extrabold">$</span>{" "}
                  {day?.totalRevenue.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className={"px-6"}>
                  <span className="font-extrabold">$</span>{" "}
                  {avgRevenuePerAppointment?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className={"px-6"}>{revenuePercentage}%</TableCell>
                <TableCell className={"px-6"}>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${barWidth}%` }}
                    ></div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
