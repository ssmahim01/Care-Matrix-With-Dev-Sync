import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ShoppingCart,
  Clock,
  CheckCircle,
  DollarSign,
  UsersIcon,
} from "lucide-react";
import { MdPending } from "react-icons/md";
import { TbClockUp } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { GoGitPullRequestClosed } from "react-icons/go";

const RecepOverviewCards = ({
  totalAppointments,
  totalBedBookings,
  totalPendingAppointments,
  totalApprovedAppointments,
  totalPendingBedBookings,
}) => {
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
      {/* card-1  */}

      <Card className={"border shadow-none border-[#e5e7eb] w-full py-6"}>
        <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0 relative">
          <CardTitle className="text-lg font-bold">Total Patients</CardTitle>
          <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <UsersIcon className="h-4 w-4 text-emerald-500" />
          </div>
        </CardHeader>
        <CardContent className="relative ml-1 -mt-3">
          <div className="text-3xl font-extrabold">
            {totalAppointments + totalBedBookings}
          </div>
          <div className="flex items-center mt-2">
            <Badge
              variant="secondary"
              className="text-xs  text-primary hover:bg-green-100"
            >
              Registered in the system
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* card-2  */}

      <Card className={"border shadow-none border-[#e5e7eb] w-full py-6"}>
        <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0 relative">
          <CardTitle className="text-lg font-bold">
            Pending Appointments
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <TbClockUp className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="relative ml-1 -mt-3">
          <div className="text-3xl font-extrabold">
            {totalPendingAppointments}
          </div>
          <div className="flex items-center mt-2">
            <Badge
              variant="secondary"
              className="text-xs  text-primary hover:bg-green-100"
            >
              Awaiting confirmation
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* card-3 */}

      <Card className={"border shadow-none border-[#e5e7eb] w-full py-6"}>
        <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0 relative">
          <CardTitle className="text-lg font-bold">
            Doctor Appointments
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
            <SlCalender className="h-4 w-4 text-amber-500" />
          </div>
        </CardHeader>
        <CardContent className="relative ml-1 -mt-3">
          <div className="text-3xl font-extrabold">
            {totalApprovedAppointments}
          </div>
          <div className="flex items-center mt-2">
            <Badge
              variant="secondary"
              className="text-xs  text-primary hover:bg-green-100"
            >
              Scheduled with doctors
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* card-4  */}

      <Card className={"border shadow-none border-[#e5e7eb] w-full py-6"}>
        <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0 relative">
          <CardTitle className="text-lg font-bold">Bed Requests</CardTitle>
          <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <GoGitPullRequestClosed className="h-4 w-4 text-green-500" />
          </div>
        </CardHeader>
        <CardContent className="relative ml-1 -mt-3">
          <div className="text-3xl font-extrabold">
            {totalPendingBedBookings}
          </div>
          <div className="flex items-center mt-2">
            <Badge
              variant="secondary"
              className="text-xs  text-primary hover:bg-green-100"
            >
              Pending bed allocations
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecepOverviewCards;
