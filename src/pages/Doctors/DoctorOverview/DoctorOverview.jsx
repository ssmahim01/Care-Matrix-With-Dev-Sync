import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import { useAuthUser } from "@/redux/auth/authActions";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DoctorProfile from "./DoctorProfile";
import DoctorOverviewTab from "./DoctorOverviewTab";
import RevenueAnalyticsTab from "./RevenueAnalyticsTab";

const DoctorOverview = () => {
  const user = useAuthUser();
  const axiosPublic = useAxiosPublic();

  // Get doctorData
  const {
    data: doctorData = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["doctor-stats", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic(`/doctor-stats/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return "Loading Doctor Overview...";
  if (error) return toast.error("Error While Fetching Data!");

  return (
    <div className="px-7">
      <DoctorProfile doctor={doctorData.doctor} />
      {/* Tab Container */}
      <Tabs defaultValue="overview" className="mt-8 space-y-4">
        {/* All Tablist */}
        <TabsList
          className="border w-full 
          :::md:w-9/12 :::lg:w-7/12 flex flex-col lg:flex-row 
          "
        >
          <TabsTrigger
            value="overview"
            className={"cursor-pointer py-2 px-4 w-full "}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="revenue"
            className={"cursor-pointer py-2 px-4 w-full "}
          >
            Revenue Analytics
          </TabsTrigger>
        </TabsList>
        {/* 1st Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          <DoctorOverviewTab
            stats={doctorData.stats}
            appointments={doctorData.appointments}
            prescriptions={doctorData.prescriptions}
          />
        </TabsContent>
        <TabsContent value="revenue" className="space-y-6">
        <RevenueAnalyticsTab
              stats={doctorData.stats}
              revenueByDates={doctorData.revenueByDates}
              appointmentsPerDay={doctorData.appointmentsPerDay}
            />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorOverview;
