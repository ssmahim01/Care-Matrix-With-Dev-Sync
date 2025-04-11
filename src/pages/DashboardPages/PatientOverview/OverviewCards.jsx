import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "date-fns";
import { Calendar, CreditCard, Heart, Home } from "lucide-react";

const OverviewCards = ({ bedBookings, overviewStats, appointment }) => {
  console.log(bedBookings);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className={"border shadow-none border-[#e5e7eb] w-full py-6"}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Upcoming Appointments
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="-mt-3">
          <div className="text-2xl font-bold">
            {overviewStats?.upcomingAppointments || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            Next: {appointment?.date || "None scheduled"}
          </p>
        </CardContent>
      </Card>
      <Card className={"border shadow-none border-[#e5e7eb] w-full py-6"}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Favorite Doctors
          </CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="-mt-3">
          <div className="text-2xl font-bold">
            {overviewStats?.favoriteDoctors || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            Most recent: {appointment?.doctorName || "None"}
          </p>
        </CardContent>
      </Card>
      <Card className={"border shadow-none border-[#e5e7eb] w-full py-6"}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Bed Bookings</CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="-mt-3">
          <div className="text-2xl font-bold">
            {overviewStats?.bedBookingRequests || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {bedBookings?.filter((b) => b.status === "accepted").length || 0}{" "}
            accepted
          </p>
        </CardContent>
      </Card>
      <Card className={"border shadow-none border-[#e5e7eb] w-full py-6"}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="-mt-3">
          <div className="text-2xl font-bold">
            {/* {formatCurrency(overviewStats?.totalSpent || 0)} */}
          </div>
          <p className="text-xs text-muted-foreground">
            Across {overviewStats?.totalOrders || 0} orders
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCards;
