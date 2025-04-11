import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PatientOverview = () => {
  // Fetch patient overview data
  const {
    data: stats = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["patient-stats"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/patient/stats`
      );
      return data;
    },
  });
  return (
    <div className="px-7">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patientData.overviewStats?.upcomingAppointments || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Next:{" "}
              {formatDate(patientData.appointment?.date) || "None scheduled"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Favorite Doctors
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patientData.overviewStats?.favoriteDoctors || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Most recent: {patientData.appointment?.doctorName || "None"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bed Bookings</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patientData.overviewStats?.bedBookingRequests || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {patientData.bedBookings?.filter((b) => b.status === "accepted")
                .length || 0}{" "}
              accepted
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(patientData.overviewStats?.totalSpent || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {patientData.overviewStats?.totalOrders || 0} orders
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientOverview;
