import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ReceptionistOverviewHeader from "./ReceptionistOverview/ReceptionistOverviewHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecepOverviewCards from "./ReceptionistOverview/RecepOverviewCards";

const ReceptionistOverview = () => {
  const [overviewData, setOverviewData] = useState({
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
  });

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/receptionist/stats`
        );
        setOverviewData(response.data);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };
    fetchOverviewData();
  }, []);

  // Sample recent activity data (since the API doesn't provide this directly, we'll mock it for now)
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
      value: overviewData.totalApprovedAppointments,
    },
    { name: "Bed Requests", value: overviewData.totalApprovedBedBookings },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 px-7 md:gap-8">
      {/* Header */}
      {/* Sales Report Header */}
      <ReceptionistOverviewHeader
      //   handleDownload={handleDownload}
      //   sortedRevenueData={sortedRevenueData}
      //   fileName={`Sales_Report_${format(new Date(), "yyyy-MM-dd")}.pdf`}
      />

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        {/* All Tablist */}
        <TabsList className="border py-6 px-1">
          <TabsTrigger value="overview" className={"cursor-pointer py-2 px-4"}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className={"cursor-pointer py-2 px-4"}>
            Appointments
          </TabsTrigger>
          <TabsTrigger value="products" className={"cursor-pointer py-2 px-4"}>
            Bed Requests
          </TabsTrigger>
        </TabsList>
        {/* 1st Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          {/* Overview Cards */}
          <RecepOverviewCards
            totalAppointments={
              overviewData?.totalAppointments
            }
            totalBedBookings={overviewData.totalBedBookings}
            totalPendingAppointments={overviewData.totalPendingAppointments}
            totalApprovedAppointments={overviewData?.totalApprovedAppointments}
            totalPendingBedBookings={overviewData?.totalPendingBedBookings}
          />
        </TabsContent>
        {/* 2nd Tab Content */}

        {/* 3rd Tab Content */}
      </Tabs>


      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Appointment Overview */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Appointment Overview</h2>
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentOverviewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4a9c9a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="w-full md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-500 mb-4">
                Latest appointment requests
              </p>
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-gray-600 font-semibold">
                        {activity.patient[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.patient}</p>
                      <p className="text-xs text-gray-500">
                        {activity.type}: {activity.details}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {activity.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistOverview;
