import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router";
import { Separator } from "@/components/ui/separator";

const BedBookingsTab = ({ bedBookings, formatDate }) => {
  return (
    <Card
      className={"border shadow-sm border-[#e5e7eb] w-full py-6 rounded-lg"}
    >
      <CardHeader>
        <CardTitle>Bed Bookings</CardTitle>
        <CardDescription>
          Your current and pending bed booking requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bedBookings && bedBookings?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bed Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bedBookings?.map((booking) => (
                <TableRow key={booking?._id || Math.random().toString()}>
                  <TableCell className="font-medium">
                    {booking?.bedTitle || "N/A"}
                  </TableCell>
                  <TableCell>{booking.bedPrice || "N/A"}</TableCell>
                  <TableCell>{formatDate(booking.admissionDate)}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        booking?.status === "accepted"
                          ? "bg-green-500"
                          : booking?.status === "pending"
                          ? "bg-amber-500"
                          : "bg-gray-500"
                      }
                    >
                      {booking?.status?.charAt(0).toUpperCase() +
                        booking?.status?.slice(1) || "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={"/dashboard/my-bedRequest"}>
                      <Button
                        className={"cursor-pointer"}
                        variant="outline"
                        size="sm"
                      >
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <>
            <Separator />
            <p className="text-muted-foreground mt-2">No Bed Bookings Found!</p>
            <Button className="mt-2 cursor-pointer" variant={"outline"}>
              Book A Bed
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BedBookingsTab;
