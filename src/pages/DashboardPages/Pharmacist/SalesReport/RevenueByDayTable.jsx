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

const RevenueByDayTable = ({ sortedRevenueData }) => {
  return (
    <Table className={"p-6"}>
      <TableCaption>A List Of Revenue By Day</TableCaption>
      <TableHeader>
        <TableRow className={"bg-base-200 hover:bg-base-200"}>
          <TableHead className={"px-6"}>Date</TableHead>
          <TableHead className={"px-6"}>Items Sold</TableHead>
          <TableHead className={"px-6"}>Revenue</TableHead>
          <TableHead className={"px-6"}>Avg, Item Value</TableHead>
          <TableHead className={"px-6"}>Estimated Tax (10%)</TableHead>
          <TableHead className={"px-6"}>Net Revenue</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedRevenueData.map((day) => {
          const avgItemValue = day?.totalRevenue / day?.totalQty;
          const tax = day?.totalRevenue * 0.1;
          const netRevenue = day?.totalRevenue - tax;
          return (
            <TableRow key={day?.date}>
              <TableCell className={"px-6"}>
                {format(new Date(day?.date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell className={"px-6"}>{day?.totalQty} items</TableCell>
              <TableCell className={"px-6"}>
                ৳{" "}
                {day?.totalRevenue.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className={"px-6"}>
                ৳{" "}
                {avgItemValue?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </TableCell>

              <TableCell className={"px-6"}>
                ৳{" "}
                {tax?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className={"px-6"}>
                ৳{" "}
                {netRevenue?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default RevenueByDayTable;
