import RevenueInsightsHeader from "./RevenueInsightsHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAxiosPublic } from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import RevenueOverviewCards from "./RevenueOverviewCards";

const RevenueInsights = () => {
  const axiosPublic = useAxiosPublic();

  // Get RevenueInsights
  const {
    data: revenueInsights = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["revenue-insights"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/revenue-insights`);
      return data;
    },
  });

  return (
    <div className="px-7">
      <RevenueInsightsHeader />
      {/* Main Tab Contents */}
      <Tabs defaultValue="overview" className="space-y-4 mt-6">
        {/* All Tablist */}
        <TabsList className="border w-full flex flex-col lg:flex-row mb-1">
          <TabsTrigger
            value="overview"
            className={"cursor-pointer py-2 px-4 w-full "}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="revenue-analytics"
            className={"cursor-pointer py-2 px-4 w-full "}
          >
            Revenue Analytics
          </TabsTrigger>
          <TabsTrigger
            value="doctor-insights"
            className={"cursor-pointer py-2 px-4 w-full "}
          >
            Doctor Insights
          </TabsTrigger>
          <TabsTrigger
            value="patient-insights"
            className={"cursor-pointer py-2 px-4 w-full "}
          >
            Patient Insights
          </TabsTrigger>
        </TabsList>
        {/* 1st Tab Content */}
        <TabsContent value="overview">
          <RevenueOverviewCards
            totalRevenue={revenueInsights?.totalRevenue}
            uniquePatients={revenueInsights?.uniquePatients}
            appointmentsToday={revenueInsights?.appointmentsToday}
            avgRevenuePerAppointment={revenueInsights?.avgRevenuePerAppointment}
            totalAppointments={revenueInsights?.totalAppointments}
          />
        </TabsContent>
        {/* 2nd Tab Content */}
        <TabsContent value="revenue-analytics">revenue-analytics</TabsContent>
        {/* 3rd Tab Content */}
        <TabsContent value="doctor-insights">doctor-insights</TabsContent>
        {/* 4th Tab Content */}
        <TabsContent value="patient-insights">patient-insights</TabsContent>
      </Tabs>
    </div>
  );
};

export default RevenueInsights;
