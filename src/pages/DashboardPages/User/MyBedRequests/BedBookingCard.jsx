import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  MoreVertical,
  Phone,
  Trash,
  User,
} from "lucide-react";

const BedBookingCard = ({ booking, handleBedDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Card className="w-full border shadow-sm border-[#e5e7eb] rounded-lg">
      <CardContent className="p-6">
        <div className="flex flex-row gap-3">
          <div className="h-24 w-28 sm:w-32 md:w-40">
            <img
              src={booking?.bedImg || "/placeholder.svg"}
              alt={booking?.bedTitle}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex w-full flex-1 justify-between items-start">
            <div>
              <h3 className="text-xl font-bold tracking-tight">
                {booking?.bedTitle}
              </h3>
              <p className="text-muted-foreground">
                {booking?.bedPrice} per night
              </p>
              <div className="mt-1">
                <Badge
                  variant="outline"
                  className={`capitalize  border-none shadow-sm font-medium ${getStatusColor(
                    booking?.status
                  )}`}
                >
                  {booking?.status}
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleBedDelete(booking._id, booking.bedId)}
                  className="focus:text-red-600 duration-300 cursor-pointer flex items-center gap-2"
                  // disabled={booking?.status === "cancelled"}
                >
                  <Trash /> Cancel Booking
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Patient:</span>{" "}
              {booking?.patientName}, {booking?.age} years
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Contact:</span>{" "}
              {booking?.contactNumber}
            </div>
          </div>
          <Separator className={"lg:hidden"} />
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Admission Date:</span>{" "}
              {formatDate(booking?.admissionDate)}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Booked on:</span>{" "}
              {formatDate(booking?.time)}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm">
            <span className="font-medium">Reason for booking:</span>{" "}
            {booking?.bookingReason || "Reason Not Provided"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BedBookingCard;
