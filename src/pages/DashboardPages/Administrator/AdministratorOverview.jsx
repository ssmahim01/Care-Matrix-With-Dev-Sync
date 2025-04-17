import { useQuery } from "@tanstack/react-query";
import { AdministratorAnalytics } from "@/components/AreaChart/AdministratorAnalytics";
import {
  FaUserMd,
  FaProcedures,
  FaCalendarCheck,
  FaDollarSign,
} from "react-icons/fa";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


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
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminStats");
      return res.data.data;
    },
  });

  // Transform data for chart
  const chartData = data ? transformStatsData(data) : [];
  console.log(chartData, data);

  // Calculate summary stats
  const summary = data
    ? {
        totalDoctors: 12,
        totalPatients:
          (data.appointmentsPerDate || []).reduce(
            (sum, { count = 0 }) => sum + count,
            0
          ) +
          (data.bedBookingsPerAdmissionDate || []).reduce(
            (sum, { count = 0 }) => sum + count,
            0
          ),
        appointmentsToday: (data.appointmentsPerDate || [])
          .filter(({ date }) => date === new Date().toISOString().split("T")[0])
          .reduce((sum, { count = 0 }) => sum + count, 0),
        totalEarnings: (data.revenuePerDay || []).reduce(
          (sum, { totalRevenue = 0 }) => sum + totalRevenue,
          0
        ),
      }
    : {
        totalDoctors: 12,
        totalPatients: 0,
        appointmentsToday: 0,
        totalEarnings: 0,
      };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Error: {error.message}</p>
      </div>
    );
  }

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
        <ul className="space-y-3">
          <li className="border-b pb-2">
            🟢 New doctor Dr. Smith joined the hospital
          </li>
          <li className="border-b pb-2">
            🟢 5 new patient registrations today
          </li>
          <li className="border-b pb-2">🔴 Appointment #1234 canceled</li>
          <li>🟢 Hospital earnings updated</li>
        </ul>
      </div>
    </div>
  );
};

export default AdministratorOverview;
