import { useQuery } from "@tanstack/react-query";
import { AdministratorAnalytics } from "@/components/AreaChart/AdministratorAnalytics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaCalendarCheck, FaProcedures, FaUserMd } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import SkeletonOverview from "@/components/Skeleton/SkeletonOverview";

function transformStatsData({
  revenuePerDay = [],
  appointmentsPerDate = [],
  bedBookingsPerAdmissionDate = [],
}) {
  const dataMap = new Map();

  // Process revenuePerDay
  revenuePerDay.forEach(({ date, totalRevenue }) => {
    dataMap.set(date, {
      date,
      earnings: totalRevenue || 0,
      patients: 0,
    });
  });

  // Process appointmentsPerDate
  appointmentsPerDate.forEach(({ date, count }) => {
    if (dataMap.has(date)) {
      dataMap.get(date).patients += count || 0;
    } else {
      dataMap.set(date, {
        date,
        earnings: 0,
        patients: count || 0,
      });
    }
  });

  // Process bedBookingsPerAdmissionDate
  bedBookingsPerAdmissionDate.forEach(({ admissionDate: date, count }) => {
    if (dataMap.has(date)) {
      dataMap.get(date).patients += count || 0;
    } else {
      dataMap.set(date, {
        date,
        earnings: 0,
        patients: count || 0,
      });
    }
  });

  return Array.from(dataMap.values()).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
}

const AdministratorOverview = () => {
  const axiosSecure = useAxiosSecure();

  // Query for admin stats (revenue, appointments, bed bookings)
  const {
    data: adminStats,
    isLoading: isAdminStatsLoading,
    error: adminStatsError,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await axiosSecure.get("/adminStats");
      return res.data.data;
    },
  });

  // Query for recent activities
  const {
    data: activitiesData,
    isLoading: isActivitiesLoading,
    error: activitiesError,
  } = useQuery({
    queryKey: ["recentActivities"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminStats/recent-activities");
      return res.data.data;
    },
  });

  // Query for totals (patients and doctors)
  const {
    data: totals,
    isLoading: isTotalsLoading,
    error: totalsError,
  } = useQuery({
    queryKey: ["adminTotals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminStats/totals");
      return res.data.data;
    },
  });

  // // Debug: Log the fetched data to inspect its structure
  // console.log("adminStats:", adminStats);
  // console.log("totals:", totals);
  // console.log("activitiesData:", activitiesData);

  // Transform data for chart
  const chartData = adminStats ? transformStatsData(adminStats) : [];

  // Combine loading states
  const isLoading = isAdminStatsLoading || isActivitiesLoading || isTotalsLoading;

  // Combine error states
  const error = adminStatsError || activitiesError || totalsError;

  // Calculate summary stats with fallback values
  const summary = adminStats
    ? {
        totalDoctors: totals?.totalDoctors ?? 0,
        totalPatients: totals?.totalPatients ?? 0,
        appointmentsToday: (adminStats.appointmentsPerDate || [])
          .filter(({ date }) => date === new Date().toISOString().split("T")[0])
          .reduce((sum, { count = 0 }) => sum + count, 0),
        totalEarnings: (adminStats.revenuePerDay || []).reduce(
          (sum, { totalRevenue = 0 }) => sum + totalRevenue,
          0
        ),
      }
    : {
        totalDoctors: 0,
        totalPatients: 0,
        appointmentsToday: 0,
        totalEarnings: 0,
      };

  // Show skeleton loader if any query is still loading
  if (isLoading) {
    return <SkeletonOverview />;
  }

  // Show error message if any query fails
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>
          Error:{" "}
          {error.message ||
            "An error occurred while fetching data. Please try again."}
        </p>
      </div>
    );
  }

  // Ensure activities is an array, fallback to empty array if undefined
  const activities = activitiesData?.recentActivities || [];

  return (
    <div className="space-y-4">
      {/* Dashboard Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Doctors Card */}
        <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
          <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0 relative">
            <CardTitle className="text-lg font-bold">Total Doctors</CardTitle>
            <div className="h-8 w-8 rounded-full bg-sky-500/20 flex items-center justify-center">
              <FaUserMd className="h-4 w-4 text-sky-500" />
            </div>
          </CardHeader>
          <CardContent className="relative ml-1 -mt-3">
            <div className="text-3xl font-bold">{summary.totalDoctors}</div>
            <div className="flex items-center mt-2">
              <p className="text-xs text-muted-foreground">Active doctors</p>
            </div>
          </CardContent>
        </Card>

        {/* Total Patients Card */}
        <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
          <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0 relative">
            <CardTitle className="text-lg font-bold">Total Patients</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <FaProcedures className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="relative ml-1 -mt-3">
            <div className="text-3xl font-bold">{summary.totalPatients}</div>
            <div className="flex items-center mt-2">
              <p className="text-xs text-muted-foreground">
                Registered patients
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Today Card */}
        <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
          <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0 relative">
            <CardTitle className="text-lg font-bold">
              Appointments Today
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <FaCalendarCheck className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent className="relative ml-1 -mt-3">
            <div className="text-3xl font-bold">
              {summary.appointmentsToday}
            </div>
            <div className="flex items-center mt-2">
              <p className="text-xs text-muted-foreground">Scheduled today</p>
            </div>
          </CardContent>
        </Card>

        {/* Total Earnings Card */}
        <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
          <CardHeader className="flex flex-row-reverse justify-end items-center space-y-0 relative">
            <CardTitle className="text-lg font-bold">Total Earnings</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <FaBangladeshiTakaSign className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent className="relative ml-1 -mt-3">
            <div className="text-3xl font-extrabold">
              ৳ {summary.totalEarnings.toLocaleString()}
            </div>
            <div className="flex items-center mt-2">
              <p className="text-xs text-muted-foreground">All-time earnings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Analytics */}
      <div className="my-6">
        <AdministratorAnalytics chartData={chartData} />
      </div>

      {/* Recent Activities */}
      <div className="bg-white/80 shadow-md p-6 border-b border-gray-300 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        {activities.length > 0 ? (
          <ul className="space-y-3">
            {activities.map((activity, index) => (
              <li key={index} className="border-b pb-2">
                {activity}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent activities available.</p>
        )}
      </div>
    </div>
  );
};

export default AdministratorOverview;