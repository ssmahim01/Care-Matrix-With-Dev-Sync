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

const DoctorInsights = ({ doctorInsights }) => {
  return (
    <Table className={"p-6 mt-8"}>
      <TableCaption>A List Of Revenue By All Doctors</TableCaption>
      <TableHeader>
        <TableRow className={"bg-base-200 hover:bg-base-200"}>
          <TableHead></TableHead>
          <TableHead className={"px-6"}>Doctor Name</TableHead>
          <TableHead className={"px-6"}>Department</TableHead>
          <TableHead className={"px-6"}>Total Revenue</TableHead>
          <TableHead className={"px-6"}>Average Fee</TableHead>
          <TableHead className={"px-6 tabs-xs"}>Appointments</TableHead>
          <TableHead className={"px-6 text-xs"}>
            Revenue Per <br /> Appointment
          </TableHead>
          <TableHead className={"px-6 text-xs"}>
            Earnings <br /> Per Day
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctorInsights?.map((item, i) => {
          const revenuePerAppointment = item?.totalRevenue / item?.appointments;
          const earningsPerDay = item?.totalRevenue / 5;
          return (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell className={"px-6"}>{item?.doctor || "N/A"}</TableCell>
              <TableCell className={"px-6"}>
                {item?.doctorTitle || "N/A"}
              </TableCell>
              <TableCell className={"px-6"}>
                <span className="font-extrabold">$</span>{" "}
                {item?.totalRevenue.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className={"px-6"}>
                <span className="font-extrabold">$</span>{" "}
                {item?.avgFee.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className={"px-6"}>
                {item?.appointments || 0} <sub>Total</sub>
              </TableCell>
              <TableCell className={"px-6"}>
                <span className="font-extrabold">$</span>{" "}
                {revenuePerAppointment.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className={"px-6"}>
                <span className="font-extrabold">$</span>{" "}
                {earningsPerDay.toLocaleString(undefined, {
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

export default DoctorInsights;
