import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import ReceptionistOverviewHeader from "./ReceptionistOverview/ReceptionistOverviewHeader";
import RecepOverviewCards from "./ReceptionistOverview/RecepOverviewCards";
import RecepStatisticsChart from "./ReceptionistOverview/RecepStatisticsChart";
import ReceptActivity from "./ReceptionistOverview/ReceptActivity";
import AppointmentPieChart from "./ReceptionistOverview/AppointmentPieChart";
import BedStatsPieChart from "./ReceptionistOverview/BedStatsPieChart";

const ReceptionistOverview = () => {
  const axiosSecure = useAxiosSecure();

  // Default structure for overviewData to prevent undefined errors
  const defaultOverviewData = {
    totalAppointments: 0,
    totalPendingAppointments: 0,
    totalApprovedAppointments: 0,
    upcomingAppointments: 0,
    appointmentStatusBreakdown: [],
    appointmentsPerDoctor: [],
    appointmentsPerDate: [],
    appointmentsPerReason: [],
    totalBeds: 0,
    totalAvailableBeds: 0,
    totalOccupiedBeds: 0,
    totalRequestedBeds: 0,
    bedStatusBreakdown: [],
    bedsPerType: [],
    totalBedBookings: 0,
    totalPendingBedBookings: 0,
    totalApprovedBedBookings: 0,
    upcomingAdmissions: 0,
    bedBookingStatusBreakdown: [],
    bedBookingsPerType: [],
    bedBookingsPerAdmissionDate: [],
  };

  // Get Receptionist-Stats
  const {
    data: overviewData = defaultOverviewData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["receptionist-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/receptionist/stats`);
      return data;
    },
  });

  // Sample recent activity data (mocked for now)
  const recentActivity = [
    {
      patient: "Kuddus ali",
      type: "Appointment",
      details: "Dr. Daniel Lee",
      status: "pending",
    },
    {
      patient: "Jorina",
      type: "Bed request",
      details: "ROYAL SUITE",
      status: "pending",
    },
  ];

  // Data for Appointment Overview bar charts
  const appointmentOverviewData = [
    {
      name: "Doctor Appointments",
      value: overviewData.totalApprovedAppointments || 0,
    },
    {
      name: "Accepted Bed Requests",
      value: overviewData.totalApprovedBedBookings || 0,
    },
  ];

  // Handle loading and error states
  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error fetching data: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 px-7 md:gap-8">
      {/* Header */}
      <ReceptionistOverviewHeader />

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        {/* All Tablist */}
        <TabsList className="border py-6 px-1">
          <TabsTrigger value="overview" className="cursor-pointer py-2 px-4">
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="Appointment analytics"
            className="cursor-pointer py-2 px-4"
          >
            Appointments
          </TabsTrigger>
          <TabsTrigger
            value="Bed analytics"
            className="cursor-pointer py-2 px-4"
          >
            Bed Requests
          </TabsTrigger>
        </TabsList>

        {/* 1st Tab Content: Overview */}
        <TabsContent value="overview" className="space-y-6">
          {/* Overview Cards */}
          <RecepOverviewCards
            totalAppointments={overviewData.totalAppointments}
            totalBedBookings={overviewData.totalBedBookings}
            totalPendingAppointments={overviewData.totalPendingAppointments}
            totalApprovedAppointments={overviewData.totalApprovedAppointments}
            totalPendingBedBookings={overviewData.totalPendingBedBookings}
          />

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-7">
            {/* Appointment Overview */}
            <RecepStatisticsChart
              totalApprovedAppointments={overviewData.totalApprovedAppointments}
              totalApprovedBedBookings={overviewData.totalApprovedBedBookings}
            />

            <ReceptActivity recentActivity={recentActivity} />
          </div>
        </TabsContent>

        {/* 2nd Tab Content: Appointment Analytics */}
        <TabsContent value="Appointment analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-7">
            <AppointmentPieChart
              appointmentStatusBreakdown={overviewData.appointmentStatusBreakdown}
            />

            <Card
              className="lg:col-span-3 border shadow-none border-[#e5e7eb] w-full py-6"
            >
              <CardHeader>
                <CardTitle>Appointments Per Doctor</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overviewData.appointmentsPerDoctor.map((item) => (
                      <TableRow key={item.doctor}>
                        <TableCell>{item.doctor}</TableCell>
                        <TableCell>{item.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Additional Breakdown Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Appointments Per Date */}
          <div>
          <Card className="py-6">
              <CardHeader>
                <CardTitle>Appointments Per Date (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overviewData.appointmentsPerDate.map((item) => (
                      <TableRow key={item.date}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

          </div>
            {/* Appointments Per Reason */}
           <div>
           <Card className="py-6">
              <CardHeader>
                <CardTitle>Appointments Per Reason</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reason</TableHead>
                      <TableHead>Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overviewData.appointmentsPerReason.map((item) => (
                      <TableRow key={item.reason}>
                        <TableCell>{item.reason}</TableCell>
                        <TableCell>{item.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
           </div>
          </div>
        </TabsContent>

        {/* 3rd Tab Content: Bed Analytics */}
        <TabsContent value="Bed analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-7">
            <BedStatsPieChart bedStatusBreakdown={overviewData.bedStatusBreakdown} />

            {/* Bed Bookings Per Type */}
            <Card className="lg:col-span-3 border shadow-none border-[#e5e7eb] w-full py-6">
              <CardHeader>
                <CardTitle>Bed Bookings Per Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bed Type</TableHead>
                      <TableHead>Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overviewData.bedBookingsPerType.map((item) => (
                      <TableRow key={item.bedType}>
                        <TableCell>{item.bedType}</TableCell>
                        <TableCell>{item.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Bed Bookings Per Admission Date */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className={"py-6"}>
              <CardHeader>
                <CardTitle>Bed Bookings Per Admission Date (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admission Date</TableHead>
                      <TableHead>Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overviewData.bedBookingsPerAdmissionDate.map((item) => (
                      <TableRow key={item.admissionDate}>
                        <TableCell>{item.admissionDate}</TableCell>
                        <TableCell>{item.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReceptionistOverview;